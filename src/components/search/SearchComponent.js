import * as React from 'react';
import {Animated, Dimensions, StyleSheet, TextInput} from 'react-native';
import {Searchbar} from 'react-native-paper';

const SearchComponent = ({clampedScroll}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -250],
    extrapolate: 'clamp',
  });
  const searchBarOpacity = clampedScroll.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: searchBarTranslate,
            },
          ],
          opacity: searchBarOpacity,
        },
      ]}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        className={'rounded-lg'}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 15,
    width: Dimensions.get('window').width - 30,
    left: 15,
    zIndex: 99,
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: '#888888',
    fontSize: 18,
    height: 50,
  },
});

export default SearchComponent;
