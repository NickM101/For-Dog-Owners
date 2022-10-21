import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {addDays, format, fromUnixTime, getUnixTime} from 'date-fns';

import {firebaseErrors} from '@services/fb_errors';

const discoverDate = addDays(new Date(), 4);

export const fetchDiscover = createAsyncThunk('discover/feed', async () => {
  try {
    const response = await firestore()
      .collectionGroup('personal')
      .where('creator.id', '!=', auth()?.currentUser?.uid)
      .limit(15)
      .get();
    let arr = [];
    if (!response.empty) {
      response.forEach(querySnapshot => {
        const creation_format = format(
          fromUnixTime(querySnapshot.data().creation),
          'MM/dd/yyyy',
        );
        arr.push({
          id: querySnapshot.id,
          creation: creation_format,
          followed_status: false,
          ...querySnapshot.data(),
        });
      });
    }

    return arr;
  } catch (error) {
    console.log('err', error);
    firebaseErrors(error.code);
  }
});

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
