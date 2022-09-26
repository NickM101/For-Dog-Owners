import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Pager from '../layouts/Home/Pager';
import AuthScreen from '../pages/auth';
import LoginForm from '../pages/auth/LoginForm';

import CameraScreen from '../pages/camera';
import MediaPage from '../pages/camera/MediaPage';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={AuthScreen} />
      <Stack.Screen name="SignIn" component={LoginForm} />
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Home" component={Pager} />
    </Stack.Navigator>
  );
};


export const CameraStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Capture" component={CameraScreen} />
      <Stack.Screen name="Media" component={MediaPage} />
    </Stack.Navigator>
  );
}
