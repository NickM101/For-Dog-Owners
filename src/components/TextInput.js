import React from 'react'
import { TextInput, Text } from 'react-native-paper';

import Container from './Container/Container';

const InputText = ({message, password, ...props}) => {
  return (
    <Container className={"p-0 m-0"}>
      <TextInput {...props} />
      {message ? <Text className={'font-serif'}>{message}</Text> : null}
    </Container>
  );
}

export default InputText;