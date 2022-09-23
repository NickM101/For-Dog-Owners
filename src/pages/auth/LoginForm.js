import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import Container from '../../layouts/Containers/Container';
import auth from '@react-native-firebase/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <Container>
      <Appbar.Header className={'bg-slate-200'} mode={'center-aligned'}>
        <Appbar.BackAction className={'m-0 p-0'} onPress={() => {}} />
        <Appbar.Content title="Welcome back!" />
        <Appbar.Action icon="help" onPress={() => {}} />
      </Appbar.Header>

      <View className={'flex-auto justify-center'}>
        <TextInput
          className={'m-3'}
          mode="outlined"
          label="Email Address"
          value={email}
          right={<TextInput.Affix text="/100" />}
          onChangeText={setEmail}
        />
        <TextInput
          className={'m-3'}
          mode="outlined"
          label="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button
          className={'m-3 rounded-sm bg-slate-600'}
          icon=""
          mode="contained"
          onPress={_handleLogin}>
          Login
        </Button>
      </View>
    </Container>
  );
};

export default LoginForm;
