import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';
import Pager from '../layouts/Home/Pager';
import CameraScreen from '../pages/camera';
import { CameraStack } from './Routes';

const Tab = createBottomTabNavigator();

const Screen = ({name}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">This is the {name} screen</Text>
    </View>
  );
};

export const HomeScreen = () => <Screen name="DogHome" />;
export const DiscoverScreen = () => <Screen name="Discover" />;

export const InboxScreen = () => <Screen name="Inbox" />;
export const ProfileScreen = () => <Screen name="Profile" />;

export default function BottomTab() {
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
          } else if (route.name === 'Inbox') {
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
      <Tab.Screen name="Home" component={Pager} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Camera" component={CameraStack} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
