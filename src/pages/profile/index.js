import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';

import Container from '@layouts/Container';
import ProfilePicture from '@components/profile/ProfilePicture';
import ProfileCount from '@components/profile/ProfileCount';
import ProfileTabs from '@components/profile/ProfileTabs';

import {loggedInUser} from '@features/user/userSlice';
import {logOut, fetchUserDetails} from '@features/user/userActions';
import {UserVideos} from '../../components/profile/ProfileTabs/UserVideos';
import {Divider} from 'react-native-paper';
import {userInfo} from '../../features/user/userSlice';

const ProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {type, linked} = route.params;

  const {user, followers} = useSelector(userInfo);

  console.log('followers aarray', followers);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, []);

  return (
    <Container>
      <ProfilePicture
        photo={linked ? linked.imageURL : user.imageURL}
        username={
          user.isAnonymous
            ? 'username'
            : `@${linked ? linked.username : user.username}`
        }
      />
      <ProfileCount
        following={linked ? linked.following : user.following}
        followers={linked ? linked.followers : user.followers}
        likes={0}
      />
      <View className={'flex-row justify-center py-4'}>
        {!user.isAnonymous && linked == undefined ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileEdit')}
            className={
              'justify-center items-center h-10 px-3 mx-1 rounded-sm border border-gray-300'
            }>
            <Text className={'font-semibold text-black'}>Edit Profile</Text>
          </TouchableOpacity>
        ) : null}
        {type === 'linked' ? (
          <TouchableOpacity
            onPress={() => dispatch(logOut())}
            className={
              'justify-center items-center h-10 w-10 rounded-sm border border-gray-300'
            }>
            {followers.includes(linked.id) ? 'Follow' : 'UnFollow'}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => dispatch(logOut())}
            className={
              'justify-center items-center h-10 w-10 rounded-sm border border-gray-300'
            }>
            <IonIcon name={'exit'} color="black" size={20} />
          </TouchableOpacity>
        )}
      </View>

      <Divider />
      <UserVideos />
    </Container>
  );
};

export default ProfileScreen;

{
  /* <View className={'h-5 justify-center items-center'}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProfileEdit', {
              screen: 'EditField',
              params: {title: 'Biography', value: user?.bio, field: 'bio'},
            })
          }>
          <Text className={'bg-slate-300'}>Tap to add bio</Text>
        </TouchableOpacity>
      </View> */
}
{
  /* <ProfileTabs /> */
}
