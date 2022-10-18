import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

import notifee from '@notifee/react-native';
import {v4 as uuidv4} from 'uuid';

export const saveMediaStorage = (media, path, metadata) =>
  new Promise(async (resolve, reject) => {
    // const channelId = await notifee.createChannel({
    //   id: 'in-app',
    //   name: 'In-App Notification',
    // });
    const pathToTake =
      path === 'post'
        ? `post/${auth().currentUser.uid}/${uuidv4()}`
        : `profileImage/${auth().currentUser.uid}`;
    const fileRef = storage().ref(pathToTake);

    const task = metadata
      ? fileRef.putFile(media, {
          contentType: 'image/png',
        })
      : fileRef.putFile(media);
    task.on('state_changed', async taskSnapshot => {
      // if (taskSnapshot.metadata.contentType === 'video/mp4') {
      //   console.log('contentType', taskSnapshot.metadata.contentType);
      //   const file_name = taskSnapshot.metadata.name;
      //   console.log('status', taskSnapshot.status);
      //   console.log('file_name', file_name);
      //   if (taskSnapshot.status === 'start') {
      //     await notifee.displayNotification({
      //       id: file_name,
      //       title: 'Uploading Video ...',
      //       android: {
      //         channelId,
      //         progress: {
      //           max: taskSnapshot.totalBytes,
      //           current: 0,
      //         },
      //       },
      //     });
      //   }
      //   if (taskSnapshot.status === 'update') {
      //     await notifee.displayNotification({
      //       id: file_name,
      //       title: 'Uploading Video ...',
      //       android: {
      //         channelId,
      //         progress: {
      //           max: taskSnapshot.totalBytes,
      //           current: taskSnapshot.bytesTransferred,
      //         },
      //       },
      //     });
      //   }
      //   if (taskSnapshot.totalBytes === taskSnapshot.totalBytes) {
      //     await notifee.displayNotification({
      //       id: file_name,
      //       title: 'Finalizing upload...',
      //       android: {
      //         channelId,
      //         progress: {
      //           indeterminate: true,
      //         },
      //       },
      //     });
      //   }
      //   if (taskSnapshot.status === 'complete') {
      //     await notifee.cancelNotification(file_name);
      //   }
      // }
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
