import React, {useEffect, useState} from 'react';
import {FlatList, Image, View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import Container from '@layouts/Container';

import {fetchUserPosts} from '@features/user/userActions';
import {userInfo} from '@features/user/userSlice';

export const UserVideos = ({user}) => {
  const dispatch = useDispatch();

  const {posts, postLoading} = useSelector(userInfo);

  console.log('posts', posts);

  useEffect(() => {
    dispatch(fetchUserPosts({userId: user}));
  }, [user]);

  return (
    <Container className="">
      <FlatList
        numColumns={3}
        removeClippedSubviews
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1 / 3,
                height: 200,
                backgroundColor: 'gray',
                margin: 2,
              }}>
              <Image style={{flex: 1}} source={{uri: item.mediaURL[0]}} />
            </View>
          );
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <Container className="px-6 justify-center items-center">
            <MaterialIcon
              name={'image-multiple-outline'}
              size={45}
              color={'light-grey'}
            />
            <Text className={'m-2 font-semibold text-black'}>
              Your videos will be present once you share them.
            </Text>
          </Container>
        }
      />
    </Container>
  );
};
