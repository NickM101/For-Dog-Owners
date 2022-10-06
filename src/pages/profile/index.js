import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../layouts/Container';
import ProfileHeader from '../../layouts/Header';
import ProfilePicture from '../../components/profile/ProfilePicture';
import ProfileCount from '../../components/profile/ProfileCount';
import ProfileEdit from '../../components/profile/ProfileEdit';
import ProfileTabs from '../../components/profile/ProfileTabs';
import {useAuth} from '../../context/AuthContext';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  // TODO: get thumbnails for user and display

  return (
    <Container>
      <ProfilePicture />
      <ProfileCount />
      <ProfileEdit />
      <View className={'h-5 justify-center items-center'}>
        <TouchableOpacity>
          <Text>Tap to add bio</Text>
        </TouchableOpacity>
      </View>
      <ProfileTabs />
    </Container>
  );
};

export default ProfileScreen;
