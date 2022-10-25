import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {Avatar, Button, List} from 'react-native-paper';

const UserListComponent = ({usersArrayList = []}) => {
  const navigation = useNavigation();

  return usersArrayList.map(item => (
    <View key={item.id}>
      <List.Item
        title={item.pets_name}
        description={item.username}
        left={props => (
          <Avatar.Image
            className={'justify-center self-center'}
            source={{
              uri: item.imageURL
                ? item.imageURL
                : 'http://127.0.0.1:9199/v0/b/tiktok-7e425.appspot.com/o/post%2FOigcPtB2bxzLryHfc8c68uiyeTtd%2F04db3e2d-142c-4a01-9142-ec1237de1556?alt=media&token=dc4c98f8-d363-4e60-addf-d2f960f896f3',
            }}
            size={40}
          />
        )}
        onPress={() =>
          navigation.navigate('users_profile', {type: 'linked', linked: item})
        }
      />
    </View>
  ));
};

export default UserListComponent;
