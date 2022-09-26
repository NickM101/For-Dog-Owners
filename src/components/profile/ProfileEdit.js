import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';


const ProfileEdit = () => {
  return (
    <View className={'flex-row justify-center py-4'}>
      <TouchableOpacity
        className={
          'justify-center items-center h-10 px-3 mx-1 rounded-sm border border-gray-300'
        }>
        <Text className={"font-semibold text-black"}>Edit Profile</Text>
      </TouchableOpacity>
      <View
        className={
          'justify-center items-center h-10 w-8 rounded-sm border border-gray-300'
        }>
        <IonIcon name={'md-bookmark-outline'} color="black" size={20} />
      </View>
      
    </View>
  );
}

export default ProfileEdit;