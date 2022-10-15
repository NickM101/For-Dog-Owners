import {View, Text, FlatList, Dimensions} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Container from '../../layouts/Container';
import VideoFeed from '../../components/home/VideoFeed';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {AllPosts} from '../../features/posts/postSlice';
import {fetchPosts} from '../../features/posts/postAPI';
import {useIsFocused} from '@react-navigation/native';

const HomeFeed = () => {
  const mediaRefs = useRef([]);
  const dispatch = useDispatch();

  const {loading, posts} = useSelector(state => state.posts);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('dispatching');
    dispatch(fetchPosts());
  }, [isFocused]);

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
        decelerationRate={'fast'}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </Container>
  );
};

export default HomeFeed;
