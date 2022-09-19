import React from 'react';

import {FlatList, View, Text} from 'react-native';
import IntroCard from '../layouts/Cards/IntroCard';
import IntroHeader from '../layouts/Header/IntroHeader';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const ChooseInterest = () => {
  const renderItem = ({item, index}) => <IntroCard item={item} />;
  return (
    <View className="flex-1 px-4 bg-slate-50">
      <FlatList
        horizontal={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        ListHeaderComponent={
          <IntroHeader
            title={'Choose your favorite breed'}
            subtitle={'Get better video recommendations'}
          />
        }
      />
    </View>
  );
};

export default ChooseInterest;
