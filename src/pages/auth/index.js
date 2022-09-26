import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Container from '../../components/Container/Container';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native-paper';
import {useAuth} from '../../context/AuthContext';

const AuthScreen = ({navigation}) => {
  const [authPage, setAuthPage] = useState(0);

  const {anonymousSignIn} = useAuth();

  console.log('log', anonymousSignIn);
  return (
    <Container>
      <View className={'flex-initial p-5 h-1/4 items-center justify-center'}>
        <Text className={'text-black font-extrabold text-3xl mb-4'}>
          {authPage == 0 ? 'Login' : 'Register'}
        </Text>
        <Text className={'text-base text-center'}>
          Create a profile, follow other accounts, create your own videos and
          more.
        </Text>
      </View>
      <View className={'flex-auto justify-evenly items-center'}>
        <Button
          className={'w-96 rounded-sm'}
          icon="email"
          mode="contained"
          onPress={() => navigation.navigate('SignIn')}>
          Use Email
        </Button>
        <Button
          className={'w-96 rounded-sm'}
          icon="incognito"
          mode="contained"
          onPress={() => anonymousSignIn()}>
          Continue Anonymous
        </Button>
      </View>
      <View className={'flex-initial h-1/4 items-center justify-around'}>
        <View className={'p-5 mt-4'}>
          <Text className={'text-center'}>
            By continuing, you agree to our{' '}
            <Text className={' text-black font-semibold underline'}>
              Terms of Service
            </Text>{' '}
            and acknowledge that you have read our{' '}
            <Text className={' text-black font-semibold underline'}>
              Privacy Policy{' '}
            </Text>
            to learn how we collect, use, and share your data.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => (authPage == 0 ? setAuthPage(1) : setAuthPage(0))}>
            {authPage == 0 ? (
              <Text className={'text-base font-semibold'}>
                Don't have an account?{' '}
                <Text className={'font-bold text-red-500'}>Register</Text>
              </Text>
            ) : (
              <Text className={'text-base font-semibold'}>
                Already have an account?{' '}
                <Text className={'font-bold text-red-500'}>Log in</Text>
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default AuthScreen;
