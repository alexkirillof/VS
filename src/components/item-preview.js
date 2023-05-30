import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNStyles from '@tapston/react-native-styles';
import PriceTag from './price-tag';
import Counter from './counter';
import SetFavourite from './set-favourite';

import {ImagesDefault, colors, screenWidth, fonts} from '../styles';
import {TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Component ItemPreview
 * @prop {string} mainText - название товара
 * @prop {boolean} onSale - на скидке
 * @prop {string} image - заголовок
 * @prop {string} price - ценник
 * @prop {number} index - индекс в массиве
 * @prop {function()} onChange - коллбэк смены кол-ва товаров
 * @prop {function()} onPress - нажатие на картинку
 * @prop {function()} onPressFavorite - нажатие на избранное
 * @prop {hook} setOpenCounterId - хук для закрытия каунтера
 * @prop {hook} openCounterId - хук для открытия каунтера
 */
const ItemPreview = ({
  mainText = null,
  favorite = false,
  image = ImagesDefault.defaultImage,
  sku = null,
  flag = ImagesDefault.dafaultFlag,
  description = null,
  pricing = null,
  price_message = null,
  measure = null,
  id,
  onChange = () => {},
  onPress = () => {},
  onPressFavorite = () => {},
  amount = 0,
  step = 1,
  maxStep = 100,
  openCounterId,
  setOpenCounterId = () => {},
}) => {
  const styles = getStyles();
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        setOpenCounterId(null);
      }}>
      <View style={styles.common}>
        <TouchableOpacity
          disabled={id === openCounterId}
          activeOpacity={TOUCHABLE_OPACITY_VALUE}
          style={styles.leftSide}
          onPress={onPress}>
          <View style={styles.header}>
            <SetFavourite active={favorite} onPress={onPressFavorite} />
          </View>
          <FastImage
            source={{uri: image}}
            style={styles.image}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={id === openCounterId}
          activeOpacity={TOUCHABLE_OPACITY_VALUE}
          style={styles.rightSide}
          onPress={onPress}>
          <View style={styles.content}>
            <Text style={styles.mainText}>{mainText}</Text>
            {sku && <Text style={styles.skuText}>Арт. {sku}</Text>}
            <View style={styles.description}>
              {flag && (
                <FastImage
                  source={{uri: flag}}
                  style={styles.flag}
                  resizeMode={'contain'}
                />
              )}
              {description && (
                <Text style={styles.descriptionText}>{description}</Text>
              )}
            </View>
            <View style={styles.priceBlock}>
              <PriceTag pricing={pricing} />
              <Text style={styles.priceMessage}>{price_message}</Text>
            </View>
            <Counter
              id={id}
              size={measure}
              step={step}
              maxStep={maxStep}
              setOpenCounterId={setOpenCounterId}
              openCounterId={openCounterId}
              startCount={amount}
              onChange={count => {
                onChange(count);
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
const getStyles = () =>
  RNStyles.create({
    container: {
      flex: 1,
    },
    common: {
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.grayShadow,
      marginVertical: 8,
      marginHorizontal: 8,
    },
    leftSide: {
      flex: 0.4,
      marginRight: 16,
    },
    rightSide: {
      flex: 0.6,
    },
    favorite: {
      flexDirection: 'row-reverse',
      marginRight: 8,
    },
    top: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    onSale: {
      padding: 4,
      backgroundColor: colors.gray,
      borderTopLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    image: {
      width: `${screenWidth / 2 - 32}`,
      height: 280,
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
    },
    mainText: {
      fontFamily: fonts.heading,
      fontSize: 18,
      lineHeight: 22,
      color: colors.black,
      fontWeight: '900',
      marginBottom: 16,
    },
    skuText: {
      fontSize: 14,
      lineHeight: 18,
      color: colors.lightGray,
      marginBottom: 4,
    },
    description: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    descriptionText: {
      fontSize: 14,
      lineHeight: 18,
      color: colors.lightGray,
    },
    flag: {
      width: 24,
      height: '100%',
      marginRight: 8,
    },
    priceBlock: {
      flex: 1,
      marginVertical: 16,
    },
    priceMessage: {
      fontSize: 9,
      lineHeight: 12,
      width: '100%',
      maxWidth: `${screenWidth}`,
      color: colors.black,
      position: 'absolute',
      bottom: -12,
    },
    header: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });

export default ItemPreview;
