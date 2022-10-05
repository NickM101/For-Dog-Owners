import storage from '@react-native-firebase/storage';
``;

export const saveMediaStorage = (media, path, metadata) =>
  new Promise((resolve, reject) => {
    const fileRef = storage().ref(path);

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
