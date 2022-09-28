import { View, Text } from 'react-native'
import React, {useState, useLayoutEffect} from 'react';
import Container from '../../components/Container/Container'
import { Button, TextInput } from 'react-native-paper'

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('')


   useLayoutEffect(() => {
     navigation.setOptions({
       headerShown: true,
       headerBackTitleVisible: false,
       headerShadowVisible: false,
       headerTitleAlign: 'center',
       headerTitle: '',
       headerLeft: () => (
         <MaterialIcon
           name="chevron-left"
           size={30}
           iconStyle={{
             margin: 0,
             padding: 0,
           }}
           onPress={() => navigation.goBack()}
         />
       ),
       headerRight: () => (
         <MaterialIcon
           name="help-circle-outline"
           size={28}
           iconStyle={{
             margin: 0,
             padding: 0,
           }}
           onPress={() => navigation.goBack()}
         />
       ),
     });
   }, [navigation]);

  return (
    <Container className={'p-5'}>
      <Text className={'font-bold text-black text-3xl'}>Reset password</Text>
      <Text className={'font-medium text-base pt-5'}>
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password.
      </Text>
      <View className={'mt-4'}>
        <TextInput
          className={'my-3'}
          mode="outlined"
          label={'Email address'}
          value={email}
          onChangeText={setEmail}
        />
        <Button
          className={'my-3 rounded-sm bg-slate-600'}
          icon=""
          mode="contained"
          onPress={() => {}}>
          Send Instructions
        </Button>
      </View>
    </Container>
  );
}

export default ForgotPassword