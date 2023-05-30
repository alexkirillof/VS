import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import Icon from './icon';
import {colors, fonts} from '../styles';
import {TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Component ListItem
 * @prop {string} name - description of the prop
 * @prop {function} onPressDelete - функция вызова
 * @prop {boolean} firstItem вешаем на первый элемент
 */
const ListItem = ({
  name = 'name',
  arrow = true,
  checkActive = false,
  lines = 1,
  lastItem = false,
  onPress = () => {},
  icon,
  fill = '#000',
  stroke = '#000',
  primary = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={TOUCHABLE_OPACITY_VALUE}
      style={[lastItem ? styles.content : styles.content, styles.borderBottom]}
      onPress={onPress}>
      <View style={styles.titleRow}>
        {icon && (
          <View style={styles.titleIcon}>
            <Icon name={icon} fill={fill} stroke={stroke} />
          </View>
        )}
        <Text
          style={[styles.title, primary && styles.primary]}
          numberOfLines={lines}>
          {name}
        </Text>
      </View>
      <View>
        {arrow && (
          <View style={styles.arrow}>
            <Icon name="arrow-back" />
          </View>
        )}
        {checkActive && (
          <View style={styles.arrow}>
            <Icon name="check-active" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = RNStyles.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: colors.border.blackSmall,
  },
  primary: {
    color: colors.primary,
  },
  title: {
    flex: 1,
    fontFamily: fonts.primaryRegular,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 32,
    color: colors.black,
  },
  arrow: {
    transform: [{rotate: '180deg'}],
    marginRight: -8,
  },
});

export default ListItem;
