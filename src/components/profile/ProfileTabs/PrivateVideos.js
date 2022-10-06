import {Text} from 'react-native';
import Container from '../../../layouts/Container';

export const PrivateVideo = () => (
  <Container className="px-6 justify-center items-center">
    <Text className={'font-semibold text-black'}>Your private videos</Text>
    <Text className={'text-center'}>
      To make your videos only visible to you, set them to 'Private' in
      settings.
    </Text>
  </Container>
);
