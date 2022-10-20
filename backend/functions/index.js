const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

// ---------------------- POSTS --------------------- //

exports.newPost = functions.firestore
  .document('posts/{userID}/personal/{postID}')
  .onCreate((snap, context) => {
    const document_id = snap.id;

    db.collection('followers')
      .doc(context.params.userID)
      .collection(`followers_users`)
      .get()
      .then(documentSnapshot => {
        console.log('doc', documentSnapshot.empty());
        if (!documentSnapshot.empty()) {
          const batch = admin.firestore().batch();

          documentSnapshot.forEach(item => {
            console.log('items', item);
            const ref = db.collection('feeds').doc(item.id);
            batch.create(ref, document_id);
          });

          batch.commit();
        }
      });
  });

// --------------------------------------------------- //

// ---------------- Follow & Followers --------------- //

exports.onFollowCreate = functions.firestore
  .document('following/{userID}/following_users/{id}')
  .onCreate((snap, context) => {
    db.collection('user')
      .doc(context.params.userID)
      .update({following: admin.firestore.FieldValue.increment(1)})
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
        db.collection('user')
          .doc(context.params.id)
          .update({followers: admin.firestore.FieldValue.increment(1)});
      })
      .catch(er => console.log(er));
  });

exports.onFollowDelete = functions.firestore
  .document('following/{userID}/followers_users/{id}')
  .onDelete((snap, context) => {
    db.collection('user')
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
