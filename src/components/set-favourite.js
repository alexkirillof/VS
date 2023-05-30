import React from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import Icon from './icon';
import {colors} from '../styles';

/**
 * Button component
 * @prop {Function} onPress - on press button
 * @prop {String} value - text value on button
 * @prop {Bool} disabled - if true then button can`t be pressed
 */
const SetFavourite = ({
  onPress = () => {},
  active = false,
  disabled = false,
  reversDisable = true,
  color = 'primary',
  loading = false,
  style = {},
  width = 'auto',
}) => {
  const styles = getStyles({disabled, width, reversDisable, color});

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon
        name={'heart'}
        fill={active ? colors.primary : colors.white}
        stroke={active ? colors.primary : '#9D9B9B'}
      />
    </TouchableOpacity>
  );
};

const getStyles = () =>
  RNStyles.create({
    container: {
      width: 32,
      height: 32,
    },
  });

export default SetFavourite;
