import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';

const ProfilePicture = () => {
  return (
    <View className={'py-4 w-full items-center'}>
      <Avatar.Image
        size={100}
        source={require('../../assets/images/logo.png')}
      />
      <Text className="py-4 font-semibold text-black">@JohnDoe</Text>
      
    </View>
  );
};

export default ProfilePicture;
