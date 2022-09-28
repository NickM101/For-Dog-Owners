import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppStack, AuthStack} from './Routes';
import {useAuth} from '../context/AuthContext';
import BottomTab from './BottomTab';

export default function Router() {
  const {user} = useAuth(useAuth);
  console.log('user', user)

  return (
    <NavigationContainer>
      {user ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
