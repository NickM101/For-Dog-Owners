import React from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {FavoriteVideo} from './FavoriteVideos';
import {PrivateVideo} from './PrivateVideos';
import {UserVideos} from './UserVideos';

const renderScene = SceneMap({
  first: UserVideos,
  second: PrivateVideo,
  third: FavoriteVideo,
});

const ProfileTabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: '',
      icon: '',
    },
    {
      key: 'second',
      title: '',
      icon: '',
    },
    {
      key: 'third',
      title: '',
      icon: '',
    },
  ]);

  const renderIcon = ({route, focused}) => {
    console.info(route);
    let iconColor = focused ? '#6d578b' : '#c2c3c8';
    return <Ionicons name="md-contact" size={23} color={iconColor} />;
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => {
        return <TabBar {...props} renderIcon={renderIcon} />;
      }}
    />
  );
};

export default ProfileTabs;
