import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../../components/Container/Container';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfilePicture from '../../components/profile/ProfilePicture';
import ProfileCount from '../../components/profile/ProfileCount';
import ProfileEdit from '../../components/profile/ProfileEdit';
import ProfileTabs from '../../components/profile/ProfileTabs';

const ProfileScreen = () => {
  return (
    <Container>
      <ProfileHeader />
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
