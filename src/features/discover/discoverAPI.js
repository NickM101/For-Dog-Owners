import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {addDays, format, fromUnixTime, getUnixTime} from 'date-fns';

import {firebaseErrors} from '@services/fb_errors';

const discoverDate = addDays(new Date(), 4);

const discoverCollection = firestore()
  .collectionGroup('personal')
  .where('creator.id', '!=', auth().currentUser.uid)
  .limit(15);

export const fetchDiscover = createAsyncThunk('discover/feed', async () => {
  try {
    const response = await discoverCollection.get();
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
