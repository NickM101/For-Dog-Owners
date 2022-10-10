import React, {useState, useEffect, createContext, useContext} from 'react';

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

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
        console.log(user);
        console.log('---Anonymous--- Signed in Successfully');
      })
      .catch(error => {
        setLoading(false);
        console.error('-----Anonymous Failed----', error.code);
      })
      .finally(() => setLoading(false));
  }

  async function emailSignIn() {
    setLoading(true);
    await auth()
      .signInWithEmailAndPassword(
        'vavoli3014@migonom.com',
        'SuperSecretPassword!',
      )
      .then(currentUser => {
        setLoading(false);
        console.log('--current user---', currentUser);
        setUser({});
        console.log('User account created & signed in!');
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }

  async function signUp() {
    await auth()
      .createUserWithEmailAndPassword(
        'vavoli3014@migonom.com',
        'SuperSecretPassword!',
      )
      .then(currentUser => {
        console.log('--current user---', currentUser);
        setUser({});
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  async function sendEmail() {
    await sendPasswordResetEmail('vavoli3014@migonom.com')
      .then(() => {
        console.log('Sent password reset on email');
      })
      .catch(error => console.error('Error on resetting email', error));
  }

  async function confirmPassword({code, newPassword}) {
    await confirmPasswordReset({code, newPassword})
      .then(() => {
        console.log('Confirmed reset password');
      })
      .catch(error => console.log('Error confirming password', error));
  }

  async function signOut() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!'), setUser(null);
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
    if (user) {
      setUser(user);
    } else {
    }
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
