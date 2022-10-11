import {View, Text} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import Container from '../../layouts/Container';
import {Button, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputText from '../../layouts/TextInput';
import {firebaseErrors} from '../../services/fb_errors';

const ForgotPassword = ({navigation}) => {
  const [loading, setLoading] = useState(false);

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
    });
  }, [navigation]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async data => {
    setLoading(true);
    await auth()
      .sendPasswordResetEmail(data.email)
      .then(() => navigation.navigate('CheckMail'))
      .catch(error => firebaseErrors(error.code));
  };

  return (
    <Container className={'p-5'}>
      <Text className={'font-bold text-black text-3xl'}>Reset password</Text>
      <Text className={'font-medium text-base pt-5'}>
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password.
      </Text>
      <View className={'mt-4'}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <InputText
              className={'my-3'}
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
        <Button
          className={'my-3 rounded-sm bg-slate-600'}
          icon=""
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          Send Instructions
        </Button>
      </View>
    </Container>
  );
};

export default ForgotPassword;
