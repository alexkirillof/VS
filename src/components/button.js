import React from 'react';
import {View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {colors, fonts} from '../styles';
import Icon from './icon';

/**
 * Button component
 * @prop {Function} onPress - on press button
 * @prop {String} value - text value on button
 * @prop {Bool} disabled - if true then button can`t be pressed
 */
const Button = ({
  onPress = () => {},
  value = '',
  disabled = false,
  reversDisable = true,
  color = 'primary',
  loading = false,
  icon = false,
  style = {},
  width = 'auto',
  textContainerStyle,
  textStyle,
}) => {
  const styles = getStyles({disabled, width, reversDisable, color});
  const Touchable = TouchableOpacity;

  return (
    <Touchable
      activeOpacity={0.75}
      rippleColor={colors.white}
      rippleDuration={600}
      style={[styles.container, style]}
      disabled={disabled}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <View style={[styles.textContainer, textContainerStyle]}>
          {icon && (
            <View style={styles.icon}>
              <Icon name="cart" fill="#FFFFFF" />
            </View>
          )}
          <Text style={[styles.text, textStyle]} numberOfLines={1}>
            {value}
          </Text>
        </View>
      )}
    </Touchable>
  );
};

const getStyles = ({color, width, reversDisable, disabled}) =>
  RNStyles.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: width === 'full' ? '100%' : 'auto',
      paddingHorizontal: 24,
      backgroundColor:
        disabled || !reversDisable
          ? colors.btnGray
          : color === 'primary'
          ? colors.primary
          : colors.secondary,
      borderRadius: 8,
      height: 48,
      '@media ios': {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 8,
      },
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginRight: 8,
    },
    text: {
      fontFamily: fonts.heading,
      fontWeight: 'bold',
      color: colors.white,
      fontSize: 16,
      lineHeight: 20,
    },
  });

export default Button;
