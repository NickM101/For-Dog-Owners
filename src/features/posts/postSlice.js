import {createSlice} from '@reduxjs/toolkit';
import {fetchPosts, updatePostLikes} from './postAPI';

const initialState = {
  loading: false,
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likeUpdate(state, action) {
      const {postId, userId} = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
      if (existingPost) {
        existingPost.likes_by_user?.push(userId);
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

export const {likeUpdate} = postSlice.actions;

export default postSlice.reducer;
