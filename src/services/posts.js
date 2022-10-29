import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import fromUnixTime from 'date-fns/fromUnixTime';

import {firebaseErrors} from './fb_errors';
import {format} from 'date-fns';

const postCollection = firestore().collection('posts');

const userID = auth().currentUser.uid;

export const getFollowers = async () => {
  const response = await firestore()
    .collection('following')
    .doc(userID)
    .collection('following_users')
    .get();

  const arr = [];

  if (!response.empty) {
    response.forEach(doc => {
      arr.push(doc.id);
    });
  } else {
    return [];
  }

  console.log('arr', arr);
  return arr;
};

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
      const followers_arr = await getFollowers();
      firestore()
        .collectionGroup('personal')
        .where('creator.id', 'in', followers_arr)
        .orderBy('creation', 'desc')
        .limit(10)
        .get()
        .then(querySnapshot => {
          const posts = [];
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              const data = doc.data();
              const id = doc.id;
              return posts.push({id, ...data});
            });
          }
          return resolve(posts);
        });
    } catch (error) {
      firebaseErrors(error.code);
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

export const commentIncrement = ({postId, creator}) => {
  firestore()
    .collection('posts')
    .doc(creator)
    .collection('personal')
    .doc(postId)
    .update({comments: firestore.FieldValue.increment(1)});
};
