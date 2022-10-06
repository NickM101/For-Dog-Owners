import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserDetail = ({title, value, field, disabled = false}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
       {!disabled && navigation.navigate('EditField', {
          title,
          value,
          field,
        });}
      }}
      className={'flex justify-between flex-row px-2 py-4'}>
      <Text className={'font-bold text-black text-base'}>{title}</Text>
      <View className={'flex-row items-center'}>
        <Text className={'font-semibold'}>
          {value || '- -'}
        </Text>
        <MaterialIcon name={'chevron-right'} size={24} />
      </View>
    </TouchableOpacity>
  );
};

export default UserDetail;
