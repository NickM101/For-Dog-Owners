import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {View, StyleSheet} from 'react-native';

import Container from '../../layouts/Containers/Container';
import {Text} from 'react-native-paper';
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const SCALE_FULL_ZOOM = 3;
const BUTTON_SIZE = 40;
const MAX_ZOOM_FACTOR = 20;
const CAPTURE_BUTTON_SIZE = 78;
const CONTENT_SPACING = 15;

const CameraScreen = () => {
  const camera = useRef(null);
  const isPressingButton = useSharedValue(false);
  const zoom = useSharedValue(0);

  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [cameraPermissions, setCameraPermissions] = useState(false);
  const [audioPermissions, setAudioPermissions] = useState(false);

  const [cameraPosition, setCameraPosition] = useState('back');
  const [flash, setFlash] = useState('off');

  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  const supportsCameraFlipping = useMemo(
    () => devices.back != null && devices.front !== null,
    [devices.back, devices.front],
  );
  const supportsFlash = device?.hasFlash ?? false;

  const setIsPressingButton = useCallback(() => {
    setIsPressingButton.value = _isPressingButton;
  }, [isPressingButton]);

  const onError = useCallback(() => {
    console.error(error);
  }, []);
  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);
  const onMediaCaptured = useCallback((media, path) => {
    console.log(`Media captured! ${JSON.stringify(media)}`);
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

  // Zoom
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
    // Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
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
  // // const [galleryPermissions, setGalleryPermissions] = useState(false);
  // const [galleryItems, setGalleryItems] = useState([]);

  const isFocused = useIsFocused();

  // useEffect(() => {
  //   (async () => {
  //     const cameraStatus = await Camera.getCameraPermissionStatus();
  //     setCameraPermissions(cameraStatus.status == 'authorized');
  //     const audioStatus = await Camera.getMicrophonePermissionStatus();
  //     setAudioPermissions(audioStatus.status == 'authorized');
  //     // const galleryStatus = await Camera.getMicrophonePermissionStatus();

  //   })
  // }, [])

  // if(!cameraPermissions || !audioPermissions){
  //     return (
  //         <Container className={"justify-center, content-center"}>
  //             <Text className={"text-lg, text-red-500 font-extrabold"}>Missing permissions</Text>
  //         </Container>
  //     )
  // }

  if (device == null) return <View />;

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
              video={true}
              audio={true}
              onInitialized={onInitialized}
              enableZoomGesture={false}
              animatedProps={cameraAnimatedProps}
            />
          </TapGestureHandler>
        </Reanimated.View>
      </PinchGestureHandler>
    </Container>
  );
};

export default CameraScreen;
