import React from 'react'
import { TextInput, Text } from 'react-native-paper';

import Container from '../layouts/Container';

const InputText = ({message, password, ...props}) => {
  return (
    <Container className={"p-0 m-0"}>
      <TextInput {...props} />
      {message ? <Text className={'text-red-700 font-semibold ml-4'}>{message}</Text> : null}
    </Container>
  );
}

export default InputText;