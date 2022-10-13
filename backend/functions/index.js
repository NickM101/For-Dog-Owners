const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.newUser = functions.auth.user().onCreate(user => {
  db.collection('user')
    .doc(user.uid)
    .create(JSON.parse(JSON.stringify(user)))
    .then(() => {
      return admin
        .database()
        .ref(`users/${user.uid}`)
        .set({
          user: {id: user.uid, username: user.displayName},
          deviceToken: '',
        });
    });
});

// ------------- POSTS -------------- //

exports.newPost = functions.firestore
  .document('posts/{postID}')
  .onCreate((snap, context) => {
    const new_data = snap.data();

    console.log('new data onCreate', new_data);

    return admin.database().ref(`feeds/${context.params.postID}`).set({
      likes: [],
      comments: [],
      id: context.params.postID,
      creator: new_data.creator,
    });
  });
