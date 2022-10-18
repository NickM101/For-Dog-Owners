import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';

import Container from '@layouts/Container';
import ProfilePicture from '@components/profile/ProfilePicture';
import ProfileCount from '@components/profile/ProfileCount';
import ProfileTabs from '@components/profile/ProfileTabs';

import {loggedInUser} from '@features/user/userSlice';
import {logOut} from '@features/user/userActions';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const user = useSelector(loggedInUser);

  return (
    <Container>
      <ProfilePicture
        photo={user.imageURL}
        username={user.isAnonymous ? 'username' : `@${user.username}`}
      />
      <ProfileCount
        following={user.following}
        followers={user.followers}
        likes={0}
      />
      <View className={'flex-row justify-center py-4'}>
        {!user.isAnonymous && (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileEdit')}
            className={
              'justify-center items-center h-10 px-3 mx-1 rounded-sm border border-gray-300'
            }>
            <Text className={'font-semibold text-black'}>Edit Profile</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => dispatch(logOut())}
          className={
            'justify-center items-center h-10 w-10 rounded-sm border border-gray-300'
          }>
          <IonIcon name={'exit'} color="black" size={20} />
        </TouchableOpacity>
      </View>
      <View className={'h-5 justify-center items-center'}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProfileEdit', {
              screen: 'EditField',
              params: {title: 'Biography', value: user?.bio, field: 'bio'},
            })
          }>
          <Text className={'bg-slate-300'}>Tap to add bio</Text>
        </TouchableOpacity>
      </View>
      <ProfileTabs />
    </Container>
  );
};

export default ProfileScreen;
