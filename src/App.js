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
import {Provider as ReduxProvider, useDispatch} from 'react-redux';

import {WithSplashScreen} from './components/SplashScreen';
import Router from './router';
import {store} from './redux/store';

import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-toast-message';

import {AuthProvider} from './context/AuthContext';
import Container from './layouts/Containers/Container';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

auth().useEmulator('http://192.168.0.103:9099');
firestore().useEmulator('192.168.0.103', 8080);
database().useEmulator('192.168.0.103', 9000);
storage().useEmulator('192.168.0.103', 9199);
functions().useEmulator('192.168.0.103', 5002);

const App = () => {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <WithSplashScreen isAppReady={true}>
          <PaperProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <Router />
            </GestureHandlerRootView>
          </PaperProvider>
          <Toast />
        </WithSplashScreen>
      </ReduxProvider>
    </AuthProvider>
  );
};

export default App;
