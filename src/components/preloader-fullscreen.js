import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import {colors} from '../styles';

/**
 *  Лоадер на весь экран
 */
const PreloaderFullscreen = () => {
  return (
    <View style={styles.common}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
});

export default PreloaderFullscreen;
