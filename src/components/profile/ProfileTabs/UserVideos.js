import {FlatList, Image, View, Text} from 'react-native';
import Container from '../../../layouts/Container';
import React, {useEffect, useState} from 'react';
import {FBGetUserPosts} from '../../../services/posts';

export const UserVideos = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    FBGetUserPosts().then(response => {
      console.log('response', response);
      return setPosts(response);
    });
  }, []);

  return (
    <Container className="">
      <FlatList
        numColumns={3}
        removeClippedSubviews
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={{flex: 1 / 3, height: 200, backgroundColor: 'gray'}}>
              <Image style={{flex: 1}} source={{uri: item.media[1]}} />
            </View>
          );
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <Container className="px-6 justify-center items-center">
            <Text className={'font-semibold text-black'}>
              Your private videos
            </Text>
            <Text className={'text-center'}>
              To make your videos only visible to you, set them to 'Private' in
              settings.
            </Text>
          </Container>
        }
      />
    </Container>
  );
};
