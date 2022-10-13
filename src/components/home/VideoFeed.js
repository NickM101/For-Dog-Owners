import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import Video from 'react-native-video';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {Avatar} from 'react-native-paper';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const VideoFeed = forwardRef((props, parentRef) => {
  const videoRef = useRef(null);

  useImperativeHandle(parentRef, () => ({
    playFeed,
    stopFeed,
  }));

  const [post, setPost] = useState(props.posts);
  const [isLiked, setIsLiked] = useState(false);

  const [paused, setPaused] = useState(true);

  const playFeed = () => setPaused(false);

  const stopFeed = () => setPaused(true);

  const onLikePress = () => {
    // TODO: likes Reducer
    const likeAdded = isLiked ? -1 : 1;
    setPost({
      ...post,
      likes: post.likes + likeAdded,
    });
    setIsLiked(!isLiked);
  };

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={onPlayPausePress}>
        <Video
          key={post.id}
          ref={videoRef}
          source={require('../../assets/TestVideo.mp4')}
          paused={paused}
          resizeMode="cover"
          posterResizeMode="cover"
          allowsExternalPlayback={false}
          // repeat={true}
          controls={false}
          ignoreSilentSwitch={'obey'}
          playInBackground={false}
          style={styles.video}
          onError={err => console.log(err)}
          // Poster, posterResizeMode
        />
      </TouchableWithoutFeedback>
      <View style={styles.description}>
        <View className={'self-end '}>
          <View className="items-center py-4">
            <TouchableOpacity>
              <Avatar.Image
                className={'bg-slate-700 border border-white '}
                size={36}
                source={post.user.imageURL}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className={
                'justify-center border border-orange-400 items-center bg-slate-700 h-4 w-4 rounded-full absolute inset-y-11 inset-x-3'
              }>
              <MaterialIcons
                name={'plus'}
                size={12}
                className={'font-bold'}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={onLikePress}
            className={'items-center py-1'}>
            <MaterialIcons
              name="cards-heart"
              size={36}
              color={isLiked ? 'red' : 'white'}
            />
            <Text className={'font-bold text-white'}>{post?.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity className={'items-center py-1'}>
            <MaterialIcons
              name="comment-processing"
              size={36}
              color={'white'}
            />
            <Text className={'font-bold text-white'}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity className={'items-center py-1'}>
            <MaterialIcons name="share" size={36} color={'white'} />
            <Text className={'font-bold text-white'}>1</Text>
          </TouchableOpacity>
        </View>
        <Text className={'text-white text-base'}>Nick Munene</Text>
        <Text className={'text-white text-sm'}>
          this is just a description of something
        </Text>
      </View>
    </View>
  );
});

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
  description: {
    height: '100%',
    justifyContent: 'flex-end',
  },
});

export default VideoFeed;
