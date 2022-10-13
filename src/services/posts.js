import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
          description: text,
          likesCount: 0,
          commentsCount: 0,
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

export const FBGetUserPosts = () =>
  new Promise((resolve, reject) => {
    try {
      postCollection
        .where('likesCount', '==', 0)
        // .where('creator', '==', auth().currentUser.uid)
        // .orderBy('creation', 'desc')
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
