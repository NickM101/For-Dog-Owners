import {createSlice} from '@reduxjs/toolkit';
import {loginUser, registerUser} from './userActions';

const initialState = {
  loading: false,
  isAnonymous: true,
  user: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const loggedInUser = state => state.user.user;

export default userSlice.reducer;
