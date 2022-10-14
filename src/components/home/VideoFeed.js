import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
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
import {handleLikes} from '../../services/posts';
import {useAuth} from '../../context/AuthContext';

const VideoFeed = forwardRef((props, parentRef) => {
  const videoRef = useRef(null);

  const {user} = useAuth();

  useImperativeHandle(parentRef, () => ({
    playFeed,
    stopFeed,
  }));

  const [post, setPost] = useState(props.posts);

  const [paused, setPaused] = useState(true);

  const playFeed = () => setPaused(false);

  const stopFeed = () => setPaused(true);

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={onPlayPausePress}>
        <Video
          key={post.id}
          ref={videoRef}
          source={{uri: post.mediaURL[1]}}
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
          // poster={{uri: post.mediaURL[1]}}
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
                source={require('../../assets/images/petbox.png')}
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
            onPress={() => {
              const currentLikedStatus = !post.likes_by_users.includes(user.id);
              return handleLikes(post.id, currentLikedStatus);
            }}
            className={'items-center py-1'}>
            <MaterialIcons
              name="cards-heart"
              size={36}
              color={post.likes_by_users.includes(user.id) ? 'red' : 'white'}
            />
            <Text className={'font-bold text-white'}>
              {post?.likes_by_users.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className={'items-center py-1'}>
            <MaterialIcons
              name="comment-processing"
              size={36}
              color={'white'}
            />
            <Text className={'font-bold text-white'}>
              {post?.commentsCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className={'items-center py-1'}>
            <MaterialIcons name="share" size={36} color={'white'} />
            <Text className={'font-bold text-white'}>1</Text>
          </TouchableOpacity>
        </View>
        <Text className={'text-white text-base'}>{`@ ${
          post.user?.username || ''
        }`}</Text>
        <Text className={'text-white text-sm'}>{post.caption || ''}</Text>
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
