import React from 'react';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {FavoriteVideo} from './FavoriteVideos';
import {PrivateVideo} from './PrivateVideos';
import {UserVideos} from './UserVideos';

const renderScene = SceneMap({
  first: UserVideos,
  second: PrivateVideo,
  third: FavoriteVideo,
});

const ProfileTabs = ({data}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      icon: 'apps',
    },
    {
      key: 'second',
      icon: 'lock-outline',
    },
    {
      key: 'third',
      icon: 'heart-cog-outline',
    },
  ]);

  const renderIcon = ({route, focused}) => {
    console.info(route);
    let iconColor = focused ? '#6d578b' : '#c2c3c8';
    return <MaterialIcons name={route.icon} size={23} color={iconColor} />;
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      swipeEnabled={false}
      renderTabBar={props => {
        return (
          <TabBar
            {...props}
            style={{backgroundColor: 'white'}}
            renderIcon={renderIcon}
          />
        );
      }}
    />
  );
};

export default ProfileTabs;
