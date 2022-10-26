import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {Divider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Container from '@layouts/Container';
import ProfilePicture from '@components/profile/ProfilePicture';
import ProfileCount from '@components/profile/ProfileCount';

import {logOut, fetchUserDetails} from '@features/user/userActions';
import {UserVideos} from '../../components/profile/ProfileTabs/UserVideos';

const SearchProfile = ({route}) => {
  const dispatch = useDispatch();
  const {user} = route.params;

  const [isFollower, setFollower] = useState(false);

  useEffect(() => {
    dispatch(fetchUserDetails({userId: user.id}));
  }, []);

  const unfollowUser = async () => {
    if (isFollower) {
      await firestore()
        .collection('following')
        .doc(auth().currentUser.uid)
        .collection('following_users')
        .doc(user.id)
        .delete()
        .then(() => setFollower(false));
    } else {
      await firestore()
        .collection('following')
        .doc(auth().currentUser.uid)
        .collection('following_users')
        .doc(user.id)
        .set({
          id: user.id,
          creation: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => setFollower(true));
    }
  };

  return (
    <Container>
      <ProfilePicture
        photo={user.imageURL ? user.imageURL : user.imageURL}
        username={user.username}
      />
      <ProfileCount
        following={user.following}
        followers={user.followers}
        likes={0}
      />
      <View className={'flex-row justify-center py-4'}>
        {!auth().currentUser.isAnonymous && (
          <TouchableOpacity
            onPress={unfollowUser}
            style={{backgroundColor: '#FF5A00'}}
            className={
              'justify-center items-center h-10 w-20 rounded-sm border border-gray-300'
            }>
            <Text className={'font-semibold text-white'}>
              {isFollower ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Divider />
      <UserVideos user={user.id} />
    </Container>
  );
};

export default SearchProfile;
