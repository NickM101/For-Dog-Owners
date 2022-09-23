import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';


import Container from '../../layouts/Containers/Container';

const AuthMenu = ({authPage, setAuthPage}) => {

  const _handleAnonymous = () => {
   return auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };
  return (
    <Container>
      <View className={'flex-initial p-5 h-1/4 items-center justify-center'}>
        <Text className={'text-black font-extrabold text-3xl mb-4'}>{authPage == 0 ? 'Sign up' : 'Login'}</Text>
        <Text className={'text-base text-center'}>
          Create a profile, follow other accounts, create your own videos and
          more.
        </Text>
      </View>
      <View className={'flex-1 h-52 justify-evenly items-center'}>
        <TouchableOpacity
          className={
            'flex flex-row h-14 w-5/6 bg-white rounded-sm items-center justify-between '
          }>
          <Text className="p-5">Icon</Text>
          <Text className="right-4">Use email</Text>
          <View className={'p-5'} />
        </TouchableOpacity>
        <TouchableOpacity
          className={
            'flex flex-row h-14 w-5/6 bg-white rounded-sm items-center justify-between '
          }
          onPress={_handleAnonymous}
          >
          <Text className="p-5">Icon</Text>
          <Text className="right-5">Continue with Anonymous</Text>
          <View className={''} />
        </TouchableOpacity>
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

export default AuthMenu;
