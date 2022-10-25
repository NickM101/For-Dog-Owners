import React from 'react';
import {useDispatch} from 'react-redux';
import {Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {likeDiscoverUpdate} from '@features/discover/discoverSlice';
import {likePostUpdate} from '../../features/posts/postSlice';

const LikeButton = ({post, user, type}) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        const currentLikedStatus = post.likes_by_users.includes(user);
        type == 'posts'
          ? dispatch(
              likePostUpdate({
                postId: post.id,
                userId: user,
                currentLikedStatus,
                creator: post.creator.id,
              }),
            )
          : dispatch(
              likeDiscoverUpdate({
                postId: post.id,
                userId: user,
                currentLikedStatus,
                creator: post.creator.id,
              }),
            );
      }}
      className={'items-center py-1'}>
      <MaterialIcons
        name="cards-heart"
        size={36}
        color={post.likes_by_users.includes(user) ? 'red' : 'white'}
      />
      <Text className={'font-bold text-white'}>
        {post.likes_by_users.length}
      </Text>
    </TouchableOpacity>
  );
};

export default LikeButton;
