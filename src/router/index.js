import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';

const Tab = createBottomTabNavigator();

const Screen = ({name}) => {
  return (
    <View className="flex h-screen items-center">
      <Text className="text-bold">This is the {name} screen</Text>
    </View>
  );
};

export const HomeScreen = () => <Screen name="Home" />;
export const DiscoverScreen = () => <Screen name="Discover" />;
export const CameraScreen = () => <Screen name="Camera" />;
export const InboxScreen = () => <Screen name="Inbox" />;
export const ProfileScreen = () => <Screen name="Profile" />;

export default function index() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
