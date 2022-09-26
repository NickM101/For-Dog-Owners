import { View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'

const ProfileHeader = () => {
  return (
    <View>
      <Appbar mode="center-aligned">
        <Appbar.Action icon="account-plus" onPress={() => {}} />
        <Appbar.Content title="Username" />
        <Appbar.Action icon="menu" onPress={() => {}} />
      </Appbar>
    </View>
  );
}

export default ProfileHeader