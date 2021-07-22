import React from 'react';
import { Utils, TextView } from '@components';
import { colorPrimary } from '@colors';
import { View, ActivityIndicator } from 'react-native';

const Loader = ({ height }) => {
  return (
    <View
      style={{
        ...Utils.backgroundColor('white'),
        ...Utils.height(height),
        ...Utils.alignItems('center'),
        ...Utils.justifyContent('center'),
      }}>
      <ActivityIndicator size="large" color={colorPrimary} />
      <TextView style={Utils.mt(16)}>Please wait...</TextView>
    </View>
  );
};

Loader.defaultProps = {
  height: '100%',
};

export default Loader;
