import {View} from 'react-native';
import React, {useCallback} from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  title,
  leftIcon,
  leftPressed,
  rightIcon = 'chevron-left',
  rightPressed,
}) => {
  const navigation = useNavigation();

  const handleRightPressed = useCallback(() => {
    return rightPressed === undefined ? navigation.goBack() : rightPressed;
  }, [rightIcon]);


  return (
    <View>
      <Appbar mode="center-aligned">
        {rightIcon && (
          <Appbar.Action icon={rightIcon} onPress={handleRightPressed} />
        )}
        <Appbar.Content title={title} />
        {leftIcon && <Appbar.Action icon={leftIcon} onPress={leftPressed} />}
      </Appbar>
    </View>
  );
};

export default Header;
