import React from 'react';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import Container from '@layouts/Container';

const NewFeeds = () => {
  const navigation = useNavigation();

  return (
    <Container className={'justify-center items-center'}>
      <Text>Visit discover and follow your best content creator</Text>
      <Button
        className={'my-2'}
        mode="contained"
        onPress={() => navigation.navigate('Discover')}>
        Open Discover
      </Button>
    </Container>
  );
};

export default NewFeeds;
