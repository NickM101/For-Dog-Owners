import React from 'react'
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

import Container from './Container';

const InputText = ({message, password, ...props}) => {
  return (
    <View>
      <TextInput {...props} />
      {message ? <Text className={'text-red-700 font-semibold ml-4'}>{message}</Text> : null}
    </View>
  );
}

export default InputText;