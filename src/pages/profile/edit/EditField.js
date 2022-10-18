import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import Container from '@layouts/Container';
import Header from '@layouts/Header';

import {updateUserProfile} from '@features/user/userActions';
import {userStatus} from '@features/user/userSlice';
import {fetchUserDetails} from '@features/user/userActions';

const EditField = ({navigation, route}) => {
  const {title, value, field, type} = route.params;

  const dispatch = useDispatch();
  const {updateStatus} = useSelector(userStatus);

  const [text, setText] = React.useState(value);

  const onSave = () => {
    Promise.all([
      dispatch(updateUserProfile({field, text})),
      dispatch(fetchUserDetails()),
    ]).then(navigation.goBack());
  };

  return (
    <Container>
      <Header title={title} />
      <TextInput
        className={'mx-3 my-2'}
        mode="outlined"
        label={title}
        value={text}
        onChangeText={text => setText(text)}
        keyboardType={type}
      />
      <Button
        mode="contained"
        disabled={updateStatus}
        onPress={onSave}
        className={'m-3 rounded-sm'}>
        {updateStatus ? 'Updating' : 'Update'} {`${title}`}
      </Button>
    </Container>
  );
};

export default EditField;
