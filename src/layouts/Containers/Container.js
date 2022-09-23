import React from 'react';
import {View, Text} from 'react-native';

import {styled} from 'nativewind';

const StyledContainer = styled(View);

const Container = (props) => {
  return <StyledContainer className="flex-1 p-2 bg-slate-200" {...props} />;
};

export default Container;
