import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {firebaseErrors} from './fb_errors';
import {saveMediaStorage} from './firebase';

const userCollection = firestore()
  .collection('user')
  .doc(auth().currentUser.uid);

export const fetchUser = () =>
  new Promise((resolve, reject) => {
    userCollection
      .get()
      .then(user => resolve(user))
      .catch(error => firebaseErrors(error.code));
  });

export const saveUserField = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;

    userCollection
      .update(obj)
      .then(() => resolve())
      .catch(error => {
        reject(error);
      });
  });

export const saveProfileImage = image =>
  new Promise((resolve, reject) => {
    saveMediaStorage(image, `profileImage/${auth().currentUser.uid}`).then(
      url => {
        userCollection
          .update({photoURL: url})
          .then(user => {
            resolve();
          })
          .catch(error => {
            console.error('error user update', error);
            firebaseErrors(error.code);
            reject(error);
          });
      },
    );
  });
