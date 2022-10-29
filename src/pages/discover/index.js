import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, FlatList, Dimensions, RefreshControl} from 'react-native';

import Container from '@layouts/Container';

import {fetchDiscover} from '@features/discover/discoverAPI';
import DiscoverPlayer from './DiscoverPlayer';
import NewFeeds from '../../components/pages/NewFeeds';
import DiscoverEmpty from '../../components/pages/DiscoverEmpty';

const DiscoverFeed = () => {
  const dispatch = useDispatch();

  const {loading, discover} = useSelector(state => state.discover);

  useEffect(() => {
    if (discover) {
      console.log('---------Discover Fetching Data -------');
      dispatch(fetchDiscover());
    }
  }, []);

  const _renderItem = ({item, index}) => <DiscoverPlayer posts={item} />;

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
        data={discover}
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
        ListEmptyComponent={DiscoverEmpty}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(fetchDiscover())}
          />
        }
      />
    </Container>
  );
};

export default DiscoverFeed;
