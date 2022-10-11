import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';

const ProfilePicture = ({photo, username}) => {
  return (
    <View className={'py-4 w-full items-center'}>
      <Avatar.Image
        size={100}
        source={{ uri: photo }}
      />
      <Text className="py-4 font-semibold text-black">{username}</Text>
      
    </View>
  );
};

export default ProfilePicture;
