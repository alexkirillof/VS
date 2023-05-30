import React from 'react';
import {View, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import FastImage from 'react-native-fast-image';
import {colors, ImagesDefault, screenWidth} from '../styles';
import Button from './button';

const EmptySearch = ({onPress, error = false, buttonText = 'На главную'}) => {
  return (
    <View style={[styles.content, styles.noContent]}>
      <FastImage
        source={ImagesDefault.empty}
        style={styles.image}
        resizeMode={'contain'}
      />
      <View style={styles.containerText}>
        <Text style={styles.title}>Ой, пусто!</Text>
        <Text style={styles.message}>
          {error
            ? 'Простите, по вашему запросу ничего не найдено'
            : 'Введите поисковый запрос'}
        </Text>
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
    height: `${screenWidth / 1.3}`,
    width: '100%',
    marginBottom: 12,
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

export default EmptySearch;
