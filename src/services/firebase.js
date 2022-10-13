import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {v4 as uuidv4} from 'uuid';

export const saveMediaStorage = (media, path, metadata) =>
  new Promise((resolve, reject) => {
    const pathToTake =
      path === 'post'
        ? `post/${auth().currentUser.uid}/${uuidv4()}`
        : `profileImage/${auth().currentUser.uid}`;
    const fileRef = storage().ref(pathToTake);

    console.log('metadata', metadata);

    const task = metadata
      ? fileRef.putFile(media, {
          contentType: 'image/png',
        })
      : fileRef.putFile(media);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });
    task
      .then(async () => {
        const url = await fileRef.getDownloadURL();
        console.log('download url', url);

        resolve(url);
        console.log('Image uploaded to the bucket!');
      })
      .catch(error => {
        console.error('SAVE TO MEDIA:', error);
        reject();
      });
  });
