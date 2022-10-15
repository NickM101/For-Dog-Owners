import {createSlice} from '@reduxjs/toolkit';
import {fetchPosts} from './postAPI';

const initialState = {
  loading: false,
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      });
  },
});

export const AllPosts = state => state.posts.posts;

export default postSlice.reducer;
