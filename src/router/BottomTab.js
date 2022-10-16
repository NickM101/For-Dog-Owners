import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';
import {CameraStack, HomeStack, ProfileStack} from './Routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CameraScreen from '../pages/camera';
import ProfileScreen from '../pages/profile';
import MediaPage from '../pages/camera/MediaPage';
import HomeFeed from '../pages/home';
import CameraPermission from '../pages/camera/MediaPermissions';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Screen = ({name}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">This is the {name} screen</Text>
    </View>
  );
};

export const HomeScreen = () => <Screen name="DogHome" />;
export const DiscoverScreen = () => <Screen name="Discover" />;

export const InboxScreen = () => <Screen name="Activity" />;

export function TabStacks() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'dog-side' : 'dog-side';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'apple-safari' : 'apple-safari';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'plus-box' : 'plus-box';
          } else if (route.name === 'Activity') {
            iconName = focused ? 'message-reply' : 'message-reply-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Activity" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PetBox" component={TabStacks} />
      <Stack.Screen name="ProfileEdit" component={ProfileStack} />
      <Stack.Screen name="Media" component={MediaPage} />
    </Stack.Navigator>
  );
}
