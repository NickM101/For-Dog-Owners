import React, {useEffect} from 'react';
import {FlatList, Dimensions, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchPosts} from '@features/posts/postAPI';

import Container from '@layouts/Container';
import NewFeeds from '@components/pages/NewFeeds';
import FeedPlayer from './FeedPlayer';

const HomeFeed = () => {
  const dispatch = useDispatch();

  const {loading, posts} = useSelector(state => state.posts);

  // useEffect(() => {
  //   if (posts.length) {
  //     console.log('---------Home Feed Fetching Data -------');
  //     dispatch(fetchPosts());
  //   }
  // }, []);

  const _renderItem = ({item, index}) => <FeedPlayer posts={item} />;

  return (
    <Container className={'p-0'}>
      <FlatList
        keyExtractor={item => item.id}
        data={posts}
        renderItem={_renderItem}
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        removeClippedSubviews={true}
        windowSize={4}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 70}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        contentContainerStyle={{flexGrow: 1}}
        ListEmptyComponent={NewFeeds}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(fetchPosts())}
          />
        }
      />
    </Container>
  );
};

export default HomeFeed;

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
