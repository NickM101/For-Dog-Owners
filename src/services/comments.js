import database from '@react-native-firebase/database';
import {firebaseErrors} from './fb_errors';

export const postComment = ({postID, user, comment}) =>
  new Promise(async (resolve, reject) => {
    try {
      const key = await database().ref(`/feeds/${postID}/comments`).push();
      key
        .set({
          creation: database.ServerValue.TIMESTAMP,
          creator: user,
          comment: comment,
        })
        .then(() => {
          toast.show('Comment Sent');
          resolve();
        });
    } catch (error) {
      firebaseErrors(error.code);
      reject();
    }
  });
