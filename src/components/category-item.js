import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import _ from 'lodash';
import Icon from './icon';
import {colors} from '../styles';
import {HIT_SLOP, TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Component CategoryItem
 * @prop {string} name - description of the prop
 * @prop {function} onPressDelete - функция вызова
 * @prop {boolean} firstItem вешаем на первый элемент
 */
const CategoryItem = ({
  name = 'name',
  lastItem = false,
  onPressDelete = () => {},
  onPress = () => {},
}) => {
  return (
    <View style={styles.common}>
      {/* <TouchableOpacity
        activeOpacity={TOUCHABLE_OPACITY_VALUE}
        style={styles.containerTouch}
        onPress={() => onPressDelete()}
        hitSlop={HIT_SLOP}>
        <Icon name="gray-close-crose" />
      </TouchableOpacity> */}
      <TouchableOpacity
        activeOpacity={TOUCHABLE_OPACITY_VALUE}
        style={
          lastItem ? styles.testCont : [styles.testCont, styles.borderBottom]
        }
        onPress={onPress}>
        <Text style={styles.TestName} numberOfLines={1}>
          {_.upperFirst(_.toLower(name))}
        </Text>
        <View style={styles.arrow}>
          <Icon name="right-arrow" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  testCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.gray,
    paddingVertical: 26,
  },
  borderBottom: {
    borderBottomWidth: 1,
    width: '100%',
  },
  TestName: {
    fontSize: 18,
    paddingLeft: 16,
    color: colors.black,
  },
  containerTouch: {
    width: 20,
    alignItems: 'center',
  },
  arrow: {
    paddingRight: 16,
  },
});

export default CategoryItem;
