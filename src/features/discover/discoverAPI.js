import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {addDays, format, fromUnixTime} from 'date-fns';

import {firebaseErrors} from '@services/fb_errors';
import {setFollowers} from '../user/userSlice';

const discoverDate = addDays(new Date(), 4);

export const fetchDiscover = createAsyncThunk(
  'discover/feed',
  async (params, thunkAPI) => {
    try {
      const response = await firestore()
        .collection('following')
        .doc(auth().currentUser.uid)
        .collection('following_users')
        .get()
        .then(async querySnapshot => {
          const arr = [auth()?.currentUser?.uid];
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              arr.push(doc.id);
            });
            thunkAPI.dispatch(setFollowers(arr));
          }

          const posts = await firestore()
            .collectionGroup('personal')
            .where('creator.id', 'not-in', arr)
            .limit(15)
            .get();
          const discover_arr = [];
          posts.forEach(doc => {
            discover_arr.push({id: doc.id, ...doc.data()});
          });
          return discover_arr;
        });
      const result = [];
      if (response.length) {
        response.forEach(querySnapshot => {
          result.push({
            followed_status: false,
            ...querySnapshot,
          });
        });
      }
      return result;
    } catch (error) {
      firebaseErrors(error.code);
    }
  },
);

export const updateDiscoverLikes = createAsyncThunk(
  'discover/likes',
  async ({userId, postId}) => {
    try {
      const response = await firestore()
        .collection('posts')
        .doc(userId)
        .collection('personal')
        .doc(postId)
        .update({
          likes_by_users: initialPost.like
            ? firestore.FieldValue.arrayUnion(userId)
            : firestore.FieldValue.arrayRemove(userId),
        });
      return response;
    } catch (error) {
      firebaseErrors(error?.code);
    }
  },
);
