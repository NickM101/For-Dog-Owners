/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {WithSplashScreen} from './layouts/SplashScreen';
import Router from './router';

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  async function initialize() {
    setTimeout(() => true, 5000);
  }

  useEffect(() => {
    initialize().then(() => {
      setIsAppReady(true);
    });
  }, []);
  return (
    <PaperProvider>
      <WithSplashScreen isAppReady={isAppReady}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </WithSplashScreen>
    </PaperProvider>
  );
};

export default App;
