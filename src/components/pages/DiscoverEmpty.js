import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Container from '@layouts/Container';

const DiscoverEmpty = () => {
  return (
    <Container className="justify-center items-center">
      <Text className={'font-bold text-xl'}>No new discovers found.</Text>
    </Container>
  );
};

export default DiscoverEmpty;

const styles = StyleSheet.create({});
