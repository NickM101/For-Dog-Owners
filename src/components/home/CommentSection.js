import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../layouts/Container';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import InputText from '../../layouts/TextInput';
import Header from '../../layouts/Header';
import {BottomSheetFlatList, BottomSheetTextInput} from '@gorhom/bottom-sheet';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useToast} from 'react-native-toast-notifications';
import {postComment} from '../../services/comments';
import {useSelector} from 'react-redux';
import {loggedInUser} from '../../features/user/userSlice';
import database from '@react-native-firebase/database';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const CommentSection = ({navigation, id, sheetIndex}) => {
  const toast = useToast();
  const user = useSelector(loggedInUser);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(() => {
    if (sheetIndex === 1) {
      setLoading(true);
      const onCommentChange = database()
        .ref(`feeds/${id}/comments`)
        .on('value', snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            let result = [];
            for (let key in snapshot.val()) {
              let output = data[key];
              result.push({id: key, ...output});
            }
            setLoading(false);
            setComments(result);
          }
        });

      return () =>
        database().ref(`feeds/${id}/comments`).off('value', onCommentChange);
    }
  }, [sheetIndex]);

  const handleSubmit = () => {
    if (!comment.length) {
      toast.show("Can't send an empty comment.");
    } else {
      console.log('sent');
      const data = {
        postID: id,
        user: {
          username: user.displayName ? user.displayName : user.email,
          imageURL: user.photoURL,
          id: user.id,
        },
        comment,
      };
      return postComment(data).then(() => setComment(''));
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <View className={'flex-row justify-between my-2'}>
        <View className={'flex-row'}>
          <Avatar.Image
            className={'mx-2 my-1'}
            source={require('../../assets/images/logo.png')}
            size={30}
          />
          <View className={'w-80'}>
            <Text className={'text-black font-semibold text-base'}>
              {item?.creator?.username}
            </Text>
            <Text className={'flex-wrap'}>{item.comment}</Text>
          </View>
        </View>
        <Text>2h</Text>
      </View>
    );
  };

  if (loading) {
    <Container className={'justify-center items-center'}>
      <ActivityIndicator animating={true} color={'orange'} size={'large'} />
      <Text>Fetching Comments ....</Text>
    </Container>;
  }
  return (
    <Container>
      <Header title={`${comments.length} Comments`} leftIcon={null} />
      <View className={'flex-1 px-2'}>
        <BottomSheetFlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={_renderItem}
        />
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
