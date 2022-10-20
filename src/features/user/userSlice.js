import {createSlice} from '@reduxjs/toolkit';
import {
  anonymousLogIn,
  fetchUserDetails,
  fetchUserPosts,
  loginUser,
  logOut,
  registerUser,
  updateUserProfile,
} from './userActions';

const initialState = {
  loading: false,
  updateStatus: false,
  user: null,
  error: null,
  postLoading: false,
  posts: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(anonymousLogIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(anonymousLogIn.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(anonymousLogIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserProfile.pending, state => {
        state.updateStatus = true;
      })
      .addCase(updateUserProfile.fulfilled, state => {
        state.updateStatus = false;
      })
      .addCase(fetchUserPosts.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.postLoading = false;
        state.posts = action.payload;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = null;
        state.loading = null;
        state.error = null;
      });
  },
});

export const loggedInUser = state => state.user.user;
export const userInfo = state => state.user;

export default userSlice.reducer;
