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
import React, {useEffect, useRef, useState} from 'react';
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

import {WithSplashScreen} from './pages/SplashScreen';
import Router from './router';

import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-toast-notifications';

import {LogBox} from 'react-native';

import {AuthProvider} from './context/AuthContext';

auth().useEmulator('http://192.168.0.103:9099');
firestore().useEmulator('192.168.0.103', 8085);
database().useEmulator('192.168.0.103', 9000);
storage().useEmulator('192.168.0.103', 9199);
functions().useEmulator('192.168.0.103', 5002);

const theme = {
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF5A00',
    secondary: '#FFCE00',
    tertiary: '#a1b2c3',
  },
};

// LogBox.ignoreAllLogs()
LogBox.ignoreAllLogs(true)

const App = () => {
  return (
    <AuthProvider>
      <WithSplashScreen isAppReady={true}>
        <PaperProvider theme={theme}>
          <GestureHandlerRootView style={{flex: 1}}>
            <Router />
            <Toast ref={ref => (global['toast'] = ref)} />
          </GestureHandlerRootView>
        </PaperProvider>
      </WithSplashScreen>
    </AuthProvider>
  );
};

export default App;
