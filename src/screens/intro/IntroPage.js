import React from 'react';
import {View} from 'react-native';

const IntroPage = ({name}) => {
  return (
    <View className="flex h-screen items-center">
      <Text className="text-bold">This is the {name} screen</Text>
    </View>
  );
};

export default IntroPage;
