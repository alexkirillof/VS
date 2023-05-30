import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import {colors} from '../styles';
import {HIT_SLOP, TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Component BlockHeader
 * @prop {Array} children - передавать данные для заготовки
 * @prop {string} secondText -текст справа
 * @prop {boolean} smallText - шрифт правой колонки
 * @prop {function} onPress - фукнция
 */
const BlockHeader = props => {
  return (
    <View style={styles.common}>
      <View>{props.children}</View>
      <View>
        {props.secondText && (
          <TouchableOpacity
            hitSlop={HIT_SLOP}
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            onPress={() => {
              if (props.onPress && typeof props.onPress === 'function') {
                props.onPress();
              }
            }}>
            <Text style={props.smallText ? styles.defaultText : styles.text}>
              {props.secondText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    lineHeight: 18,
    '@media (max-height: 568)': {
      fontSize: 14,
    },
  },
  defaultText: {
    color: colors.primary,
    fontSize: 14,
    lineHeight: 16,
  },
});

export default BlockHeader;
