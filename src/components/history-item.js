import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import Icon from './icon';
import {colors} from '../styles';
import {HIT_SLOP, TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Component HistoryItem
 * @prop {string} name - description of the prop
 * @prop {function} onPressDelete - функция вызова
 * @prop {boolean} firstItem вешаем на первый элемент
 */
const HistoryItem = ({
  name = 'name',
  date = '',
  status = '',
  total = '',
  lastItem = false,
  onPress = () => {},
}) => {
  return (
    <View style={styles.common}>
      {/* <TouchableOpacity
        activeOpacity={TOUCHABLE_OPACITY_VALUE}
        style={styles.containerTouch}
        onPress={onPressDelete}
        hitSlop={HIT_SLOP}>
        <Icon name="gray-close-crose" />
      </TouchableOpacity> */}
      <TouchableOpacity
        activeOpacity={TOUCHABLE_OPACITY_VALUE}
        style={
          lastItem ? styles.testCont : [styles.testCont, styles.borderBottom]
        }
        onPress={onPress}>
        <View style={styles.historyRow}>
          <Text style={styles.historyKey} numberOfLines={1}>
            Номер заказа:
          </Text>
          <Text style={styles.historyValue} numberOfLines={1}>
            {name}
          </Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyKey} numberOfLines={1}>
            Дата заказа:
          </Text>
          <Text style={styles.historyValue} numberOfLines={1}>
            {date}
          </Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyKey} numberOfLines={1}>
            Статус заказа:
          </Text>
          <Text style={styles.historyValue} numberOfLines={1}>
            {status}
          </Text>
        </View>
        <View style={styles.historyRow}>
          <Text style={styles.historyKey} numberOfLines={1}>
            Итого:
          </Text>
          <Text style={styles.historyValue} numberOfLines={1}>
            {total} {'\u20BD'}
          </Text>
        </View>
        {/* <View style={styles.arrow}>
          <Icon name="right-arrow" />
        </View> */}
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderColor: colors.border.blackSmall,
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  historyKey: {
    fontSize: 20,
    lineHeight: 22,
    marginRight: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  historyValue: {
    fontSize: 20,
    lineHeight: 22,
    color: colors.black,
  },
  containerTouch: {
    width: 20,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  arrow: {
    paddingHorizontal: 16,
  },
});

export default HistoryItem;
