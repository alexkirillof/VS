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
const CategoryPreviewRectangle = ({
  action = () => {},
  name = '',
  image = '',
  position,
}) => {
  return (
    <View style={[styles.list, position % 3 === 0 && styles.thirdItem]}>
      <View style={styles.logo}>
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
      </View>
      <View style={styles.text}>
        <Text style={styles.nameСategory} numberOfLines={3}>
          {_.upperFirst(_.toLower(name)) || ''}
        </Text>
      </View>
    </View>
  );
};

const styles = RNStyles.create({
  list: {
    width: `${screenWidth / 3 - 16}`,
    marginRight: 16,
  },
  thirdItem: {
    marginRight: 0,
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
    height: 90,
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
  },
  logo: {
    zIndex: 100,
    height: 90,
    marginBottom: 8,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: '100%',
    height: 60,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  nameСategory: {
    color: colors.black,
    fontSize: 14,
    lineHeight: 16,
  },
});

export default CategoryPreviewRectangle;
