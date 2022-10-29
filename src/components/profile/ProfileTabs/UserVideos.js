import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Button} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import Container from '@layouts/Container';

import {fetchUserPosts} from '@features/user/userActions';
import {userInfo} from '@features/user/userSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {loggedInUser} from '../../../features/user/userSlice';

export const UserVideos = ({user}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {posts, postLoading} = useSelector(userInfo);

  return (
    <Container className="">
      <FlatList
        numColumns={3}
        removeClippedSubviews
        data={posts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('PostView', {post: item})}
              style={{
                flex: 1 / 3,
                height: 200,
                backgroundColor: 'gray',
                margin: 2,
              }}>
              <Image style={{flex: 1}} source={{uri: item.mediaURL[0]}} />
            </TouchableOpacity>
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
        refreshControl={
          <RefreshControl
            refreshing={postLoading}
            onRefresh={() => dispatch(fetchUserPosts({userId: user}))}
          />
        }
      />
    </Container>
  );
};
