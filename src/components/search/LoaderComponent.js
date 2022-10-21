import React from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator, Button, List} from 'react-native-paper';
import Container from '../../layouts/Container';

const LoaderComponent = () => {
  return (
    <Container className={'justify-center items-center'}>
      <ActivityIndicator animating={true} />
      <Text>Loading ...</Text>
    </Container>
  );
};

export default LoaderComponent;
