import firestore from '@react-native-firebase/firestore';

import {createSlice} from '@reduxjs/toolkit';
import {dislikePost, likePost} from '../../services/posts';

import {fetchDiscover, updateDiscoverLikes} from './discoverAPI';

const initialState = {
  loading: false,
  discover: [],
};

const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {
    followDiscoverUser(state, action) {
      const {userId, followerId} = action.payload;

      const followed_user = state.discover.filter(
        post => post.creator.id === followerId,
      );

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
    },
    likeDiscoverUpdate(state, action) {
      const {postId, userId, creator, currentLikedStatus} = action.payload;

      const existingPost = state.discover.find(post => post.id === postId);

      if (existingPost && currentLikedStatus) {
        existingPost.likes_by_users = existingPost.likes_by_users.filter(
          id => id !== userId,
        );
        dislikePost({creator, postId, userId});
      } else {
        existingPost.likes_by_users.push(userId);
        likePost({creator, postId, userId});
      }
    },
    addDiscoverComment(state, action) {
      const {postId} = action.payload;
      const existingPost = state.discover.find(post => post.id === postId);
      existingPost.comments++;
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
      .addCase(updateDiscoverLikes.fulfilled, state => {
        toast.show('Post liked');
      });
  },
});

export const DiscoverPosts = state => state.discover.discover;

export const {followDiscoverUser, likeDiscoverUpdate, addDiscoverComment} =
  discoverSlice.actions;

export default discoverSlice.reducer;

// } else {
//   followed_user.map(items => (items.followed_status = false));
//   firestore()
//     .collection('following')
//     .doc(followerId)
//     .collection('following_users')
//     .doc(userId)
//     .delete();
// }
