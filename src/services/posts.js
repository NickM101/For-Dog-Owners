import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const FBGetUserPosts = () => new Promise((resolve, reject) => {
      try {
         firestore()
           .collection('posts')
           .where('creator', '==', auth().currentUser.uid)
           .orderBy('creation', 'desc')
           .onSnapshot(snapshot => {
             let posts = snapshot.docs.map(doc => {
               const data = doc.data();
               const id = doc.id;
               return {id, ...data};
             });
             return resolve(posts);
           });
      } catch (error) {
        reject(error)
      }
})