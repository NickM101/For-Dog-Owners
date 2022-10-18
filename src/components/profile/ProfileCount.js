import {View, Text} from 'react-native';
import React from 'react';

const ProfileCount = () => {
  return (
    <View className={'flex-row justify-around'}>
      <View />
      <View className={'items-center'}>
        <Text className={'font-bold text-black'}>3</Text>
        <Text>Following</Text>
      </View>
      <View className={'items-center '}>
        <Text className={'font-bold text-black'}>3</Text>
        <Text>Followers</Text>
      </View>
      <View />
    </View>
  );
};

export default ProfileCount;
