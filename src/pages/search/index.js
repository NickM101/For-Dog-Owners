import React, {useEffect, useState} from 'react';
import {Animated, SafeAreaView, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import SearchComponent from '../../components/search/SearchComponent';
import LoaderComponent from '../../components/search/LoaderComponent';
import UserListComponent from '../../components/search/UserListComponent';
import {useDispatch, useSelector} from 'react-redux';
import {SearchList} from '../../features/search/searchSlice';
import Container from '../../layouts/Container';

const SearchHome = () => {
  const {history, users, loading} = useSelector(SearchList);

  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      new Animated.Value(0),
    ),
    0,
    50,
  );

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <Animated.View className={'bg-white'}>
      <SafeAreaView>
        <SearchComponent clampedScroll={clampedScroll} />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          className={'m-2 pt-16 bg-white'}
          contentContainerStyle={{
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: 'white',
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollYValue}}}],
            {useNativeDriver: true},
            () => {}, // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic">
          {/* {users.length ? (
            <UserListComponent usersArrayList={users} />
          ) : (
            <UserListComponent usersArrayList={history} />
          )} */}
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default SearchHome;
