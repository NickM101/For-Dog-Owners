import React from 'react';
import {View, Text} from 'react-native';

const ProfileCount = ({followers = 0, following = 0, likes = 0}) => {
  return (
    <View className={'flex-row justify-center'}>
      <View className={'items-center w-24'}>
        <Text className={'font-bold text-black'}>{following}</Text>
        <Text>Following</Text>
      </View>
      <View className={'justify-center items-center w-20'}>
        <Text className={'font-bold text-black'}>{followers}</Text>
        <Text>Followers</Text>
      </View>
      {/* <View className={'items-center w-20'}>
        <Text className={'font-bold text-black'}>{likes}</Text>
        <Text>Likes</Text>
      </View> */}
    </View>
  );
};

export default ProfileCount;
