import React from 'react';
import Container from '../../../layouts/Container';
import {Avatar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import ProfileHeader from '../../../layouts/Header';
import UserDetail from '../../../components/profile/UserDetail';
import {TouchableOpacity, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useToast} from 'react-native-toast-notifications';
import { saveProfileImage } from '../../../services/user';
import { useAuth } from '../../../context/AuthContext';
import { saveMediaStorage } from '../../../services/firebase';
import { firebaseErrors } from '../../../services/fb_errors';

const EditProfile = ({navigation}) => {
  const {user, updateProfile} = useAuth();
  const toast = useToast();

  const fetchPhotos = async () => {
    await launchImageLibrary({mediaType: 'photo'})
      .then(res => {
        if (res.didCancel) {
          toast.show('User cancelled image picker');
        } else if (res.error) {
          toast.show('Error picking Image')
          console.log('ImagePicker Error: ', res.error);
        } else {
          let source = res.assets[0].uri;

          saveMediaStorage(source, `profileImage/${auth().currentUser.uid}`).then(uri => {
            if(uri){
              updateProfile('photoURL', uri)
            }
          }).catch(error => firebaseErrors(error.code))
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
            uri: user.photoURL,
          }}
        />
        <View
          className={
            ' bg-slate-600 rounded-2xl bg-slate-0 h-8 w-8 justify-center items-center absolute top-28 right-36'
          }>
          <MaterialIcon name="plus" size={24} color={'orange'} />
        </View>
      </TouchableOpacity>
      <UserDetail
        title={'Display Name'}
        value={user.displayName}
        field={'displayName'}
      />
      <UserDetail
        title={"Pet's Name"}
        value={user?.petsName}
        field={'petsName'}
      />
      <UserDetail title={"Pet's Age"} value={user?.petsAge} field={'petsAge'} />
      <UserDetail
        title={'Email Address'}
        value={user.email}
        field={'email'}
        disabled={true}
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
