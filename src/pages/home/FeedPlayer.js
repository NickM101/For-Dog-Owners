import React, {useRef, useState, useCallback} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import InViewPort from '@coffeebeanslabs/react-native-inviewport';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CommentSection from '@components/player/CommentSection';
import {loggedInUser} from '@features/user/userSlice';
import LikeButton from '@components/player/LikeButton';

const FeedPlayer = ({posts, type}) => {
  const videoRef = useRef(null);
  const commentRef = useRef(null);

  const dispatch = useDispatch();
  const user = useSelector(loggedInUser);

  const [paused, setPaused] = useState(true);
  const [visible, setVisible] = useState(false);
  const [sheetIndex, setSheetIndex] = useState(-1);

  const handleSheetChanges = useCallback(index => {
    setSheetIndex(index);
  }, []);

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
          key={posts.id}
          ref={videoRef}
          source={{uri: posts?.mediaURL[1]}}
          poster={posts?.mediaURL[0]}
          paused={!paused === visible}
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
          </View>
          <LikeButton post={posts} user={user.id} type={'posts'} />
          <TouchableOpacity
            className={'items-center py-1'}
            onPress={openBottomSheet}>
            <MaterialIcons
              name="comment-processing"
              size={36}
              color={'white'}
            />
            <Text className={'font-bold text-white'}>
              {posts?.comments.length}
            </Text>
          </TouchableOpacity>
        </View>
        <Text className={'text-white text-base'}>{`@ ${
          posts.user?.username || ''
        }`}</Text>
        <Text className={'text-white text-sm'}>{posts.caption || ''}</Text>
      </View>

      <BottomSheet
        ref={commentRef}
        index={-1}
        snapPoints={snapPoints}
        keyboardBehavior={'interactive'}
        keyboardBlurBehavior={'restore'}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}>
        <CommentSection
          id={posts.id}
          status={!paused === visible}
          sheetIndex={sheetIndex}
          type={'posts'}
        />
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

export default FeedPlayer;
