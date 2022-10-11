import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../../layouts/Container';
import {Button, TextInput} from 'react-native-paper';
import Header from '../../../layouts/Header';
import {saveUserField} from '../../../services/user';
import {firebaseErrors} from '../../../services/fb_errors';
import { useAuth } from '../../../context/AuthContext';

const EditField = ({navigation, route}) => {
  const {title, value, field} = route.params;
  const [text, setText] = React.useState(value);
  const { loading, updateProfile } = useAuth()

  const onSave = () => {
    setLoading(true);
    saveUserField(field, text)
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch(error => {
        setLoading(false);
        firebaseErrors(error.code);
      });
  };

  return (
    <Container>
      <Header title={title} />
      <TextInput
        className={'mx-3 my-2'}
        mode="outlined"
        label={title}
        value={text}
        onChangeText={text => setText(text)}
      />
      <Button
        mode="contained"
        onPress={() => updateProfile(field, text)}
        className={'m-3 rounded-sm'}>
        {loading ? 'Updating' : 'Update'} {`${title}`}
      </Button>
    </Container>
  );
};

export default EditField;
