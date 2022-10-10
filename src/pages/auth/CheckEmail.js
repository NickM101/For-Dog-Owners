import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Container from '../../layouts/Container'

const CheckEmail = ({ navigation}) => {
  return (
    <Container className="flex justify-center">
      <View className={'flex-1 justify-center'}>
        <View className={'flex items-center'}>
          <MaterialIcons name="email-newsletter" size={120} color={'orange'} />
        </View>
        <Text className={'text-center text-black text-3xl font-bold'}>
          Check your mail
        </Text>
        <Text className={'text-center px-5'}>
          We have sent a password recover instructions to your email.
        </Text>
        <View className={'h-44 justify-center'}>
          <Button mode={'contained'} className={'rounded mx-3 my-4'}>
            Open email app
          </Button>
          <Button
            className={'my-4'}
            onPress={() => navigation.navigate('Login')}>
            Skip, I'll confirm later
          </Button>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} className={'flex my-5 items-center'}>
        <Text className="font-medium">
          Did not receive the email? Check your spam filter,
        </Text>
        <Text className="font-medium">
          or{' '}
          <Text className="font-medium text-red-500">
            try another email address
          </Text>
        </Text>
      </TouchableOpacity>
    </Container>
  );
}

export default CheckEmail