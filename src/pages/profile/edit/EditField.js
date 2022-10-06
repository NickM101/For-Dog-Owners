import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../../layouts/Container';
import {TextInput} from 'react-native-paper';
import Header from '../../../layouts/Header';
import {saveUserField} from '../../../services/user';

const EditField = ({navigation, route}) => {
  const {title, value, field} = route.params;
  const [text, setText] = React.useState(value);

  const onSave = () => {
    saveUserField(field, text).then(() => navigation.goBack());
  };

  return (
    <Container>
      <Header title={title}  />
      <TextInput
        mode="outlined"
        label={title}
        value={text}
        onChangeText={text => setText(text)}
      />
    </Container>
  );
};

export default EditField;
