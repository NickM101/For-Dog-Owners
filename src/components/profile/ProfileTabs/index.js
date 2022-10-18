import React from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {FavoriteVideo} from './FavoriteVideos';
import {UserVideos} from './UserVideos';

const renderScene = SceneMap({
  first: UserVideos,
  second: FavoriteVideo,
});

const ProfileTabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      icon: 'apps',
    },
    {
      key: 'second',
      icon: 'heart-cog-outline',
    },
  ]);

  const renderIcon = ({route, focused}) => {
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
