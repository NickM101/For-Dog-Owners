import React, {useState, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import Container from '@layouts/Container';
import InputText from '@layouts/TextInput';
import {anonymousLogIn, loginUser} from '@features/user/userActions';

const LoginForm = ({navigation}) => {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.user.loading);

  const [secureText, setSecureText] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerTitleAlign: 'center',
      headerLeft: null,
    });
  }, [navigation]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => dispatch(loginUser(data));

  return (
    <Container>
      <View className={'flex'}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputText
              className={'m-3'}
              mode="outlined"
              label="Email Address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email}
              message={errors.email && 'Email Address is required.'}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputText
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
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password}
              message={errors.password && 'Password is required.'}
            />
          )}
          name="password"
        />
        <Button
          mode="text"
          className={'self-end mr-3 text-black text-end'}
          onPress={() => navigation.navigate('Forgot')}>
          Forgot password ?
        </Button>
        <Button
          className={'m-3 rounded-sm '}
          icon=""
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          {loading ? 'Logging in' : 'Login'}
        </Button>
        <View className={'relative flex-row py-4 items-center'}>
          <View className={'flex-grow border-t border-gray-400'}></View>
          <Text className={'flex-shrink mx-2 font-bold'}>OR</Text>
          <View className={'flex-grow border-t border-gray-400'}></View>
        </View>
        <View>
          <Button
            className={'m-3 rounded-sm'}
            icon={'incognito'}
            mode="contained"
            onPress={() => dispatch(anonymousLogIn())}>
            Continue Anonymous
          </Button>
          {/* <Button
            className={'m-3 rounded-sm'}
            icon={'google'}
            mode="contained"
            onPress={() => {}}>
            Continue with Google
          </Button> */}
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
