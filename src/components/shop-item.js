import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import Icon from './icon';
import {colors, screenWidth} from '../styles';
import {HIT_SLOP, TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Component ShopItem
 * @prop {string} key - description of the prop
 * @prop {string} name - description of the prop
 * @prop {string} workTime - description of the prop
 * @prop {boolean} checked - description of the prop
 * @prop {function} onPress - функция вызова
 */
const ShopItem = ({
  name = 'name',
  workTime = 'workTime',
  checked = false,
  lastItem = false,
  delivery = false,
  amount = 0,
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
        <View>
          {name && name !== '' ? (
            <Text style={styles.name} numberOfLines={3}>
              {name}
            </Text>
          ) : null}
          {amount && amount > 0 ? (
            <View style={styles.amount}>
              <Text style={styles.info} numberOfLines={1}>
                Осталось в магазине: {amount}
              </Text>
            </View>
          ) : null}
          {workTime && workTime !== '' ? (
            <View style={styles.workTime}>
              <View style={styles.icon}>
                <Icon name="time" />
              </View>
              <Text style={styles.info} numberOfLines={1}>
                {workTime}
              </Text>
            </View>
          ) : null}
          {delivery && delivery !== '' ? (
            <Text style={styles.info} numberOfLines={1}>
              Способ доставки: Доставка на дом
            </Text>
          ) : null}
        </View>
        {checked && (
          <View style={styles.arrow}>
            <Icon name="check-active" fill={colors.primary} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  testCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.border.blackSmall,
    paddingVertical: 8,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  name: {
    width: `${screenWidth - 72}`,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    flexWrap: 'wrap',
  },
  workTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  info: {
    fontSize: 14,
    color: colors.grayPrice,
    marginVertical: 8,
  },
  containerTouch: {
    width: 20,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  arrow: {
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 4,
  },
});

export default ShopItem;
