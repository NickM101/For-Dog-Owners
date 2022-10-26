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
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import {SAFE_AREA_PADDING} from '../../constants/camera';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {StatusBarBlurBackground} from '../../components/camera/StatusBlurBar';
import {useIsFocused} from '@react-navigation/core';
import {saveMediaStorage} from '../../services/firebase';
import Container from '../../layouts/Container';
import {saveUserPost} from '../../services/posts';
import {useSelector} from 'react-redux';
import {loggedInUser} from '../../features/user/userSlice';

const window = Dimensions.get('window');
const size = 30;

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

  const user = useSelector(loggedInUser);

  const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
  const isScreenFocused = useIsFocused();
  const isVideoPaused = !isScreenFocused;
  const [savingState, setSavingState] = useState('none');
  const [requestRunning, setRequestRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [height, setHeight] = useState(40);

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

  const onHeightUpdate = update => setHeight(update);

  const onMediaLoadEnd = useCallback(() => {
    console.log('media has loaded.');
    setHasMediaLoaded(true);
  }, []);
  const onMediaLoadError = useCallback(error => {
    console.log(`failed to load media: ${JSON.stringify(error)}`);
  }, []);

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving');

      let postSaved = await Promise.all([
        saveMediaStorage(thumbnail, 'post', true),
        saveMediaStorage(`file://${path}`, 'post', false),
      ]);

      const contentToSend = isVisible ? text : '';

      const user = {
        id: user.id,
        imageURL: user.imageURL,
        username: user.username,
      };
      await saveUserPost(postSaved, contentToSend, user)
        .then(() => console.log('Saved to storage'))
        .catch(() => console.error('Error saving'));

      setSavingState('saved');
      navigation.goBack();
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      setSavingState('none');
      Alert.alert(
        'Failed to save!',
        `An unexpected error occurred while trying to save your ${type}. ${message}`,
      );
    }
  }, [path, type, text]);

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

  const handleTextDescription = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={[styles.container, screenStyle]}>
      {type === 'video' && (
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={handleTextDescription}>
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
          {isVisible && (
            <TextInput
              style={[{height: height}, styles.textInput]}
              autoFocus
              multiline
              maxLength={150}
              underlineColorAndroid={'transparent'}
              value={text}
              onChangeText={setText}
              onContentSizeChange={e =>
                onHeightUpdate(e.nativeEvent.contentSize.height)
              }
            />
          )}
        </TouchableOpacity>
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
  textInput: {
    textAlign: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Dimensions.get('window').height / 5,
    backgroundColor: 'rgba(0,0,0,0.75)',
    color: 'white',
    width: window.width,
    paddingVertical: 5,
  },
});

export default MediaPage;

// await CameraRoll.save(`file://${path}`, {
//   type: type,
// }).then(async newURl => {
//   console.log(newURl);
//   setRequestRunning(true);
// });
