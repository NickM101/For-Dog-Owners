import React from 'react';
import {View, Text} from 'react-native';
import PagerView from 'react-native-pager-view';

const Pager = () => {
  return (
    <PagerView
      className="flex-1 bg-slate-300 "
      initialPage={0}
      orientation={'vertical'}>
      {[1, 2, 3, 4, 5, 6].map(num => {
        console.log(num);
        return (
          <View
            className="flex-1 h-screen w-full justify-center items-center"
            key={num}>
            <Text>{num} page</Text>
          </View>
        );
      })}
    </PagerView>
  );
};

export default Pager;
