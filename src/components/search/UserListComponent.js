import React from 'react';
import {View, Text} from 'react-native';
import {Button, List} from 'react-native-paper';

const UserListComponent = ({usersArrayList = []}) => {
  return usersArrayList.map(item => (
    <View>
      <List.Item
        title="First Item"
        description="Item description"
        left={props => <List.Icon {...props} icon="folder" />}
        right={props => <Button className={'rounded h-8 mt-3'}>Follow</Button>}
      />
    </View>
  ));
};

export default UserListComponent;
