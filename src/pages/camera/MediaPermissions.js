import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {logOut} from '../../features/user/userActions';
import Container from '../../layouts/Container';
import {Button} from 'react-native-paper';

const BANNER_IMAGE = require('../../assets/images/logo.png');

const MediaPermissions = ({
  cameraPermission,
  requestCameraPermission,
  audioPermission,
  requestAudioPermission,
  galleryPermission,
  requestGalleryPermission,
}) => {
  const dispatch = useDispatch();

  if (auth().currentUser.isAnonymous) {
    return (
      <Container className={'justify-center items-center'}>
        <Button
          mode="contained"
          contentStyle={{flex: 1}}
          className={'rounded h-24'}
          onPress={() => dispatch(logOut())}>
          Login to PetBox
        </Button>
      </Container>
    );
  }

  return (
    <Container className={'justify-center items-center'}>
      <Text className={'text-3xl text-black font-extrabold underline'}>
        Grant Permissions
      </Text>
      <Text className={'text-center my-2'}>
        In order to proceed recording videos for your feed, grant the following
        permissions
      </Text>
      {!cameraPermission && (
        <TouchableOpacity
          className={
            'flex-row p-2 my-3 rounded border border-orange-400 h-20 w-full items-center justify-around'
          }
          onPress={requestCameraPermission}>
          <View className={'w-8/12'}>
            <Text className={'text-lg text-black font-semibold'}>
              Camera Permission
            </Text>
            <Text>Grant PetBox permission in order to record videos</Text>
          </View>
          <Text className={'font-bold text-base text-orange-400'}>Grant</Text>
        </TouchableOpacity>
      )}
      {!audioPermission && (
        <TouchableOpacity
          className={
            'flex-row p-2 my-3 rounded border border-orange-400 h-20 w-full items-center justify-around'
          }
          onPress={requestAudioPermission}>
          <View className={'w-8/12'}>
            <Text className={'text-lg text-black font-semibold'}>
              Audio Permission
            </Text>
            <Text>
              Grant PetBox permission in order record videos with audio.
            </Text>
          </View>
          <Text className={'font-bold text-base text-orange-400'}>Grant</Text>
        </TouchableOpacity>
      )}
      {!galleryPermission && (
        <TouchableOpacity
          className={
            'flex-row p-2 my-3 rounded border border-orange-400 h-20 w-full items-center justify-around'
          }
          onPress={requestGalleryPermission}>
          <View className={'w-8/12'}>
            <Text className={'text-lg text-black font-semibold'}>
              Gallery Permission
            </Text>
            <Text>
              Grant PetBox permission in order to save/view recorded videos.
            </Text>
          </View>
          <Text className={'font-bold text-base text-orange-400'}>Grant</Text>
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default MediaPermissions;
