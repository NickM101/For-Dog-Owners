import {createSlice} from '@reduxjs/toolkit';
import {loginUser, registerUser} from './userActions';

const initialState = {
  loading: false,
  status: false,
  isAnonymous: true,
  user: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: state => {
      state.user.status = false;
      state.user.error = null;
    },
    [registerUser.fulfilled]: (state, {payload}) => {
      state.user.status = false;
      state.user.success = true;
      state.user.isAnonymous = false;
    },
    [registerUser.rejected]: (state, {payload}) => {
      state.user.status = false;
      state.user.error = payload;
    },
    [loginUser.pending]: state => {
      state.user.status = true;
      state.user.error = null;
    },
    [loginUser.fulfilled]: (state, {payload}) => {
      state.user.status = false;
      state.user.success = true;
      state.user.user = payload;
      state.user.isAnonymous = false;
    },
    [loginUser.rejected]: (state, {payload}) => {
      (state.user.status = false), (state.error = false);
    },
  },
});

export const loggedInUser = state => state.user?.user;

export default userSlice.reducer;
