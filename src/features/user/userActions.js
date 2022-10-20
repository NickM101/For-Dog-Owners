import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {saveMediaStorage} from '@services/firebase';
import {firebaseErrors} from '@services/fb_errors';

export const registerUser = createAsyncThunk(
  'user/register',
  async ({email, password, username}, {rejectWithValue}) => {
    try {
      const registration = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await firestore().collection('users').doc(registration.user.uid).set({
        username,
        phoneNumber: null,
        imageURL: null,
        email: registration.user.email,
        emailVerified: registration.user.emailVerified,
        isAnonymous: registration.user.isAnonymous,
        id: registration.user.uid,
        followers: 0,
        following: 0,
        likes: 0,
        bio: null,
      });

      const user = {
        username,
        email: registration.user.email,
        emailVerified: registration.user.emailVerified,
        isAnonymous: registration.user.isAnonymous,
        id: registration.user.uid,
        bio: null,
      };
      return user;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const loggedIn = await auth().signInWithEmailAndPassword(email, password);

      const response = await firestore()
        .collection('users')
        .doc(loggedIn.user.uid)
        .get();

      return response.data();
    } catch (error) {
      console.log('error login', error);
      firebaseErrors(error.code);
      rejectWithValue(error);
    }
  },
);

export const anonymousLogIn = createAsyncThunk('user/anonymous', async () => {
  try {
    const response = await auth().signInAnonymously();
    const userInfo = {
      username: null,
      phoneNumber: null,
      imageURL: null,
      email: response.user.email,
      emailVerified: response.user.emailVerified,
      isAnonymous: response.user.isAnonymous,
      id: response.user.uid,
    };
    return userInfo;
  } catch (error) {
    firebaseErrors(error.code);
    return error;
  }
});

export const fetchUserDetails = createAsyncThunk('user/fetching', async () => {
  try {
    const response = await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get();
    return response.data();
  } catch (error) {
    firebaseErrors(error.code);
  }
});

export const fetchUserPosts = createAsyncThunk('user/posts', async () => {
  try {
    const response = await firestore()
      .collectionGroup('personal')
      .where('creator.id', '==', auth().currentUser.uid)
      .orderBy('creation', 'desc')
      .get();

    const posts = [];
    response.forEach(post => {
      const id = post.id;
      const data = post.data();
      posts.push({id, ...data});
    });

    return posts;
  } catch (error) {
    firebaseErrors(error.code);
  }
});

export const updateUserProfile = createAsyncThunk(
  'user/update',
  async ({field, text}) => {
    try {
      let obj = {};
      obj[field] = text;

      console.log('obj', obj);

      const response = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update(obj);

      console.log('update log', response);
      return response;
    } catch (error) {
      firebaseErrors(error.code);
    }
  },
);

export const uploadProfilePhoto = createAsyncThunk(
  'user/profile_photo',
  async uri => {
    const imageLocation = await saveMediaStorage(
      uri,
      `profile_images/${auth().currentUser.uid}`,
    );

    console.log('image location', imageLocation);
    const res = await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({imageURL: imageLocation});
    console.log('response', res);
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

export const logOut = createAsyncThunk('user/logout', async () => {
  try {
    await auth().signOut();
  } catch (error) {
    firebaseErrors(error.code);
    rejectWithValue(error);
  }
});
