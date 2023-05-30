import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import FastImage from 'react-native-fast-image';
import {ImagesDefault, colors, fontWeight, screenHeight} from '../styles';
import {TOUCHABLE_OPACITY_VALUE, HIT_SLOP} from '../core/configs';

/**
 * Component SliderDotsItem
 * @prop {string} nameProduct - имя продукта
 * @prop {string || number} massProduct - масса продукта
 * @prop {object} firstShop - первая магазин
 * @prop {object} secondShop - второй магазин
 * @prop {string || number} firstPrice - первая цена Желтая
 * @prop {string || number} secondPrice - вторая цена Красная
 * @prop {string} image - url картинки
 */
const SliderDotsItem = props => {
  const replaceString = value => {
    if (value) {
      value = String(value);
      if (value.indexOf('.') !== -1) {
        return value.replace('.', ',');
      } else if (value.indexOf(',') !== -1) {
        return value.replace(',', '.');
      }
    }
    return value;
  };
  const [imageError, setImageError] = useState(false);
  return (
    <View style={styles.common}>
      <View style={styles.description}>
        <View style={styles.imageBack}>
          {!imageError ? (
            <FastImage
              source={
                props.image ? {uri: props.image} : ImagesDefault.logoMarket
              }
              style={styles.image}
              resizeMode={'cover'}
              onError={() => setImageError(true)}
            />
          ) : (
            <FastImage
              source={ImagesDefault.logoMarket}
              style={styles.image}
              resizeMode={'contain'}
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.nameProduct}>
            {props.nameProduct || 'Товар'}
          </Text>
          <Text style={styles.mass}>{props.massProduct || ' 0 кг'}</Text>
        </View>
        <View />
      </View>
      <View style={styles.containerPrice}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ProductCard', {
              productId: props.firstShop.shopRelationID,
              shopId: props.firstShop.shopID,
            });
          }}
          hitSlop={HIT_SLOP}
          activeOpacity={TOUCHABLE_OPACITY_VALUE}
          style={[styles.price, styles.yellowBG]}>
          <Text style={[styles.firstPrice, styles.text]}>
            {replaceString(props.firstPrice) || '00,00'} р
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ProductCard', {
              productId: props.secondShop.shopRelationID,
              shopId: props.secondShop.shopID,
            });
          }}
          hitSlop={HIT_SLOP}
          activeOpacity={TOUCHABLE_OPACITY_VALUE}
          style={[styles.price, styles.redBG]}>
          <Text style={[styles.secondPrice, styles.text]}>
            {replaceString(props.secondPrice) || '00,00'} р
          </Text>
        </TouchableOpacity>
      </View>
      <View />
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    height: 40,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  imageBack: {
    marginRight: 6,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.2,
  },
  textContainer: {
    justifyContent: 'space-between',
    fontSize: 16,
    lineHeight: 20,
    width: screenHeight <= 570 ? 80 : '65%',
  },
  mass: {
    marginTop: 4,
    color: colors.grayPrice,
  },
  containerPrice: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  nameProduct: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 20,
    width: '100%',
  },
  price: {
    width: 72,
    height: 28,
    borderRadius: 6,
    transform: [{rotate: '-4deg'}],
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: colors.black,
    lineHeight: 20,
  },
  yellowBG: {
    backgroundColor: colors.background.yellow,
    marginRight: 8,
  },
  redBG: {
    backgroundColor: colors.background.primaryOrange,
  },
  text: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: fontWeight.bold,
  },
  firstPrice: {
    color: colors.black,
  },
  secondPrice: {
    color: colors.white,
  },
});

export default SliderDotsItem;
