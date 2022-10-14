import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {firebaseErrors} from '../../services/fb_errors';

export const registerUser = createAsyncThunk(
  'user/register',
  async ({email, password}, {rejectWithValue}) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      firebaseErrors(error.code);
      rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log('response', response);
      const userInfo = {
        displayName: null,
        phoneNumber: null,
        photoURL: null,
        email: response.user.email,
        emailVerified: response.user.emailVerified,
        isAnonymous: response.user.isAnonymous,
        id: response.user.uid,
      };
      return userInfo;
    } catch (error) {
      firebaseErrors(error.code);
      rejectWithValue(error);
    }
  },
);

export const anonymousLogIn = createAsyncThunk(
  'user/anonymous',
  async ({rejectWithValue}) => {
    try {
      await auth().signInAnonymously();
    } catch (error) {
      firebaseErrors(error.code);
      rejectWithValue(error);
    }
  },
);

export const sendResetEmail = createAsyncThunk(
  'user/resetEmail',
  async ({email}, {rejectWithValue}) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      firebaseErrors(error.code);
      rejectWithValue(error);
    }
  },
);

export const sendResetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({code, password}, {rejectWithValue}) => {
    try {
      await auth().confirmPasswordReset(code, password);
    } catch (error) {
      firebaseErrors(error.code);
      rejectWithValue(error);
    }
  },
);

export const LogOutUser = createAsyncThunk('user/logout', async () => {
  try {
    await auth().signOut();
  } catch (error) {
    firebaseErrors(error.code);
    rejectWithValue(error);
  }
});
