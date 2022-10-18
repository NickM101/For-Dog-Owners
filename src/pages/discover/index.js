import {View, Text, FlatList, Dimensions, StyleSheet} from 'react-native';
import React, {useRef, useEffect, useCallback, useState} from 'react';
import Container from '../../layouts/Container';
import VideoFeed from '../../components/home/VideoFeed';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {fetchPosts} from '../../features/posts/postAPI';
import {useIsFocused} from '@react-navigation/native';
import {feeds} from '../../constants/data';

const DiscoverFeed = () => {
  const mediaRefs = useRef(0);

  const dispatch = useDispatch();

  const {loading, posts} = useSelector(state => state.posts);

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

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
        renderItem={({item, index}) => (
          <VideoFeed
            // ref={FeedSingleRef => (mediaRefs.current[item] = FeedSingleRef)}
            posts={item}
          />
        )}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews={true}
        windowSize={4}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 70}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
    </Container>
  );
};

export default DiscoverFeed;

// const onViewableItemsChanged = useRef(({changed}) => {
//   changed.forEach(element => {
//     const cell = (mediaRefs.current = element.key);
//     console.log(cell);
//     if (cell) {
//       console.log('isViewable', element.isViewable);
//       if (element.isViewable) {
//         console.log('-------------Play Video-----------');
//         cell.playFeed();
//       } else {
//         console.log('------------ Pause Video ------------');
//         cell.stopFeed();
//       }
//     }
//   });
// });
