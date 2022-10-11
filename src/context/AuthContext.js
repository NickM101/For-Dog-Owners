import React, {useState, useEffect, createContext, useContext} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {firebaseErrors} from '../services/fb_errors';
import {fetchUser} from '../services/user';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  GoogleSignin.configure({
    webClientId: '',
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function anonymousSignIn() {
    setLoading(true);
    await auth()
      .signInAnonymously()
      .then(user => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('-----Anonymous Failed----', error.code);
      })
      .finally(() => setLoading(false));
  }

  async function emailSignIn(data) {
    setLoading(true);
    await auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then()
      .catch(error => {
        return firebaseErrors(error.code);
      })
      .finally(() => setLoading(false));
  }

  async function signUp(data) {
    await auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(currentUser => {
        setUser({});
      })
      .catch(error => {
        firebaseErrors(error.code)
      });
  }

  async function sendEmail() {
    await sendPasswordResetEmail('vavoli3014@migonom.com')
      .then(() => {
        toast.show('Sent password reset on email');
      })
      .catch(error => firebaseErrors(error.code));
  }

  async function confirmPassword({code, newPassword}) {
    await confirmPasswordReset({code, newPassword})
      .then(() => {
        toast.show('Confirmed reset password');
      })
      .catch(error => firebaseErrors(error.code));
  }

  async function signOut() {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  }

  async function googleSignIn() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}); // <-- Add this
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        console.log('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        console.log('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('sign in required');
      } else {
        console.log('Something went wrong:', error.toString());

        this.setState({
          error,
        });
      }
    }
    // setLoading(true);
    // // Get the users ID token
    // const {idToken} = await GoogleSignin.signIn();
    // console.log('idToken', idToken)

    // // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // // Sign-in the user with the credential
    // return auth()
    //   .signInWithCredential(googleCredential)
    //   .then(() => setLoading(false));
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user && !user.isAnonymous) {
       fetchUser().then(res => {
         const data = res.data();
         setUser(data);
       });
    } else {
      setUser(user)
    }
  }

  async function updateProfile(field, value) {
    let obj = {};
    obj[field] = value;
    setLoading(true);
    firestore()
      .collection('user')
      .doc(auth().currentUser.uid)
      .update(obj)
      .then(() => {
        fetchUser()
          .then(res => {
            setLoading(false);
            const data = res.data();
            setUser(data);
          })
          .catch(err => console.error('error', err));
      })
      .catch(error => {
        setLoading(false);
        reject(error);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        anonymousSignIn,
        emailSignIn,
        signUp,
        signOut,
        sendEmail,
        confirmPassword,
        googleSignIn,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth can only be used inside AuthProvider');
  }
  return context;
};
