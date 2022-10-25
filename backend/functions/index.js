const functions = require('firebase-functions');

const admin = require('firebase-admin');
const {FieldValue} = require('firebase-admin/firestore');

admin.initializeApp();

const db = admin.firestore();

// ---------------------- POSTS --------------------- //

// --------------------------------------------------- //

// ---------------- Follow & Followers --------------- //

exports.onFollowCreate = functions.firestore
  .document('following/{userID}/following_users/{id}')
  .onCreate((snap, context) => {
    console.log('params', context.params);
    db.collection('users')
      .doc(context.params.userID)
      .update({following: FieldValue.increment(1)})
      .catch(er => {
        console.log(er);
      });

    db.collection('followers')
      .doc(context.params.id)
      .collection('followers_users')
      .doc(context.params.userID)
      .set({uid: context.params.userID, timeStamp: new Date()})
      .then(() => {
        console.log('------- followers complete ------');
        db.collection('users')
          .doc(context.params.id)
          .update({followers: FieldValue.increment(1)});
      })
      .catch(er => console.log(er));
  });

exports.onFollowDelete = functions.firestore
  .document('following/{userID}/followers_users/{id}')
  .onDelete((snap, context) => {
    db.collection('users')
      .doc(context.params.userID)
      .update({following: admin.firestore.FieldValue.increment(-1)})
      .catch(er => console.log(er));
    db.collection('followers')
      .doc(context.params.id)
      .collection('followers_users')
      .doc(context.params.userID)
      .delete()
      .catch(er => console.log(er));
  });

// ------------------------------------------------------------- //
