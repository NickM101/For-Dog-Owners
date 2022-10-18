import React from 'react';
import {Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Container from '@layouts/Container';

export const FavoriteVideo = () => (
  <Container className="px-6 justify-center items-center">
    <MaterialIcon name={'account-eye'} color={'light-gray'} size={45} />
    <Text className={'font-semibold'}>
      Only you can see which videos you liked
    </Text>
  </Container>
);
