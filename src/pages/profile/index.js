import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../layouts/Container';
import ProfileHeader from '../../layouts/Header';
import ProfilePicture from '../../components/profile/ProfilePicture';
import ProfileCount from '../../components/profile/ProfileCount';
import ProfileEdit from '../../components/profile/ProfileEdit';
import ProfileTabs from '../../components/profile/ProfileTabs';
import {useAuth} from '../../context/AuthContext';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {loggedInUser} from '../../features/user/userSlice';
import {logOut} from '../../features/user/userAPI';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const user = useSelector(loggedInUser);

  return (
    <Container>
      <ProfilePicture
        photo={user.photoURL}
        username={user.isAnonymous ? 'Anonymous User' : user.email}
      />
      <ProfileCount />
      <View className={'flex-row justify-center py-4'}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileEdit')}
          className={
            'justify-center items-center h-10 px-3 mx-1 rounded-sm border border-gray-300'
          }>
          <Text className={'font-semibold text-black'}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(logOut())}
          className={
            'justify-center items-center h-10 w-10 rounded-sm border border-gray-300'
          }>
          <IonIcon name={'exit'} color="black" size={20} />
        </TouchableOpacity>
      </View>
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
