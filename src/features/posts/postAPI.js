import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {firebaseErrors} from '@services/fb_errors';
import {getUserPosts} from '@services/posts';

const postsCollection = firestore().collection('posts');

export const fetchPosts = createAsyncThunk('posts/home', async () => {
  try {
    const response = await getUserPosts();
    return response;
  } catch (error) {
    firebaseErrors(error);
  }
});

export const updatePostLikes = createAsyncThunk(
  'posts/likes',
  async initialPost => {
    try {
      const response = await postsCollection.doc(initialPost.id).update({
        likes_by_users: initialPost.like
          ? firestore.FieldValue.arrayUnion(initialPost.uid)
          : firestore.FieldValue.arrayRemove(initialPost.uid),
      });
      return response;
    } catch (error) {
      firebaseErrors(error?.code);
    }
  },
);
