import React from 'react';
import 'react-native-get-random-values';

import {v4 as uuidv4} from 'uuid';

import firestore from '@react-native-firebase/firestore';

import {saveMediaStorage} from '../services/firebase';

// TODO: create post should have both the video and thumbnail; share saveMediaStorage function (promise.all)

export const createPost = (video, user, thumbnail) => dispatch =>
  new Promise((resolve, reject) => {
    console.debug('thumbnail', thumbnail);
    console.debug('video', video);
    const storagePostID = uuidv4();
    const allSavePromises = Promise.all([
      saveMediaStorage(video, `post/${user}/${storagePostID}/video`, false),
      saveMediaStorage(
        thumbnail,
        `post/${user}/${storagePostID}/thumbnail`,
        true,
      ),
    ]);

    console.log('imageURl', allSavePromises);

    allSavePromises
      .then(media => {
        console.log('Download url', media);
        return firestore()
          .collection('post')
          .add({
            creator: user,
            media,
            description: '',
            likesCount: 0,
            commentsCount: 0,
            creation: Date.now(),
          })
          .then(() => resolve())
          .catch(() => reject());
      })
      .catch(err => {
        reject();
        console.error('Error firestore', err);
      });
  });

export const getPostsByUser = uid => dispatch =>
  new Promise((response, resolve) => {
    firestore()
      .collection('posts')
      .where('creator', '==', uid)
      .orderBy('creation', 'desc')
      .onSnapshot(snapshot => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        response(posts);
      });
  });
