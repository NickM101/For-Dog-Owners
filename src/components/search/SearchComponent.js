import * as React from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import firestore from '@react-native-firebase/firestore';
import {setLoading, setUsers} from '../../features/search/searchSlice';
import {firebaseErrors} from '../../services/fb_errors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchComponent = ({clampedScroll}) => {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.search.loading);

  const [search, setSearch] = React.useState('');
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

  React.useEffect(() => {
    if (!search.length) {
      setSearch('');
    }
  }, [search]);

  const onSearchUser = async () => {
    setLoading(true);
    console.log('searching');
    await firestore()
      .collection('users')
      .where('username', '>=', search)
      .where('username', '<=', search + '\uf8ff')
      .get()
      .then(querySnapshot => {
        let users = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            console.log('id', doc.id);
            const data = doc.data();
            const id = doc.id;

            users.push({id, ...data});
          });
        }
        setLoading(false);
        return dispatch(setUsers(users));
      })
      .catch(error => {
        console.log('error', error);
        firebaseErrors(error.code);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const clearText = () => {
    setSearch('');
    setUsers([]);
  };
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
      <TextInput
        mode="outlined"
        placeholder="Search"
        onChangeText={setSearch}
        value={search}
        className={'rounded-lg'}
        onSubmitEditing={onSearchUser}
        left={<TextInput.Icon icon={'account-search'} />}
        right={<TextInput.Icon icon={'close-circle'} onPress={clearText} />}
        keyboardType={'web-search'}
        returnKeyLabel={'search'}
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
