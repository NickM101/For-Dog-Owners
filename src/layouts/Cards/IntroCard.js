import React from 'react';
import {Card, Title} from 'react-native-paper';

const IntroCard = ({item}) => {
  return (
    <Card key={item} className="m-3 h-32 w-32" mode="outlined">
      <Card.Cover
        className="h-24"
        source={{uri: 'https://picsum.photos/500'}}
      />
      <Card.Content>
        <Title>Card title</Title>
      </Card.Content>
    </Card>
  );
};

export default IntroCard;
