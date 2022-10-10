import React, {useCallback, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import Video, {LoadError, OnLoadData} from 'react-native-video';
import {SAFE_AREA_PADDING} from '../../constants/camera';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {StatusBarBlurBackground} from '../../components/camera/StatusBlurBar';
import {useIsFocused} from '@react-navigation/core';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {useAuth} from '../../context/AuthContext';
import Container from '../../layouts/Container';

const requestSavePermission = async () => {
  if (Platform.OS !== 'android') return true;

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  if (permission == null) return false;
  let hasPermission = await PermissionsAndroid.check(permission);
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(
      permission,
    );
    hasPermission = permissionRequestResult === 'granted';
  }
  return hasPermission;
};

const isVideoOnLoadEvent = event => 'duration' && 'naturalSize';

const MediaPage = ({navigation, route}) => {
  const {path, type, thumbnail} = route.params;
  console.log('Thumbnail check it', thumbnail);
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
  // const isForeground = useIsForeground();
  const isScreenFocused = useIsFocused();
  const isVideoPaused = !isScreenFocused;
  const [savingState, setSavingState] = useState('none');
  const [requestRunning, setRequestRunning] = useState(false);

  const {user} = useAuth();

  const dispatch = useDispatch();

  const onMediaLoad = useCallback(event => {
    if (isVideoOnLoadEvent(event)) {
      console.log(
        `Video loaded. Size: ${event?.naturalSize?.width}x${event?.naturalSize?.height} (${event?.naturalSize?.orientation}, ${event?.duration} seconds)`,
      );
    } else {
      console.log(
        `Image loaded. Size: ${event?.nativeEvent?.source?.width}x${event?.nativeEvent?.source?.height}`,
      );
    }
  }, []);

  const onMediaLoadEnd = useCallback(() => {
    console.log('media has loaded.');
    setHasMediaLoaded(true);
  }, []);
  const onMediaLoadError = useCallback(error => {
    console.log(`failed to load media: ${JSON.stringify(error)}`);
  }, []);

  // const generateThumbnail = async source => {
  //   try {
  //     const {uri} = createThumbnail({
  //       url: source,
  //       timeStamp: 1000,
  //     });

  //     return uri;
  //   } catch (error) {
  //     console.error('error generate thumbnail', error);
  //   }
  // };

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving');
      const hasPermission = await requestSavePermission();
      // if (!hasPermission) {
      //   Alert.alert(
      //     'Permission denied!',
      //     'Vision Camera does not have permission to save the media to your camera roll.',
      //   );
      //   return;
      // }
      await CameraRoll.save(`file://${path}`, {
        type: type,
      }).then(async newURl => {
        setRequestRunning(true);
        // dispatch(createPost(newURl, user.uid, thumbnail))
        //   .then(() => {
        //     setRequestRunning(false);
        //     // navigation.dispatch(StackActions.popToTop());
        //     navigation.goBack();
        //   })
        //   .catch(error => {
        //     setRequestRunning(false);
        //     console.error('Error Saving', error);
        //   });
      });
      // setSavingState('saved');
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      setSavingState('none');
      Alert.alert(
        'Failed to save!',
        `An unexpected error occurred while trying to save your ${type}. ${message}`,
      );
    }
  }, [path, type]);

  const source = useMemo(() => ({uri: `file://${path}`}), [path]);

  const screenStyle = useMemo(
    () => ({opacity: hasMediaLoaded ? 1 : 0}),
    [hasMediaLoaded],
  );

  if (requestRunning) {
    return (
      <Container className={'content-center justify-center'}>
        <ActivityIndicator color={'red'} size={'large'} />
      </Container>
    );
  }

  return (
    <View style={[styles.container, screenStyle]}>
      {type === 'photo' && (
        <Image
          source={source}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoadEnd={onMediaLoadEnd}
          onLoad={onMediaLoad}
        />
      )}
      {type === 'video' && (
        <Video
          source={source}
          style={StyleSheet.absoluteFill}
          paused={isVideoPaused}
          resizeMode="cover"
          posterResizeMode="cover"
          allowsExternalPlayback={false}
          automaticallyWaitsToMinimizeStalling={false}
          disableFocus={true}
          repeat={true}
          useTextureView={false}
          controls={false}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onReadyForDisplay={onMediaLoadEnd}
          onLoad={onMediaLoad}
          onError={onMediaLoadError}
        />
      )}

      <Pressable style={styles.closeButton} onPress={navigation.goBack}>
        <IonIcon name="close" size={35} color="white" style={styles.icon} />
      </Pressable>

      <Pressable
        style={styles.saveButton}
        onPress={onSavePressed}
        disabled={savingState !== 'none'}>
        {savingState === 'none' && (
          <IonIcon
            name="download"
            size={35}
            color="white"
            style={styles.icon}
          />
        )}
        {savingState === 'saved' && (
          <IonIcon
            name="checkmark"
            size={35}
            color="white"
            style={styles.icon}
          />
        )}
        {savingState === 'saving' && <ActivityIndicator color="white" />}
      </Pressable>

      <StatusBarBlurBackground />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: SAFE_AREA_PADDING.paddingTop,
    left: SAFE_AREA_PADDING.paddingLeft,
    width: 40,
    height: 40,
  },
  saveButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    left: SAFE_AREA_PADDING.paddingLeft,
    width: 40,
    height: 40,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
});

export default MediaPage;
