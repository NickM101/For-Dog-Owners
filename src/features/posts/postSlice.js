import {createSlice} from '@reduxjs/toolkit';
import {fetchPosts, updatePostLikes} from './postAPI';

import firestore from '@react-native-firebase/firestore';

const initialState = {
  loading: false,
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    followUser(state, action) {
      const {userId, followerId} = action.payload;
      const followed_user = state.posts.filter(
        post => post.creator.id === followerId,
      );

      const checkStatus = followed_user
        .map(items => items.followed_status)
        .includes(false);

      console.log(followed_user);

      if (checkStatus) {
        followed_user.map(items => (items.followed_status = true));
        // follow
        // following / {userID} / myFollowing / {id};
        firestore()
          .collection('following')
          .doc(userId)
          .collection('myFollowing')
          .doc(followerId)
          .set({
            id: followerId,
            creation: firestore.FieldValue.serverTimestamp(),
          });
      } else {
        followed_user.map(items => (items.followed_status = false));
        // unfollow
      }
    },
    likeUpdate(state, action) {
      const {postId, userId, currentLikedStatus} = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
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
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(updatePostLikes.fulfilled, state => {
        toast.show('Post liked');
      });
  },
});

export const AllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId);

export const {likeUpdate, followUser} = postSlice.actions;

export default postSlice.reducer;
