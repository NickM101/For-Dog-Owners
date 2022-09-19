import React from 'react';
import {View, Text} from 'react-native';

const IntroHeader = ({title, subtitle}) => {
  return (
    <View className="h-40">
      <Text className="text-black font-extrabold text-5xl font-mono">
        {title}
      </Text>
      <Text className="text-black text-base font-semibold font-serif">
        {subtitle}
      </Text>
    </View>
  );
};

export default IntroHeader;
