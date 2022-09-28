import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image} from 'react-native';
import Container from '../../components/Container/Container';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native-paper';
import {useAuth} from '../../context/AuthContext';

const AuthScreen = ({navigation}) => {

  return (
    <Container>
      <View className={' flex-row justify-between'}>
        <View />
        <Image
          resizeMode="contain"
          className={'h-96 w-96 left-14'}
          source={require('../../assets/images/petbox.png')}
        />
      </View>
      <View className={'flex-auto '}>
        <Text className={'text-2xl text-black font-bold py-4'}>PetBox</Text>
        <Text className={'text-lg font-semibold'}>
          “The average dog is a nicer person than the average person.“
        </Text>
        <Text className={'font-medium text-slate-500 italic'}>
          ~ Andy Rooney
        </Text>
      </View>
      <View className={'flex flex-row justify-evenly py-4'}>
        <Button
          uppercase={true}
          labelStyle={'text-black'}
          className={'rounded w-32'}
          mode="outlined"
          onPress={() => navigation.navigate('Login')}>
          Login
        </Button>
        <Button
          uppercase={true}
          labelStyle={'text-black'}
          className={'rounded w-32'}
          mode="outlined"
          onPress={() => navigation.navigate('Register')}>
          Register
        </Button>
      </View>
    </Container>
  );
};

export default AuthScreen;