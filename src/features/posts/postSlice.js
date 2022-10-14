import {createSlice} from '@reduxjs/toolkit';
import {loginUser, registerUser} from '../user/userActions';

const initialState = {
  isAnonymous: true,
  user: null,
  error: null,
  success: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
});

// export const user = state => state.post?.user;

export default postSlice.reducer;
