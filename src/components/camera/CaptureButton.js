import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import {
  CAPTURE_BUTTON_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/camera';
import Reanimated, {
  cancelAnimation,
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
  useSharedValue,
  withRepeat,
} from 'react-native-reanimated';

const PAN_GESTURE_HANDLER_FAIL_X = [-SCREEN_WIDTH, SCREEN_WIDTH];
const PAN_GESTURE_HANDLER_ACTIVE_Y = [-2, 2];

const START_RECORDING_DELAY = 200;
const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

const _CaptureButton = ({
  camera,
  onMediaCaptured,
  minZoom,
  maxZoom,
  cameraZoom,
  flash,
  enabled,
  setIsPressingButton,
  style,
  ...props
}) => {
  const tapHandler = useRef();
  const pressDownDate = useRef();
  const panHandler = useRef();

  const isRecording = useRef(false);
  const recordingProgress = useSharedValue(0);
  const isPressingButton = useSharedValue(false);

  const onStoppedRecording = useCallback(() => {
    isRecording.current = false;
    cancelAnimation(recordingProgress);
    console.log('Stopped recording video!');
  }, [recordingProgress]);

  const stopRecording = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      console.log('Calling stopRecording()...');
      await camera.current.stopRecording();
      console.log('called stopRecording()!');
    } catch (error) {
      console.error('failed to stop recording!', error);
    }
  }, [camera]);

  const startRecording = useCallback(() => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      console.log('calling startRecording()...');
      camera.current.startRecording({
        flash: flash,
        onRecordingError: error => {
          console.error('Recording failed!', error);
          onStoppedRecording();
        },
        onRecordingFinished: video => {
          console.log(`Recording successfully finished! ${video.path}`);
          onMediaCaptured(video, 'video');
          onStoppedRecording();
        },
      });
      // TODO: wait until startRecording returns to actually find out if the recording has successfully started
      console.log('called startRecording()!');
      isRecording.current = true;
    } catch (e) {
      console.error('failed to start recording!', e, 'camera');
    }
  }, [camera, flash, onMediaCaptured, onStoppedRecording]);

  const onHandlerStateChanged = useCallback(
    async ({nativeEvent: event}) => {
      console.debug(`state: ${Object.keys(State)[event.state]}`);
      switch (event.state) {
        case State.BEGAN:
          recordingProgress.value = 0;
          isPressingButton.value = true;
          const now = new Date();
          pressDownDate.current = now;
          setTimeout(() => {
            if (pressDownDate.current == now) {
              startRecording();
            }
          }, START_RECORDING_DELAY);
          setIsPressingButton(true);
          return;
        case State.END:
        case State.FAILED:
        case State.CANCELLED: {
          // exit "recording mode"
          try {
            if (pressDownDate.current == null)
              throw new Error('PressDownDate ref .current was null!');
            const now = new Date();
            const diff = now.getTime() - pressDownDate.current.getTime();
            pressDownDate.current = undefined;
            if (diff < START_RECORDING_DELAY) {
              // user has released the button within 200ms, so his intention is to take a single picture.
              // await takePhoto();
              console.log('image taken');
            } else {
              // user has held the button for more than 200ms, so he has been recording this entire time.
              await stopRecording();
            }
          } finally {
            setTimeout(() => {
              isPressingButton.value = false;
              setIsPressingButton(false);
            }, 500);
          }
          return;
        }
        default:
          break;
      }
    },
    [
      isPressingButton,
      recordingProgress,
      setIsPressingButton,
      startRecording,
      stopRecording,
      // takePhoto,
    ],
  );

  const onPanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startY = event.absoluteY;
      const yForFullZoom = context.startY * 0.7;
      const offsetYForFullZoom = context.startY - yForFullZoom;

      context.offsetY = interpolate(
        cameraZoom.value,
        [minZoom, maxZoom],
        [0, offsetYForFullZoom],
        Extrapolate.CLAMP,
      );
    },
    onActive: (event, context) => {
      const offset = context.offset ?? 0;
      const startY = context.startY ?? SCREEN_HEIGHT;
      const yForFullZoom = startY * 0.7;

      cameraZoom.value = interpolate(
        event.absoluteY - offset,
        [yForFullZoom, startY],
        [maxZoom, minZoom],
        Extrapolate.CLAMP,
      );
    },
  });

  const shadowStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(isPressingButton.value ? 1 : 0, {
            mass: 1,
            damping: 35,
            stiffness: 300,
          }),
        },
      ],
    }),
    [isPressingButton],
  );

  const buttonStyle = useAnimatedStyle(() => {
    let scale;
    if (enabled) {
      if (isPressingButton.value) {
        scale = withRepeat(
          withSpring(1, {
            stiffness: 100,
            damping: 1000,
          }),
          -1,
          true,
        );
      } else {
        scale = withSpring(0.9, {
          stiffness: 500,
          damping: 300,
        });
      }
    } else {
      scale = withSpring(0.6, {
        stiffness: 500,
        damping: 300,
      });
    }

    return {
      opacity: withTiming(enabled ? 1 : 0.3, {
        duration: 100,
        easing: Easing.linear,
      }),
      transform: [
        {
          scale: scale,
        },
      ],
    };
  }, [enabled, isPressingButton]);

  return (
    <TapGestureHandler
      enabled={enabled}
      ref={tapHandler}
      onHandlerStateChange={onHandlerStateChanged}
      shouldCancelWhenOutside={false}
      maxDurationMs={99999999} // <-- this prevents the TapGestureHandler from going to State.FAILED when the user moves his finger outside of the child view (to zoom)
      simultaneousHandlers={panHandler}>
      <Reanimated.View {...props} style={[buttonStyle, style]}>
        <PanGestureHandler
          enabled={enabled}
          ref={panHandler}
          failOffsetX={PAN_GESTURE_HANDLER_FAIL_X}
          activeOffsetY={PAN_GESTURE_HANDLER_ACTIVE_Y}
          onGestureEvent={onPanGestureEvent}
          simultaneousHandlers={tapHandler}>
          <Reanimated.View style={styles.flex}>
            <Reanimated.View style={[styles.shadow, shadowStyle]} />
            <View style={styles.button} />
          </Reanimated.View>
        </PanGestureHandler>
      </Reanimated.View>
    </TapGestureHandler>
  );
};

export const CaptureButton = React.memo(_CaptureButton);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    backgroundColor: '#e34077',
  },
  button: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: 'white',
  },
});
