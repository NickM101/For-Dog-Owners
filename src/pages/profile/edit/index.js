import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Container from '../../../layouts/Container';
import {Avatar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import ProfileHeader from '../../../layouts/Header';
import UserDetail from '../../../components/profile/UserDetail';

const EditProfile = ({navigation}) => {
  const user = auth().currentUser;
  return (
    <Container>
      <ProfileHeader />
      {user.photoURL ? (
        <Avatar.Image
          style={{alignSelf: 'center', margin: 20}}
          size={100}
          source={require('../.././../assets/images/logo.png')}
        />
      ) : (
        <Avatar.Icon
          style={{alignSelf: 'center', margin: 20}}
          size={100}
          icon="image-plus"
        />
      )}
      <UserDetail
        title={'Display Name'}
        value={user.displayName}
        field={'displayName'}
      />
      <UserDetail
        title={'Email Address'}
        value={user.email}
        field={'email'}
      />
      <UserDetail
        title={'Phone Number'}
        value={user.phoneNumber}
        field={'phoneNumber'}
      />
    </Container>
  );
};

export default EditProfile;
