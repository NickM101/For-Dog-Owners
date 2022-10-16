import database from '@react-native-firebase/database';

export const ReadComments = ({postID, user, comment}) =>
  new Promise(async (resolve, reject) => {
    try {
      await database().ref(`/feeds/${postID}`).set({
        creation: database.ServerValue.TIMESTAMP,
        creator: user,
        comment: comment,
      });
    } catch (error) {}
  });
