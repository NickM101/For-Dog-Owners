const functions = require('firebase-functions');

const admin = require('firebase-admin');
const {FieldValue} = require('firebase-admin/firestore');

admin.initializeApp();

const db = admin.firestore();

// ---------------------- POSTS --------------------- //

exports.onCommentCreated = functions.firestore
  .document('posts/{userID}/personal/{postID}/comments/{commentID}')
  .onCreate((snap, context) => {
    const {userID, postID, commentID} = context.params;

    try {
      db.collection(`posts/${userID}/personal`)
        .doc(postID)
        .update({
          comments: FieldValue.increment(1),
        });
    } catch (error) {
      console.log('onCommentCreated error', error);
    }
  });

// --------------------------------------------------- //

// ---------------- Follow & Followers --------------- //

exports.onFollowCreate = functions.firestore
  .document('following/{userID}/following_users/{id}')
  .onCreate((snap, context) => {
    try {
      db.collection('users')
        .doc(context.params.userID)
        .update({following: FieldValue.increment(1)});

      db.collection('followers')
        .doc(context.params.id)
        .collection('followers_users')
        .doc(context.params.userID)
        .set({uid: context.params.userID, timeStamp: new Date()})
        .then(() => {
          db.collection('users')
            .doc(context.params.id)
            .update({followers: FieldValue.increment(1)});
        });
    } catch (error) {
      console.log('onFollowCreate error', error);
    }
  });

exports.onFollowDelete = functions.firestore
  .document('following/{userID}/followers_users/{id}')
  .onDelete((snap, context) => {
    try {
      db.collection('users')
        .doc(context.params.userID)
        .update({following: admin.firestore.FieldValue.increment(-1)});
      db.collection('followers')
        .doc(context.params.id)
        .collection('followers_users')
        .doc(context.params.userID)
        .delete();
    } catch (error) {
      console.log('onFollowDelete error', error);
    }
  });

// ------------------------------------------------------------- //
