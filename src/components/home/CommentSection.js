import {View, Text} from 'react-native';
import React from 'react';
import Container from '../../layouts/Container';
import {Avatar} from 'react-native-paper';
import InputText from '../../layouts/TextInput';
import Header from '../../layouts/Header';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const CommentSection = ({navigation, id}) => {
  console.log('id', id);
  return (
    <Container>
      <Header title={'28 comments'} />
      <View className={'flex-1 px-2'}>
        <View className={'flex-row justify-between'}>
          <View className={'flex-row'}>
            <Avatar.Image
              className={'mx-2 my-1'}
              source={require('../../assets/images/logo.png')}
              size={30}
            />
            <View className={'w-80'}>
              <Text className={'text-black font-semibold text-base'}>
                Lewaaz Antony
              </Text>
              <Text className={'flex-wrap'}>
                Cute Plus the nyash OMMMMGG Cute Plus the
              </Text>
            </View>
          </View>
          <Text>2h</Text>
        </View>
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
        />
        <CommunityIcons name="send" size={30} />
      </View>
    </Container>
  );
};

export default CommentSection;
