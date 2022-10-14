import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';

import {WithSplashScreen} from './pages/SplashScreen';
import Router from './router';

import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-toast-notifications';

import {LogBox, Text} from 'react-native';

import {AuthProvider} from './context/AuthContext';
import {persistor, store} from './features/store';
import LoginForm from './pages/auth/LoginForm';
import {PersistGate} from 'redux-persist/integration/react';

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
LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    // <AuthProvider>
    <ReduxProvider store={store}>
      {/* <PersistGate loading={<Text>Loading ...</Text>} persistor={persistor}> */}
      <WithSplashScreen isAppReady={true}>
        <PaperProvider theme={theme}>
          <GestureHandlerRootView style={{flex: 1}}>
            <Router />
            <Toast ref={ref => (global['toast'] = ref)} />
          </GestureHandlerRootView>
        </PaperProvider>
      </WithSplashScreen>
      {/* </PersistGate> */}
    </ReduxProvider>
    // </AuthProvider>
  );
};

export default App;
