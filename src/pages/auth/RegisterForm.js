import React, {useState, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Container from '../../layouts/Container';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputText from '../../components/TextInput';
import { useAuth } from '../../context/AuthContext';


const RegisterMenu = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [secureText, setSecureText] = useState(true);

    const {signUp, loading} = useAuth();


    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
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
      });
    }, [navigation]);

  return (
    <Container>
      <View className="">
        <InputText
          className={'m-3'}
          mode="outlined"
          label="Username"
          placeholder="Type something"
          value={username}
          onChangeText={setUsername}
        />
        <InputText
          className={'m-3'}
          mode="outlined"
          label="Email Address"
          placeholder="Type something"
          value={email}
          onChangeText={setEmail}
        />

        <InputText
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
          onPress={() => signUp()}>
          Register
        </Button>
      </View>
      <View>
        <View className={'relative flex-row py-4 items-center'}>
          <View className={'flex-grow border-t border-gray-400'}></View>
          <Text className={'flex-shrink mx-2 font-bold'}>OR</Text>
          <View className={'flex-grow border-t border-gray-400'}></View>
        </View>
        <View>
          <Button
            className={'m-3 rounded-sm bg-slate-600'}
            icon={'incognito'}
            mode="contained">
            Continue Anonymous
          </Button>
        </View>
      </View>
      <View className="flex-1 justify-end">
        <Text
          onPress={() => navigation.navigate('Login')}
          className={'text-black font-semibold text-center my-5'}>
          Already have an account? <Text className="text-red-600">Login</Text>
        </Text>
      </View>
    </Container>
  );
};

export default RegisterMenu;
