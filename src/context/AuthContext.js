import React, { useState, useEffect, createContext, useContext } from "react";

import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const anonymous = () => {
    auth()
      .signInAnonymously()
      .then((user) => {
        console.log(user)
        console.log('---Anonymous--- Signed in Successfully');
      })
      .catch(error => {
        console.error('-----Anonymous Failed----', error.code);
      });
  };

  const EmailSignIn = () => {
    auth()
      .signInWithEmailAndPassword(
        'jane.doe@example.com',
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
  };

  const SignUp = () => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
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
  };

  const SignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={[user, setUser, anonymous, EmailSignIn, SignUp, SignOut]}>
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
}