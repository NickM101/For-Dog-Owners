import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Pager from '../layouts/Home/Pager';
import AuthScreen from '../pages/auth/AuthMenu';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={AuthScreen} />
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Pager} />
    </Stack.Navigator>
  );
};
