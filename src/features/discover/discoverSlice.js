import firestore from '@react-native-firebase/firestore';

import {createSlice} from '@reduxjs/toolkit';

import {updatePostLikes} from '../posts/postAPI';
import {fetchDiscover} from './discoverAPI';

const initialState = {
  loading: false,
  discover: [],
};

const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {
    followUser(state, action) {
      const {userId, followerId} = action.payload;
      const followed_user = state.discover.filter(
        post => post.creator.id === followerId,
      );

      const checkStatus = followed_user
        .map(items => items.followed_status)
        .includes(false);

      if (checkStatus) {
        followed_user.map(items => (items.followed_status = true));
        firestore()
          .collection('following')
          .doc(userId)
          .collection('following_users')
          .doc(followerId)
          .set({
            id: followerId,
            creation: firestore.FieldValue.serverTimestamp(),
          });
      } else {
        followed_user.map(items => (items.followed_status = false));
        firestore()
          .collection('following')
          .doc(followerId)
          .collection('following_users')
          .doc(userId)
          .delete();
      }
    },
    likeUpdate(state, action) {
      const {postId, userId, currentLikedStatus} = action.payload;
      const existingPost = state.discover.find(post => post.id === postId);
      if (existingPost && currentLikedStatus) {
        existingPost.likes_by_users = existingPost.likes_by_users.filter(
          id => id !== userId,
        );
        return updatePostLikes(true);
      } else {
        existingPost.likes_by_users.push(userId);
        return updatePostLikes(false);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDiscover.pending, state => {
        state.loading = true;
      })
      .addCase(fetchDiscover.fulfilled, (state, action) => {
        state.loading = false;
        state.discover = action.payload;
      })
      .addCase(updatePostLikes.fulfilled, state => {
        toast.show('Post liked');
      });
  },
});

export const DiscoverPosts = state => state.discover.discover;

export const {followUser, likeUpdate} = discoverSlice.actions;

export default discoverSlice.reducer;
