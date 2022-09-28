import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar, TextInput, Button} from 'react-native-paper';
import Container from '../../components/Container/Container';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

const RegisterMenu = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [secureText, setSecureText] = useState(true);

  const _handleRegistration = () => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('success registration');
      })
      .catch(err => console.error('Error registration', err));
  };
  return (
    <Container>
      <Appbar.Header className={'bg-slate-200'} mode={'center-aligned'}>
        <Appbar.BackAction className={'m-0 p-0'} onPress={() => {}} />
        <Appbar.Content title="" />
        <Appbar.Action icon="help" onPress={() => {}} />
      </Appbar.Header>

      <View className="flex-auto justify-center">
        <TextInput
          className={'m-3'}
          mode="outlined"
          label="Username"
          placeholder="Type something"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          className={'m-3'}
          mode="outlined"
          label="Email Address"
          placeholder="Type something"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className={'m-3'}
          mode="outlined"
          label="Password"
          placeholder="Type something"
          secureTextEntry={secureText}
          right={
            <TextInput.Icon
              onPress={() => setSecureText(!secureText)}
              icon={secureText ? 'eye-off' : 'eye'}
            />
          }
          value={password}
          onChangeText={setPassword}
        />
        <Button
          className={'m-3 rounded-sm bg-slate-600'}
          icon=""
          mode="contained"
          onPress={_handleRegistration}>
          Register
        </Button>
      </View>
    </Container>
  );
};

export default RegisterMenu;
