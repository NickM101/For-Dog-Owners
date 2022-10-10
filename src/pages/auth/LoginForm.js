import React, {useState, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
import Container from '../../layouts/Container';
import {useAuth} from '../../context/AuthContext';
import Toast from 'react-native-toast-message';

const LoginForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [secureText, setSecureText] = useState(true);

  const {emailSignIn, anonymousSignIn, loading, googleSignIn} = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerTitleAlign: 'center',
      headerLeft: null,
    });
  }, [navigation]);

  return (
    <Container>
      <View className={'flex'}>
        <TextInput
          className={'m-3'}
          mode="outlined"
          label="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className={'m-3'}
          mode="outlined"
          label="Password"
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
          mode="text"
          className={'self-end mr-3 text-black text-end'}
          onPress={() => navigation.navigate('Forgot')}>
          Forgot password ?
        </Button>
        <Button
          className={'m-3 rounded-sm bg-slate-600'}
          icon=""
          mode="contained"
          loading={loading}
          onPress={() => emailSignIn()}>
          {loading ? 'Logging in' : 'Login'}
        </Button>
        <View className={'relative flex-row py-4 items-center'}>
          <View className={'flex-grow border-t border-gray-400'}></View>
          <Text className={'flex-shrink mx-2 font-bold'}>OR</Text>
          <View className={'flex-grow border-t border-gray-400'}></View>
        </View>
        <View>
          <Button
            className={'m-3 rounded-sm bg-slate-600'}
            icon={'incognito'}
            mode="contained"
            onPress={() => anonymousSignIn()}>
            Continue Anonymous
          </Button>
          <Button
            className={'m-3 rounded-sm bg-slate-600'}
            icon={'google'}
            mode="contained"
            onPress={() => googleSignIn()}>
            Continue with Google
          </Button>
        </View>
      </View>
      <View className={'flex-1 justify-end'}>
        <Text
          onPress={() => navigation.navigate('Register')}
          className={'text-black font-semibold text-center my-5'}>
          Don't have an account? <Text className="text-red-600">Register</Text>
        </Text>
      </View>
    </Container>
  );
};

export default LoginForm;
