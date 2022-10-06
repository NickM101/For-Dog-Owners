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

  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [cameraPermissions, setCameraPermissions] = useState(false);
  const [audioPermissions, setAudioPermissions] = useState(false);

  // useEffect(() => {
  //   async () => {
  //     const cameraStatus = await Camera.getCameraPermissionStatus();
  //     setCameraPermissions(cameraStatus.status == 'authorized');
  //     const audioStatus = await Camera.getMicrophonePermissionStatus();
  //     setAudioPermissions(audioStatus.status == 'authorized');
  //   };
  // }, []);

  // if (!cameraPermissions || !audioPermissions) {
  //   return (
  //     <Container className={'justify-center, content-center'}>
  //       <Text className={'text-lg, text-red-500 font-extrabold'}>
  //         Missing permissions
  //       </Text>
  //     </Container>
  //   );
  // }

  const [cameraPosition, setCameraPosition] = useState('back');
  const [flash, setFlash] = useState('on');
  const [enableHdr, setEnableHdr] = useState(false);
  const [enableNightMode, setEnableNightMode] = useState(false);

  const devices = useCameraDevices();
  const device = devices[cameraPosition];
  const formats = useMemo(() => {
    if (device?.formats == null) return [];
    return device.formats.sort(sortFormats);
  }, [device?.formats]);

  const supportsCameraFlipping = useMemo(
    () => devices.back != null && devices.front !== null,
    [devices.back, devices.front],
  );
  const supportsFlash = device?.hasFlash ?? false;

  console.info('supportsFlash', supportsFlash);

  const setIsPressingButton = useCallback(() => {
    setIsPressingButton.value = !isPressingButton;
  }, [isPressingButton]);

  const generateThumbnail = async source => {
    await createThumbnail({
      url: source,
      timeStamp: 3000,
    });
  };

  const onError = useCallback(() => {
    console.error(error);
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

  // FPS
  const [is60Fps, setIs60Fps] = useState(true);
  const fps = useMemo(() => {
    if (!is60Fps) return 30;

    if (enableNightMode && !device?.supportsLowLightBoost) {
      // User has enabled Night Mode, but Night Mode is not natively supported, so we simulate it by lowering the frame rate.
      return 30;
    }

    const supportsHdrAt60Fps = formats.some(
      f =>
        f.supportsVideoHDR &&
        f.frameRateRanges.some(r => frameRateIncluded(r, 60)),
    );
    if (enableHdr && !supportsHdrAt60Fps) {
      // User has enabled HDR, but HDR is not supported at 60 FPS.
      return 30;
    }

    const supports60Fps = formats.some(f =>
      f.frameRateRanges.some(r => frameRateIncluded(r, 60)),
    );
    if (!supports60Fps) {
      // 60 FPS is not supported by any format.
      return 30;
    }
    // If nothing blocks us from using it, we default to 60 FPS.
    return 60;
  }, [
    device?.supportsLowLightBoost,
    enableHdr,
    enableNightMode,
    formats,
    is60Fps,
  ]);

  const supportsHdr = useMemo(
    () => formats.some(f => f.supportsVideoHDR || f.supportsPhotoHDR),
    [formats],
  );
  const supports60Fps = useMemo(
    () =>
      formats.some(f =>
        f.frameRateRanges.some(rate => frameRateIncluded(rate, 60)),
      ),
    [formats],
  );
  const canToggleNightMode = enableNightMode
    ? true // it's enabled so you have to be able to turn it off again
    : (device?.supportsLowLightBoost ?? false) || fps > 30; // either we have native support, or we can lower the FPS

  const format = useMemo(() => {
    let result = formats;
    if (enableHdr) {
      // We only filter by HDR capable formats if HDR is set to true.
      // Otherwise we ignore the `supportsVideoHDR` property and accept formats which support HDR `true` or `false`
      result = result.filter(f => f.supportsVideoHDR || f.supportsPhotoHDR);
    }

    // find the first format that includes the given FPS
    return result.find(f =>
      f.frameRateRanges.some(r => frameRateIncluded(r, fps)),
    );
  }, [formats, fps, enableHdr]);

  // // const [galleryPermissions, setGalleryPermissions] = useState(false);
  // const [galleryItems, setGalleryItems] = useState([]);

  const isFocused = useIsFocused();

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
              format={format[0]}
              fps={fps}
              hdr={enableHdr}
              lowLightBoost={device.supportsLowLightBoost && enableNightMode}
              isActive={isFocused}
              photo={true}
              video={true}
              audio={true}
              orientation="portrait"
              onInitialized={onInitialized}
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
        {supports60Fps && (
          <Pressable style={styles.button} onPress={() => setIs60Fps(!is60Fps)}>
            <Text style={styles.text}>
              {is60Fps ? '60' : '30'}
              {'\n'}FPS
            </Text>
          </Pressable>
        )}
        {supportsHdr && (
          <Pressable
            style={styles.button}
            onPress={() => setEnableHdr(h => !h)}>
            <MaterialIcon
              name={enableHdr ? 'hdr' : 'hdr-off'}
              color="white"
              size={24}
            />
          </Pressable>
        )}
        {canToggleNightMode && (
          <Pressable
            style={styles.button}
            onPress={() => setEnableNightMode(!enableNightMode)}
            disabledOpacity={0.4}>
            <IonIcon
              name={enableNightMode ? 'moon' : 'moon-outline'}
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
