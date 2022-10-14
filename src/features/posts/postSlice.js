import {createSlice} from '@reduxjs/toolkit';
import {loginUser, registerUser} from '../user/userActions';

const initialState = {
  loading: false,
  status: false,
  isAnonymous: true,
  user: null,
  error: null,
  success: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: state => {
      state.post.status = false;
      state.post.error = null;
    },
    [registerUser.fulfilled]: (state, {payload}) => {
      state.post.status = false;
      state.post.success = true;
      state.post.isAnonymous = false;
    },
    [registerUser.rejected]: (state, {payload}) => {
      state.post.status = false;
      state.post.error = payload;
    },
    [loginUser.pending]: state => {
      state.post.status = true;
      state.post.error = null;
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      state.post.status = false;
      state.post.success = true;
      state.post.user = payload;
      state.post.isAnonymous = false;
    },
    [loginUser.rejected]: (state, {payload}) => {
      (state.post.status = false), (state.error = false);
    },
  },
});

export const user = state => state.post?.user;

export default postSlice.reducer;
