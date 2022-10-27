import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';

import {BottomSheetFlatList, BottomSheetTextInput} from '@gorhom/bottom-sheet';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Container from '@layouts/Container';
import Header from '@layouts/Header';

import {postComment} from '@services/comments';
import {loggedInUser} from '@features/user/userSlice';
import {addDiscoverComment} from '@features/discover/discoverSlice';
import {addPostComment} from '../../features/posts/postSlice';
import {formatDistance, formatDistanceToNow} from 'date-fns';

const CommentSection = ({userId, id, sheetIndex, type}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector(loggedInUser);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sheetIndex === 1) {
      setLoading(true);
      const subscribe = firestore()
        .collection(`posts/${userId}/personal/${id}/comments`)
        .orderBy('creation', 'asc')
        .limitToLast(10)
        .onSnapshot(snapshot => {
          const results = [];

          if (!snapshot.empty) {
            snapshot.forEach(doc => {
              const id = doc.id;

              results.push({id, ...doc.data()});
            });
          }

          console.log('results', results);
          setLoading(false);
          setComments(results);
        });

      return () => subscribe();
    }
  }, [sheetIndex]);

  const handleSubmit = () => {
    if (!comment.length) {
      toast.show("Can't send an empty comment.");
    } else {
      const data = {
        postID: id,
        userId,
        user: {
          username: user.displayName ? user.displayName : user.email,
          imageURL: user.photoURL,
          id: user.id,
        },
        comment,
      };
      console.log('sent', type);

      postComment(data).then(() => setComment(''));
      type === 'posts'
        ? dispatch(addPostComment({postId: id}))
        : dispatch(addDiscoverComment({postId: id}));
    }
  };

  const _renderItem = ({item, index}) => {
    const time = item.creation
      ? formatDistanceToNow(item?.creation?.toDate(), {
          includeSeconds: true,
        })
      : '--';
    return (
      <View className={'flex-row justify-between my-2'}>
        <View className={'flex-row'}>
          <Avatar.Image
            className={'mx-2 my-1 self-center'}
            source={require('../../assets/images/logo.png')}
            size={30}
          />
          <View className={'w-30'}>
            <Text className={'text-black font-semibold text-base'}>
              {item?.creator}
            </Text>
            <Text className={'flex-wrap'}>{item.comment}</Text>
          </View>
        </View>
        <Text>{time}</Text>
      </View>
    );
  };

  return (
    <Container>
      <Header title={`${comments.length} Comments`} rightIcon={null} />
      <View className={'flex-1 px-2'}>
        {loading ? (
          <Container className={'justify-center items-center'}>
            <ActivityIndicator
              animating={true}
              color={'orange'}
              size={'small'}
            />
            <Text className={'text-base font-semibold my-2'}>
              Loading comments ....
            </Text>
          </Container>
        ) : (
          <BottomSheetFlatList
            data={comments}
            keyExtractor={item => item.id}
            renderItem={_renderItem}
          />
        )}
      </View>
      <View className={'flex-row justify-around items-center'}>
        <BottomSheetTextInput
          style={{
            width: '85%',
            padding: 8,
            borderRadius: 5,
            borderWidth: 1.5,
            borderColor: '#FF5A00',
          }}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <CommunityIcons name="send" size={30} />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default CommentSection;

//  useEffect(() => {
//    if (sheetIndex === 1) {
//      setLoading(true);
//      async function onCommentChange() {
//        console.log('inside function', id);
//        await database()
//          .ref(`feeds/${id}/comments`)
//          .on('value', snapshot => {
//            console.log(snapshot);
//            if (snapshot.exists()) {
//              const data = snapshot.val();
//              let result = [];
//              for (let key in snapshot.val()) {
//                let output = data[key];
//                result.push({id: key, ...output});
//              }
//              setLoading(false);
//              setComments(result);
//            }
//          });
//      }
//      return () =>
//        database().ref(`feeds/${id}/comments`).off('value', onCommentChange);
//    }
//  }, [sheetIndex]);
