import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import FastImage from 'react-native-fast-image';

import {colors, fonts, screenWidth} from '../styles';
import Counter from './counter';
import Button from './button';
import Icon from './icon';
import PriceTag from './price-tag';
import SetFavourite from './set-favourite';
import {TOUCHABLE_OPACITY_VALUE, HIT_SLOP} from '../core/configs';

/**
 * Component BasketGoodItem -> элемент корзины
 * @prop {string} image - url картинки товара. default value -> 'require('../materials/images/image/product.png')'
 * @prop {bool} avaliable - доступен ли для покупки товар
 * @prop {string} mainText - название товара. default value -> ''
 * @prop {number} amount - кол-во товара. default value -> 0
 * @prop {number} maxStep - максимальное возможное кол-во товара. default value -> 999
 * @prop {string} measurement - измерение (мера) товара. Пример: шт, кг, гр. default value -> ''
 * @prop {string || number} price - общая стоимость товара. default value -> ''
 * @prop {string || number} sale_price - скидочная стоимость товара. default value -> ''
 * @prop {string } price_message - описание цены товара. default value -> ''
 * @prop {function()} remove - действие по нажатию на удаление товара
 * @prop {function()} onPressFavorite - действие по нажатию на добавление в избранное
 * @prop {function()} onPress - действие по нажатию на добавление в избранное
 * @prop {function()} onChange - действие по нажатию на добавление в избранное
 * @prop {function(quantity)} change - действие по изменению кол-ва товара
 * @prop {hook} setOpenCounterId - хук для закрытия каунтера
 * @prop {hook} openCounterId - хук для закрытия каунтера
 * @prop {string} onSale - на скидке
 * @prop {string} favorite - избранное
 */
const BasketGoodItem = props => {
  console.log('PRT', props);
  const styles = getStyles(props.lastItem, props.avaliable, props.loading);
  return (
    <View style={styles.common}>
      <View styles={styles.loadingUpdate}>
        {!props.avaliable ? (
          <View style={styles.notAvaliable}>
            <Text style={styles.notAvaliableText}>
              Не доступно к заказу в выбранном магазине
            </Text>
            <Button
              value="Удалить"
              onPress={() => {
                if (props.remove && typeof props.remove === 'function') {
                  props.remove();
                }
              }}
            />
          </View>
        ) : null}
        <View style={styles.wrapper}>
          <TouchableOpacity
            disabled={props.avaliable ? false : true}
            activeOpacity={
              props.openCounterId === props.id ? 1 : TOUCHABLE_OPACITY_VALUE
            }
            onPress={props.onPress}>
            <View style={styles.container}>
              <View
                activeOpacity={TOUCHABLE_OPACITY_VALUE}
                style={styles.leftSide}>
                <View style={styles.header}>
                  <SetFavourite
                    active={props.favorite}
                    onPress={props.onPressFavorite}
                  />
                </View>
                <FastImage
                  source={{uri: props.image}}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </View>
              <View style={styles.right}>
                <View style={styles.nameContainer}>
                  <View style={styles.deleteContainer}>
                    <Text numberOfLines={4} style={styles.title}>
                      {props.mainText}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={TOUCHABLE_OPACITY_VALUE}
                      hitSlop={HIT_SLOP}
                      onPress={props.remove}>
                      <Icon
                        name="close"
                        fill={props.fill ? props.fill : '#979797'}
                      />
                    </TouchableOpacity>
                  </View>
                  {props.sku && (
                    <Text style={styles.skuText}>Арт. {props.sku}</Text>
                  )}
                  <View style={styles.description}>
                    {props.flag && (
                      <FastImage
                        source={{uri: props.flag}}
                        style={styles.flag}
                        resizeMode={'contain'}
                      />
                    )}
                    {props.description && (
                      <Text style={styles.descriptionText}>
                        {props.description}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.costContainer}>
                  <View style={styles.priceBlock}>
                    <PriceTag pricing={props.pricing} />
                    <Text style={styles.priceMessage}>
                      {props.price_message}
                    </Text>
                  </View>
                </View>
                <View style={styles.counterContainer}>
                  <Text style={styles.totalSumm}>
                    Общая сумма: {props.totalPrice}
                  </Text>
                  <View style={styles.counter}>
                    <Counter
                      id={props.id}
                      type="basket"
                      size={props.measure}
                      step={props.step}
                      maxStep={props.maxStep}
                      setOpenCounterId={props.setOpenCounterId}
                      openCounterId={props.id}
                      startCount={props.amount}
                      onChange={count => {
                        props.onChange(count);
                      }}
                    />
                  </View>
                  <Text style={styles.deliveryText}>{props.delivery}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const getStyles = (lastItem, avaliable, loading) =>
  RNStyles.create({
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
    common: {
      position: 'relative',
      opacity: !loading ? 1 : 0.3,
    },
    wrapper: {
      position: 'relative',
      marginTop: 16,
      borderBottomWidth: lastItem ? 0 : 1,
      paddingBottom: lastItem ? 16 : 0,
      borderColor: colors.gray,
      opacity: avaliable ? 1 : 0.3,
    },
    counterContainer: {
      marginTop: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    counter: {
      width: '100%',
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
    },
    totalSumm: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: 'bold',
      marginBottom: 6,
    },
    deliveryText: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: 'bold',
      color: colors.primary,
      marginTop: 6,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      marginVertical: 16,
    },
    left: {
      flex: 0.3,
      flexDirection: 'column',
    },
    right: {
      flex: 0.7,
      flexDirection: 'column',
      marginLeft: 16,
    },
    header: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    favorite: {
      flexDirection: 'row-reverse',
    },
    onSale: {
      padding: 4,
      backgroundColor: colors.gray,
      borderTopLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
    },
    image: {
      width: `${screenWidth / 2.2 - 32}`,
      height: '100%',
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
    },
    nameContainer: {
      alignItems: 'flex-start',
      textAlign: 'left',
    },
    deleteContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    quantityContainer: {
      width: '16%',
      paddingRight: 8,
      zIndex: 1000,
    },
    costContainer: {
      marginTop: 16,
      justifyContent: 'center',
    },
    imageProduct: {
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    title: {
      maxWidth: '88%',
      fontFamily: fonts.heading,
      fontSize: 18,
      lineHeight: 22,
      color: colors.black,
      fontWeight: '900',
      marginBottom: 16,
    },
    text: {
      fontSize: 22,
      fontWeight: 'bold',
      lineHeight: 24,
      color: colors.black,
    },
    rightText: {
      textAlign: 'right',
    },
    volume: {
      fontSize: 14,
      lineHeight: 16,
      color: colors.grayPrice,
    },
    notAvaliable: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    notAvaliableText: {
      maxWidth: '70%',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
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
  });

export default BasketGoodItem;
