import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const saveUserField = (field, value) =>
  new Promise((resolve, reject) => {
    let obj = {};
    obj[field] = value;

    firestore()
      .collection('user')
      .doc(auth().currentUser.uid)
      .update(obj)
      .then(() => resolve())
      .catch(error => {
        console.error('Firestore update error', error), reject();
      });
  });
