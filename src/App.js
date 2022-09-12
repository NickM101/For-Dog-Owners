/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {WithSplashScreen} from './layouts/SplashScreen';

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
    <WithSplashScreen isAppReady={isAppReady}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello Tiktok for dogs</Text>
      </View>
    </WithSplashScreen>
  );
};

export default App;
