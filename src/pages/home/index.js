import {View, Text, FlatList, Dimensions} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Container from '../../layouts/Container';
import VideoFeed from '../../components/home/VideoFeed';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const HomeFeed = () => {
  const mediaRefs = useRef([]);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firestore()
      .collection('posts')
      .where('creator.id', '==', auth().currentUser.uid)
      .orderBy('creation', 'desc')
      .onSnapshot(snapshot => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        setLoading(false);
        return setPosts(posts);
      });
  }, [firestore]);

  const onViewableItemsChanged = useRef(({changed}) => {
    changed.forEach(element => {
      const cell = (mediaRefs.current[0] = element.key);
      console.log(cell);
      if (cell) {
        // if (element.isViewable) {
        //   cell.playFeed();
        // } else {
        //   cell.stopFeed();
        // }
      }
    });
  });

  if (loading) {
    return (
      <View className={'flex bg-slate-400 justify-center items-center'}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <Container className={'p-0'}>
      <FlatList
        keyExtractor={item => item.id}
        data={posts}
        renderItem={({item}) => (
          <VideoFeed
            ref={FeedSingleRef => (mediaRefs.current[item] = FeedSingleRef)}
            posts={item}
          />
        )}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews={true}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        windowSize={4}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 70}
        snapToAlignment={'start'}
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </Container>
  );
};

export default HomeFeed;
