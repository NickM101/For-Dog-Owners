import {View, Text, FlatList, Dimensions} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Container from '../../layouts/Container';
import VideoFeed from '../../components/home/VideoFeed';
import {feeds} from '../../constants/data';
import {FBGetUserPosts} from '../../services/posts';

const HomeFeed = () => {
  const mediaRefs = useRef([]);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    FBGetUserPosts()
      .then(data => {
        console.log('data', data);
        setLoading(false), setPosts(data);
      })
      .finally(() => setLoading(false));
  }, []);

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
