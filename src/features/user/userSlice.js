import {createSlice} from '@reduxjs/toolkit';
import {anonymousLogIn, loginUser, logOut, registerUser} from './userAPI';

const initialState = {
  loading: false,
  isAnonymous: true,
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
        state.isAnonymous = payload.isAnonymous;
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
        state.isAnonymous = payload.isAnonymous;
      })
      .addCase(anonymousLogIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = null;
        state.loading = null;
        state.error = null;
        state.isAnonymous = true;
      });
  },
});

export const loggedInUser = state => state.user.user;

export default userSlice.reducer;
