import {GestureHandlerRootView} from 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https:github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import {enableScreens} from 'react-native-screens';
// enableScreens();
import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider, Text} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';

import {WithSplashScreen} from './pages/SplashScreen';
import Router from './router';

import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-toast-message';

import {AuthProvider} from './context/AuthContext';

auth().useEmulator('http://10.0.2.2:9099');
firestore().useEmulator('10.0.2.2', 8085);
database().useEmulator('10.0.2.2', 9000);
storage().useEmulator('10.0.2.2', 9199);
functions().useEmulator('10.0.2.2', 5002);

const App = () => {
  return (
    <AuthProvider>
        <WithSplashScreen isAppReady={true}>
          <PaperProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <Router />
            </GestureHandlerRootView>
          </PaperProvider>
          <Toast />
        </WithSplashScreen>
    </AuthProvider>
  );
};

export default App;
