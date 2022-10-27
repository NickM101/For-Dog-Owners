import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Video from 'react-native-video';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const VideoPlayer = ({navigation, route}) => {
  const {post} = route.params;

  const [paused, setPaused] = useState(false);

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={onPlayPausePress}>
      <Video
        key={post.id}
        source={{uri: post?.mediaURL[1]}}
        poster={post?.mediaURL[0]}
        paused={paused}
        resizeMode="cover"
        posterResizeMode="cover"
        allowsExternalPlayback={false}
        repeat={true}
        controls={false}
        ignoreSilentSwitch={'obey'}
        style={styles.video}
        onError={err => console.log(err)}
        useTextureView={false}
        playInBackground={true}
        disableFocus={true}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 1500,
          bufferForPlaybackAfterRebufferMs: 1500,
        }}
        onReadyForDisplay={index =>
          console.log('-----im ready for display----', index)
        }
      />
    </TouchableWithoutFeedback>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height - 70,
    padding: 15,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
