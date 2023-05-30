import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import RNStyles from '@tapston/react-native-styles';

import {colors, fonts} from '../styles';
import {sortPrices} from '../core/utils';

/**
 * Component PriceTag
 * @prop {string} price - цена по середине
 * @prop {string} left - позиционирование слева
 * @prop {string} right - позиционирование справа
 * @prop {string} type - тип тега (default, big)
 */
const PriceTag = ({pricing}) => {
  const {loyaltyCard} = useSelector(state => state.user);
  const prices = sortPrices(pricing);

  return prices ? (
    <View style={styles.container}>
      {prices.length > 1 ? (
        <View style={styles.containerOldPrice}>
          <Text
            style={[
              styles.oldPrice,
              loyaltyCard && loyaltyCard !== '' ? styles.priceCrossed : '',
            ]}>
            {prices[0].toFixed(2) || '0'} {'\u20BD'}
          </Text>
        </View>
      ) : null}
      <View style={styles.price}>
        <Text numberOfLines={1} style={styles.text}>
          {prices[prices.length - 1].toFixed(2) || '0'} {'\u20BD'}
        </Text>
      </View>
    </View>
  ) : null;
};

const styles = RNStyles.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  priceCrossed: {
    textDecorationLine: 'line-through',
  },
  oldPrice: {
    textDecorationColor: colors.grayPrice,
    color: colors.grayPrice,
    fontSize: 16,
    lineHeight: 18,
    fontFamily: fonts.heading,
    fontWeight: '900',
  },
  text: {
    fontFamily: fonts.heading,
    color: colors.black,
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '900',
  },
});

export default PriceTag;
