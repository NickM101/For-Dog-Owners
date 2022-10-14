import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

import {firebaseErrors} from './fb_errors';

const postCollection = firestore().collection('posts');

const userID = auth().currentUser.uid;

const user = {
  id: userID,
  username: auth().currentUser.displayName,
  imageURL: auth().currentUser.photoURL,
};

export const saveUserPost = (mediaURL, text) =>
  new Promise((resolve, reject) => {
    try {
      console.log('---- Beginning User Post Firestore ----');
      postCollection
        .add({
          mediaURL,
          creator: user,
          caption: text,
          likes_by_users: [],
          comments: [],
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

export const handleLikes = (postId, status) => {
  console.debug(postId, status);
  try {
    postCollection.doc(postId).update({
      likes_by_users: !status
        ? firestore.FieldValue.arrayUnion(userID)
        : firestore.FieldValue.arrayRemove(userID),
    });
  } catch (error) {
    console.error(error);
  }
};

export const FBGetUserPosts = () =>
  new Promise((resolve, reject) => {
    try {
      postCollection
        .where('creator.id', '==', auth().currentUser.uid)
        .orderBy('creation', 'desc')
        .onSnapshot(snapshot => {
          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          return resolve(posts);
        });
    } catch (error) {
      reject(error);
    }
  });

export const onLikes = postId => {
  const postReference = database().ref(`feeds/${postId}`);

  return postReference.transaction(post => {
    console.log(post);
    if (post) {
      if (post.likes && post.likes[userID]) {
        console.log('add');
      } else {
        if (!post.likes) {
          post.likes = [];
        }
        post.likes[userID] = true;
      }
    }
    // if (currentData?.likes === undefined) {
    //   return (currentData);
    // } else {
    //   currentData.likes.includes(userID)
    //     ? currentData.likes.filter(id => id === userID)
    //     : currentData.likes.concat(userID);
    // }
  });
};

export const onGetCounts = postId => {
  const postReference = database().ref(`feeds/${postId}`);

  return postReference.on('value', snapshot => {
    console.log('snapshot likes', snapshot);
  });
};
