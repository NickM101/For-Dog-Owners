import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import fromUnixTime from 'date-fns/fromUnixTime';

import {firebaseErrors} from './fb_errors';
import {format} from 'date-fns';

const postCollection = firestore().collection('posts');

const userID = auth().currentUser.uid;

export const saveUserPost = (mediaURL, text, user) =>
  new Promise((resolve, reject) => {
    try {
      console.log('---- Beginning User Post Firestore ----');
      postCollection
        .doc(userID)
        .collection('personal')
        .add({
          mediaURL,
          creator: user,
          caption: text,
          likes_by_users: [],
          comments: 0,
          creation: firestore.FieldValue.serverTimestamp(),
        })
        .then(user => {
          console.log('---- User Post Saved Firestore ---- ');
          console.log('user collection', user);
          resolve();
        });
    } catch (error) {
      console.log('------- Save Post Error -----');
      firebaseErrors(error.code);
      reject();
    }
  });

export const getUserPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      await postCollection
        .where('creator.id', '!=', auth().currentUser.uid)
        // .orderBy('creation', 'desc')
        .onSnapshot(snapshot => {
          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            const followed_status = false;
            return {id, followed_status, ...data};
          });
          return resolve(posts);
        });
    } catch (error) {
      reject(error);
    }
  });

export const likePost = ({creator, postId, userId}) => {
  firestore()
    .collection('posts')
    .doc(creator)
    .collection('personal')
    .doc(postId)
    .update({
      likes_by_users: firestore.FieldValue.arrayUnion(userId),
    });
};

export const dislikePost = ({creator, postId, userId}) => {
  firestore()
    .collection('posts')
    .doc(creator)
    .collection('personal')
    .doc(postId)
    .update({
      likes_by_users: firestore.FieldValue.arrayRemove(userId),
    });
};
