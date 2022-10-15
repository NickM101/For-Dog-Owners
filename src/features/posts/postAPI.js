import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {firebaseErrors} from '../../services/fb_errors';
import {getUserPosts} from '../../services/posts';

export const fetchPosts = createAsyncThunk('posts/home', async () => {
  try {
    const response = await getUserPosts();
    return response;
  } catch (error) {
    firebaseErrors(error);
  }
});
