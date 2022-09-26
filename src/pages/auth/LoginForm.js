import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import Container from '../../components/Container/Container';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { emailSignIn, loading } = useAuth()

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
          onPress={() => emailSignIn()}>
         {loading ?  'Logging in' : 'Login'}
        </Button>
      </View>
    </Container>
  );
};

export default LoginForm;
