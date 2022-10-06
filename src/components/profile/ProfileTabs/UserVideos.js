import {FlatList, Image, View} from 'react-native';
import {useAuth} from '../../../context/AuthContext';
import Container from '../../../layouts/Container';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';

export const UserVideos = () => {
  const {user} = useAuth();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      await firestore()
        .collection('post')
        .where('creator', '==', user.uid)
        .orderBy('creation', 'desc')
        .onSnapshot(snapshot => {
          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          return setPosts(posts);
        });
    };

    fetchProfile();
  }, []);

  console.log('data', posts);
  return (
    <Container className="">
      <FlatList
        numColumns={3}
        removeClippedSubviews
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          console.log('item media', item.media[1]);
          return (
            <View style={{flex: 1 / 3, height: 200, backgroundColor: 'gray'}}>
              <Image style={{flex: 1}} source={{uri: item.media[1]}} />
            </View>
          );
        }}
      />
    </Container>
  );
};

{
  /* <Text className={'font-semibold text-black'}>Your private videos</Text>
      <Text className={"text-center"}>
        To make your videos only visible to you, set them to 'Private' in
        settings.
      </Text> */
}
