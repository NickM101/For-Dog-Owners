import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDiscover} from '../features/discover/discoverAPI';
import {fetchPosts} from '../features/posts/postAPI';
import {loggedInUser} from '../features/user/userSlice';

export function WithSplashScreen({children}) {
  const [isReady, setIsReady] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector(loggedInUser);

  // useEffect(() => {
  //   async function fetchData() {
  //     console.log('-------------- Fetching Data on Splashscreen -----------');
  //     await Promise.all([dispatch(fetchDiscover()), dispatch(fetchPosts())])
  //       .then(() => {
  //         console.log('console.logged ----- Fulfilled');
  //         setIsReady(true);
  //       })
  //       .catch(error => {
  //         console.log('console.logged ----- rejected', error);
  //         setIsReady(true);
  //       })
  //       .finally(() => {
  //         console.log('console.logged ----- Finally');
  //         setIsReady(true);
  //       });
  //   }
  //   user ? fetchData() : setIsReady(true);
  // }, []);

  return (
    <>
      {isReady && children}

      <Splash isAppReady={isReady} />
    </>
  );
}

const LOADING_IMAGE = 'Loading image';
const FADE_IN_IMAGE = 'Fade in image';
const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

export const Splash = ({isAppReady}) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState(LOADING_IMAGE);

  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) return null;

  return (
    <Animated.View
      collapsable={false}
      style={[style.container, {opacity: containerOpacity}]}>
      <Animated.Image
        source={require('../assets/images/logo.png')}
        fadeDuration={0}
        onLoad={() => {
          setState(FADE_IN_IMAGE);
        }}
        style={[style.image, {opacity: imageOpacity}]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
