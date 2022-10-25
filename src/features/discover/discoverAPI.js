import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {addDays, format, fromUnixTime} from 'date-fns';

import {firebaseErrors} from '@services/fb_errors';
import {setFollowers} from '../user/userSlice';

const discoverDate = addDays(new Date(), 4);

export const fetchDiscover = createAsyncThunk(
  'discover/feed',
  async ({dispatch}) => {
    console.log('reading');
    try {
      const arr = [auth().currentUser.uid];
      const posts = await firestore()
        .collectionGroup('personal')
        .where('creator.id', 'not-in', arr)
        .limit(15)
        .get();
      const discover_arr = [];
      posts.forEach(doc => {
        discover_arr.push({id: doc.id, ...doc.data()});
      });

      console.log('response', posts);
      const result = [];
      if (posts.length) {
        posts.forEach(querySnapshot => {
          const creation_format = format(
            fromUnixTime(querySnapshot.creation),
            'MM/dd/yyyy',
          );
          result.push({
            creation: creation_format,
            followed_status: false,
            ...querySnapshot,
          });
        });
      }

      console.log('result', result);
      return result;

      // const response = await firestore()
      //   .collection('following')
      //   .doc(auth().currentUser.uid)
      //   .collection('following_users')
      //   .get()
      //   .then(async querySnapshot => {
      //     console.log('querySnapshot', querySnapshot.empty);
      //     if (!querySnapshot.empty) {
      //       const arr = [auth()?.currentUser?.uid];
      //       querySnapshot.forEach(doc => {
      //         arr.push(doc.id);
      //       });
      //       console.log('arr', arr);
      //       dispatch(setFollowers(arr));
      //       const posts = await firestore()
      //         .collectionGroup('personal')
      //         .where('creator.id', 'not-in', arr)
      //         .limit(15)
      //         .get();
      //       const discover_arr = [];
      //       posts.forEach(doc => {
      //         discover_arr.push({id: doc.id, ...doc.data()});
      //       });
      //       return discover_arr;
      //     } else return [];
      //   });
      // console.log('response', posts);
      // const result = [];
      // if (posts.length) {
      //   posts.forEach(querySnapshot => {
      //     const creation_format = format(
      //       fromUnixTime(querySnapshot.creation),
      //       'MM/dd/yyyy',
      //     );
      //     result.push({
      //       creation: creation_format,
      //       followed_status: false,
      //       ...querySnapshot,
      //     });
      //   });
      // }
      // return result;
    } catch (error) {
      console.log('err', error);
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
