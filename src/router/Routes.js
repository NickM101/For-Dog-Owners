import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommentSection from '../components/home/CommentSection';
import TextInput from '../layouts/TextInput';

import AuthScreen from '../pages/auth';
import CheckEmail from '../pages/auth/CheckEmail';
import ForgotPassword from '../pages/auth/ForgotPassword';
import LoginForm from '../pages/auth/LoginForm';
import PasswordReset from '../pages/auth/PasswordReset';
import RegisterMenu from '../pages/auth/RegisterForm';

import CameraScreen from '../pages/camera';
import MediaPage from '../pages/camera/MediaPage';
import HomeFeed from '../pages/home';
import ProfileScreen from '../pages/profile';
import EditProfile from '../pages/profile/edit';
import EditField from '../pages/profile/edit/EditField';
import {HomeScreen} from './BottomTab';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Welcome" component={AuthScreen} /> */}
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Register" component={RegisterMenu} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen name="Reset" component={PasswordReset} />
      <Stack.Screen name="CheckMail" component={CheckEmail} />
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeFeed} />
      <Stack.Screen name="CommentSection" component={CommentSection} />
    </Stack.Navigator>
  );
};

export const CameraStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Capture" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Edit" component={EditProfile} />
      <Stack.Screen name="EditField" component={EditField} />
    </Stack.Navigator>
  );
};
