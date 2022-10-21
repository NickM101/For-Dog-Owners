import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {firebaseErrors} from '@services/fb_errors';

export const getUsersToFollow = createAsyncThunk(
  'search/followers',
  async () => {
    try {
      const response = await firestore()
        .collection('users')
        .where('isAnonymous', '==', false)
        .limitToLast(15)
        .get();
      return response.docs();
    } catch (error) {
      firebaseErrors(error.code);
    }
  },
);
