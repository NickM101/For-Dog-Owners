import {View, Text} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import Container from '../../layouts/Container';
import {TextInput, Button} from 'react-native-paper';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputText from '../../components/TextInput';


const PasswordReset = ({navigation}) => {
  const [secureText, setSecureText] = useState(true)
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

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
       )
     });
   }, [navigation]);

  return (
    <Container className={'p-5'}>
      <Text className={'text-black font-bold text-3xl'}>
        Create new password
      </Text>
      <Text className={'text-base'}>
        Your new password must be different from previous used passwords.
      </Text>
      <View>
        <InputText
          className={'my-3'}
          mode="outlined"
          label={'Set Password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          message={'sds'}
          right={
            <TextInput.Icon
              onPress={() => setSecureText(!secureText)}
              icon={secureText ? 'eye-off' : 'eye'}
            />
          }
        />
        <InputText
          className={'my-3'}
          mode="outlined"
          label={'Confirm Password'}
          value={confirm}
          onChangeText={setConfirm}
        />
        <Button mode="contained" className={'rounded mt-5'}>
          Reset Password
        </Button>
      </View>
    </Container>
  );
};

export default PasswordReset;
