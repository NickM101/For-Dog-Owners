import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    activeUser: (state, action) => {
      state.user = action.payload;
    },
    deactivatedUser: state => {
      state.user = null;
    },
  },
});

export const {activeUser, deactivatedUser} = userSlice.actions;

export default userSlice.reducer;