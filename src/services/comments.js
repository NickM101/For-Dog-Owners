import firestore from '@react-native-firebase/firestore';
import {firebaseErrors} from './fb_errors';

export const postComment = ({postID, user, userId, comment}) =>
  new Promise(async (resolve, reject) => {
    console.log('post', user);
    try {
      firestore()
        .collection(`posts/${userId}/personal/${postID}/comments`)
        .add({
          creatorID: user.id,
          creator: user.username,
          comment,
          creation: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          toast.show('Comment Sent');
          resolve();
        });
    } catch (error) {
      console.log('error', error);
      firebaseErrors(error.code);
      reject();
    }
  });
