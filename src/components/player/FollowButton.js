import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {followDiscoverUser} from '@features/discover/discoverSlice';
import {loggedInUser} from '../../features/user/userSlice';

const FollowButton = ({follower}) => {
  const dispatch = useDispatch();

  const user = useSelector(loggedInUser);

  const follow_user = () => {
    dispatch(
      followDiscoverUser({
        followerId: follower,
        userId: user.id,
      }),
    );
  };

  return (
    <TouchableOpacity
      className={
        'justify-center border border-orange-400 items-center bg-slate-700 h-4 w-4 rounded-full absolute inset-y-11 inset-x-3'
      }
      onPress={follow_user}>
      <MaterialIcons
        name={'plus'}
        size={12}
        className={'font-bold'}
        color={'white'}
      />
    </TouchableOpacity>
  );
};

export default FollowButton;
