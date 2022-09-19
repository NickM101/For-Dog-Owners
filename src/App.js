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

import {WithSplashScreen} from './layouts/SplashScreen';
import Router from './router';
import ChooseInterest from './screens/ChooseInterest';

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  async function initialize() {
    setTimeout(() => true, 1000);
  }

  useEffect(() => {
    initialize().then(() => {
      setIsAppReady(true);
    });
  }, []);
  return (
    <PaperProvider>
      <WithSplashScreen isAppReady={isAppReady}>
        {/* <Router /> */}
        <ChooseInterest />
      </WithSplashScreen>
    </PaperProvider>
  );
};

export default App;
