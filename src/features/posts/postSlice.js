import {createSlice} from '@reduxjs/toolkit';
import {dislikePost, likePost} from '../../services/posts';
import {fetchPosts, updatePostLikes} from './postAPI';

const initialState = {
  loading: false,
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePostUpdate(state, action) {
      const {postId, userId, creator, currentLikedStatus} = action.payload;

      const existingPost = state.posts.find(post => post.id === postId);

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
    addPostComment(state, action) {
      const {postId} = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
      existingPost.comments++;
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
      .addCase(updatePostLikes.fulfilled, () => {
        toast.show('Post liked');
      });
  },
});

export const AllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId);

export const {likePostUpdate, addPostComment} = postSlice.actions;

export default postSlice.reducer;
