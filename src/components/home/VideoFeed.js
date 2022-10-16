import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import {Avatar} from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InViewPort from '@coffeebeanslabs/react-native-inviewport';
import {useSelector} from 'react-redux';

import {loggedInUser} from '../../features/user/userSlice';
import CommentSection from './CommentSection';
import {useFocusEffect} from '@react-navigation/native';

const VideoFeed = ({posts}) => {
  const videoRef = useRef(null);
  const commentRef = useRef(null);

  const user = useSelector(loggedInUser);

  const [post, setPost] = useState(posts);
  const [paused, setPaused] = useState(true);
  const [visible, setVisible] = useState(true);

  const snapPoints = React.useMemo(() => ['1%', '60%'], []);

  useFocusEffect(
    React.useCallback(() => {
      return () => commentRef.current?.close();
    }, []),
  );

  const openBottomSheet = () => commentRef.current.snapToIndex(1);
  const closeBottomSheet = () => commentRef.current.close();

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  return (
    <InViewPort
      style={styles.container}
      onChange={isVisible => {
        setVisible(isVisible);
      }}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={onPlayPausePress}>
        <Video
          key={post.id}
          ref={videoRef}
          source={post.videoURL}
          paused={!paused === visible}
          resizeMode="cover"
          posterResizeMode="cover"
          allowsExternalPlayback={false}
          repeat={true}
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
            // onPress={() => {
            //   const currentLikedStatus = !post.likes_by_users.includes(user.id);
            //   return handleLikes(post.id, currentLikedStatus);
            // }}
            className={'items-center py-1'}>
            <MaterialIcons name="cards-heart" size={36} color={post.likes} />
            <Text className={'font-bold text-white'}>{post?.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={'items-center py-1'}
            onPress={openBottomSheet}>
            <MaterialIcons
              name="comment-processing"
              size={36}
              color={'white'}
            />
            <Text className={'font-bold text-white'}>
              {post?.comments.length}
            </Text>
          </TouchableOpacity>
        </View>
        <Text className={'text-white text-base'}>{`@ ${
          post.user?.username || ''
        }`}</Text>
        <Text className={'text-white text-sm'}>{post.caption || ''}</Text>
      </View>

      <BottomSheet
        ref={commentRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior={'interactive'}
        keyboardBlurBehavior={'restore'}
        enablePanDownToClose={true}>
        <CommentSection id={post.id} status={!paused === visible} />
      </BottomSheet>
    </InViewPort>
  );
};

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
