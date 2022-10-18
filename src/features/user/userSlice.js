import {createSlice} from '@reduxjs/toolkit';
import {
  anonymousLogIn,
  fetchUserDetails,
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
      .addCase(logOut.fulfilled, state => {
        state.user = null;
        state.loading = null;
        state.error = null;
      });
  },
});

export const loggedInUser = state => state.user.user;
export const userStatus = state => state.user;

export default userSlice.reducer;
