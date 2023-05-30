import React from 'react';
import { View, Text } from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import FastImage from 'react-native-fast-image';
import { colors, ImagesDefault, screenWidth } from '../styles';
import Button from './button';

const EmptyNotifications = () => {
  return (
    <View style={[styles.content, styles.noContent]}>
      <FastImage
        source={ImagesDefault.emptyNotifications}
        style={styles.image}
        resizeMode={'contain'}
      />
      <View style={styles.containerText}>
        <Text style={styles.title}>У вас пока нет уведомлений</Text>
      </View>
    </View>
  );
};

const styles = RNStyles.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  noContent: {
    marginTop: 48,
    padding: 8,
  },
  image: {
    height: `${screenWidth / 1.6}`,
    width: '100%',
    marginVertical: 64,
  },
  containerText: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 4,
  },
  buttonCont: {
    width: '100%',
    marginTop: 26,
  },
});

export default EmptyNotifications;
