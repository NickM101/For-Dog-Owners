import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Linking, Text} from 'react-native';
import {AuthStack} from './Routes';
import {useAuth} from '../context/AuthContext';
import BottomTab from './BottomTab';
import {useSelector} from 'react-redux';
import {loggedInUser} from '../features/user/userSlice';

export default function Router() {
  const user = useSelector(loggedInUser);

  console.log(user);

  const linking = {
    prefixes: ['tiktok://'],

    // Custom function to get the URL which was used to open the app
    async getInitialURL() {
      // First, you would need to get the initial URL from your third-party integration
      // The exact usage depend on the third-party SDK you use
      // For example, to get to get the initial URL for Firebase Dynamic Links:
      // const {isAvailable} = utils().playServicesAvailability;

      // if (isAvailable) {
      // const initialLink = await dynamicLinks().getInitialLink();

      // if (initialLink) {
      //   return initialLink.url;
      // }
      // }

      // As a fallback, you may want to do the default deep link handling
      const url = await Linking.getInitialURL();

      return url;
    },

    // Custom function to subscribe to incoming links
    subscribe(listener) {
      // Listen to incoming links from Firebase Dynamic Links
      // const unsubscribeFirebase = dynamicLinks().onLink(({url}) => {
      //   listener(url);
      // });

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', ({url}) => {
        listener(url);
      });

      return () => {
        // Clean up the event listeners
        // unsubscribeFirebase();
        linkingSubscription.remove();
      };
    },

    config: {
      // Deep link configuration
      screens: {
        Reset: 'reset/:id',
      },
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      {user?.id ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
