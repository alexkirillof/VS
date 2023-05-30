import React from 'react';
import {View} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import FastImage from 'react-native-fast-image';
import {colors, ImagesDefault, screenWidth, screenHeight} from '../../styles';

const LaunchFirstView = props => {
  return (
    <View style={styles.common}>
      <FastImage
        source={ImagesDefault.splash}
        style={styles.image}
        resizeMode={'contain'}
      />
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    height: screenHeight,
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
  },
  image: {
    height: `${screenWidth * 1.5}`,
    width: '100%',
    marginBottom: -10,
  },
});

export default LaunchFirstView;
