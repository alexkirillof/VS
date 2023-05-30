import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import {colors, fontWeight} from '../styles';
import Icon from './icon';
import {TOUCHABLE_OPACITY_VALUE} from '../core/configs';
/**
 * Search result item
 * @prop {boolean} last - this is last item in list
 * @prop {boolean} element - value element
 * @prop {boolean} inputValue - search value
 * @prop {function} onPress - фукнция
 * @prop {function()} selection - callback selection item
 * @prop {function} onPress - фукнция
 */
const HeaderSearchResultItem = ({
  element = '',
  inputValue = '',
  last = false,
  selection = () => {},
  activeCity,
}) => {
  const styles = getStyles(last);
  return (
    <TouchableOpacity
      activeOpacity={TOUCHABLE_OPACITY_VALUE}
      style={styles.common}
      onPress={selection}>
      <Text
        style={[
          styles.text,
          activeCity && {
            fontWeight:
              inputValue === '' && element === activeCity.label
                ? fontWeight.bold
                : fontWeight.regular,
          },
        ]}>
        {inputValue ? <Text style={styles.bold}>{inputValue}</Text> : null}
        {inputValue !== ''
          ? element.slice(inputValue.length, element.length)
          : element}
      </Text>
      <Icon name="right-arrow" />
    </TouchableOpacity>
  );
};

const getStyles = last =>
  RNStyles.create({
    common: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      borderColor: 'rgba(0,0,0, 0.2)',
      borderBottomWidth: last ? 0 : 1,
      paddingVertical: 12,
      paddingRight: 20,
    },
    text: {
      color: colors.text.black,
      fontSize: 16,
      lineHeight: 19,
    },
    bold: {
      color: colors.text.black,
      fontWeight: fontWeight.bold,
    },
  });

export default HeaderSearchResultItem;
