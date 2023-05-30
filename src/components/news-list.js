import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import {colors, ImagesDefault, screenWidth} from '../styles';
import {TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Component CategoryPreviewRectangle -> элемент категории продуктов
 * @prop {string} name - название категории товара
 * @prop {string} image - url картинки категории товара
 * @prop {function} action - действие по нажатию на категорию
 */
const NewsList = ({
  action = () => {},
  date = '',
  name = '',
  image = '',
  position,
}) => {
  return (
    <View style={styles.list}>
      <TouchableOpacity
        activeOpacity={TOUCHABLE_OPACITY_VALUE}
        style={styles.touchable}
        onPress={action}>
        <FastImage
          source={image ? {uri: image} : ImagesDefault.defaultImage}
          style={styles.image}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.dateNews}>{date}</Text>
      </View>
      <View style={styles.text}>
        <Text style={styles.nameNews} numberOfLines={3}>
          {_.upperFirst(_.toLower(name)) || ''}
        </Text>
      </View>
    </View>
  );
};

const styles = RNStyles.create({
  list: {
    width: `${screenWidth - 16}`,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 20,
    marginBottom: 20,
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
    height: 240,
    borderRadius: 6,
    position: 'relative',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    backgroundColor: '#f1f1f1',
    elevation: 6,
    marginBottom: 8,
  },
  text: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  dateNews: {
    fontSize: 12,
    lineHeight: 15,
    color: colors.grayPrice,
  },
  nameNews: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
  },
});

export default NewsList;
