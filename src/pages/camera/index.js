import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {
  PinchGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {createThumbnail} from 'react-native-create-thumbnail';
import {
  Camera,
  frameRateIncluded,
  sortFormats,
  useCameraDevices,
} from 'react-native-vision-camera';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Container from '../../layouts/Container';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {
  CONTENT_SPACING,
  MAX_ZOOM_FACTOR,
  SAFE_AREA_PADDING,
} from '../../constants/camera';
import {CaptureButton} from '../../components/camera/CaptureButton';
import {StatusBarBlurBackground} from '../../components/camera/StatusBlurBar';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const SCALE_FULL_ZOOM = 3;
const BUTTON_SIZE = 40;

const CameraScreen = ({navigation}) => {
  const camera = useRef(null);
  const isPressingButton = useSharedValue(false);
  const zoom = useSharedValue(0);
  const devices = useCameraDevices();

  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [flash, setFlash] = useState('off');

  const device = devices[cameraPosition];
  const supportsFlash = device?.hasFlash ?? false;

  // Camera Flipping
  const supportsCameraFlipping = useMemo(
    () => devices.back != null && devices.front !== null,
    [devices.back, devices.front],
  );

  const setIsPressingButton = useCallback(() => {
    setIsPressingButton.value = !isPressingButton;
  }, [isPressingButton]);

  // --------------------EVENTS-------------------- //
  const onError = useCallback(error => {
    console.error('OnError', error);
  }, []);

  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);

  const onMediaCaptured = useCallback(async (media, type) => {
    console.log(`Media captured! ${JSON.stringify(media)}`);
    await createThumbnail({
      url: `file:///${media.path}`,
      timeStamp: 1000,
      format: 'png',
    }).then(response => {
      const thumbnail = response.path;
      if (thumbnail) {
        navigation.navigate('Media', {
          path: media.path,
          type: type,
          thumbnail,
        });
      } else {
        console.error('thumbnail failed');
      }
    });
  }, []);

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);
  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);

  const onDoubleTap = useCallback(() => {
    onFlipCameraPressed();
  }, [onFlipCameraPressed]);

  // ------------  Zoom ---------------- //
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

  const cameraAnimatedProps = useAnimatedProps(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);

    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);

  const neutralZoom = device?.neutralZoom ?? 1;

  useEffect(() => {
    zoom.value = neutralZoom;
  }, [neutralZoom, zoom]);

  const onPinchGesture = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      // we're trying to map the scale gesture to a linear zoom here
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolate.CLAMP,
      );
      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolate.CLAMP,
      );
    },
  });

  // ---------------------------------------- //

  const isFocused = useIsFocused();

  if (device == null)
    return (
      <View className={'flex-1 justify-center items-center'}>
        <Text>Camera not supported.</Text>
      </View>
    );

  return (
    <Container>
      <PinchGestureHandler onGestureEvent={onPinchGesture}>
        <Reanimated.View style={StyleSheet.absoluteFill}>
          <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
            <ReanimatedCamera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isFocused}
              photo={false}
              video={true}
              audio={true}
              orientation="portrait"
              onInitialized={onInitialized}
              onError={onError}
              enableZoomGesture={false}
              animatedProps={cameraAnimatedProps}
            />
          </TapGestureHandler>
        </Reanimated.View>
      </PinchGestureHandler>
      <CaptureButton
        style={styles.captureButton}
        camera={camera}
        onMediaCaptured={onMediaCaptured}
        cameraZoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        flash={supportsFlash ? flash : 'off'}
        enabled={isCameraInitialized}
        setIsPressingButton={setIsPressingButton}
      />

      <StatusBarBlurBackground />

      <View style={styles.rightButtonRow}>
        {supportsCameraFlipping && (
          <Pressable
            style={styles.button}
            onPress={onFlipCameraPressed}
            disabledOpacity={0.4}>
            <MaterialIcon name="camera-flip" color="white" size={24} />
          </Pressable>
        )}
        {supportsFlash && (
          <Pressable
            style={styles.button}
            onPress={onFlashPressed}
            disabledOpacity={0.4}>
            <MaterialIcon
              name={flash === 'on' ? 'flash' : 'flash-off'}
              color="white"
              size={24}
            />
          </Pressable>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default CameraScreen;
