import React from 'react';
import {Avatar} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import Container from '@layouts/Container';
import ProfileHeader from '@layouts/Header';
import UserDetail from '@components/profile/UserDetail';

import {loggedInUser} from '@features/user/userSlice';
import {uploadProfilePhoto} from '@features/user/userActions';
import {fetchUserDetails} from '../../../features/user/userActions';

const EditProfile = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const user = useSelector(loggedInUser);

  const fetchPhotos = async () => {
    await launchImageLibrary({mediaType: 'photo'})
      .then(async res => {
        if (res.didCancel) {
          toast.show('User cancelled image picker');
        } else if (res.error) {
          toast.show('Error picking Image');
          console.log('ImagePicker Error: ', res.error);
        } else {
          let source = res.assets[0].uri;

          Promise.all([
            dispatch(uploadProfilePhoto(source)),
            dispatch(fetchUserDetails()),
          ]);
        }
      })
      .catch(error => console.error('Error', error));
  };

  return (
    <Container>
      <ProfileHeader />
      <TouchableOpacity onPress={fetchPhotos}>
        <Avatar.Image
          style={{alignSelf: 'center', margin: 20}}
          size={120}
          source={{
            uri: user.imageURL,
          }}
        />
        <View
          className={
            ' bg-slate-600 rounded-2xl bg-slate-0 h-8 w-8 justify-center items-center absolute top-28 right-36'
          }>
          <MaterialIcon name="plus" size={24} color={'orange'} />
        </View>
      </TouchableOpacity>
      <UserDetail title={'Username'} value={user.username} field={'username'} />
      <UserDetail
        title={"Pet's Name"}
        value={user?.pets_name}
        field={'pets_name'}
      />
      <UserDetail
        title={"Pet's Age"}
        value={user?.pets_age}
        field={'pets_age'}
        type={'number-pad'}
      />
      <UserDetail
        title={'Email Address'}
        value={user.email}
        field={'email'}
        disabled={true}
        type={'email-address'}
      />
      <UserDetail
        title={'Phone Number'}
        value={user.phoneNumber}
        field={'phoneNumber'}
        type={'phone-pad'}
      />
    </Container>
  );
};

export default EditProfile;
