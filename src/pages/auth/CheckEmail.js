import React from 'react'
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Container from '../../components/Container/Container'

const CheckEmail = () => {
  return (
    <Container className="flex justify-center">
      <View className={'flex-1 justify-center'}>
        <View className={'flex items-center'}>
          <MaterialIcons name="email-newsletter" size={120} color={'purple'}/>
        </View>
        <Text className={'text-center text-black text-3xl font-bold'}>
          Check your mail
        </Text>
        <Text className={'text-center text-base px-5'}>
          We have sent a password recover instructions to your email.
        </Text>
        <View className={'h-44 justify-center'}>
          <Button mode={'contained'} className={'rounded my-4'}>
            Open email app
          </Button>
          <Button className={'my-4'}>Skip, I'll confirm later</Button>
        </View>
      </View>
      <View className={'flex my-5 items-center'}>
        <Text className="text-black font-medium">
          Did not receive the email? Check your spam filter,
        </Text>
        <Text className="text-black font-medium">
          or <Text className="font-medium text-red-500">try another email address</Text>
        </Text>
      </View>
    </Container>
  );
}

export default CheckEmail