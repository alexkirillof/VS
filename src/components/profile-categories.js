import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import Icon from './icon';
import Switcher from './switcher';
import {colors} from '../styles';
import {TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Component ProfileCategories
 * @prop {string} text - текст слева
 * @prop {function} onPress  - функция
 * @prop {function} onPressSwitcher  - функция
 * @prop {boolean} switch - если true то вместо стрелочки будет switcher
 * @prop {boolean} switcherValue - состояние свича
 */
const ProfileCategories = ({
  onPressSwitcher = () => {},
  onPress = () => {},
  switcher = false,
  badge = false,
  badgeCount = '',
  switcherValue,
  text = '',
  icon = null,
  highlighted = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={TOUCHABLE_OPACITY_VALUE}
      onPress={onPress}
      style={styles.common}>
      <View style={styles.textBlock}>
        {icon && (
          <View style={styles.iconStyle}>
            <Icon
              name={icon}
              fill={highlighted ? colors.primary : '#9D9B9B'}
              stroke={highlighted ? colors.primary : '#9D9B9B'}
            />
          </View>
        )}
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        )}
        <Text style={[styles.text, highlighted && styles.highlighted]}>
          {text}
        </Text>
      </View>
      {switcher && (
        <Switcher
          value={switcherValue}
          onChange={value => onPressSwitcher(value)}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    paddingVertical: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    lineHeight: 22,
    fontSize: 18,
  },
  highlighted: {
    color: colors.primary,
  },
  badge: {
    square: 20,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.white,
    textAlign: 'center',
  },
  iconStyle: {
    height: 32,
    width: 32,
    marginRight: 16,
    marginLeft: -8,
    paddingLeft: 8,
  },
});

export default ProfileCategories;
