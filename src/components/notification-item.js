import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import Icon from './icon';
import { fonts, colors, screenWidth } from '../styles';
import { TOUCHABLE_OPACITY_VALUE } from '../core/configs';

/**
 * Component NotificationItem
 * @prop {string} name - description of the prop
 * @prop {function} onPressDelete - функция вызова
 * @prop {boolean} firstItem вешаем на первый элемент
 */
const NotificationItem = ({
  title = '',
  message = '',
  date_create = '',
  viewed = false,
  lastItem = false,
  onPress = () => { },
}) => {
  const styles = getStyle(viewed);
  return (
    <View style={styles.common}>
      <TouchableOpacity
        activeOpacity={TOUCHABLE_OPACITY_VALUE}
        style={
          lastItem ? styles.testCont : [styles.testCont, styles.borderBottom]
        }
        onPress={onPress}>
        <View styles={styles.content}>
          <View style={styles.historyRow}>
            <Text style={styles.date} numberOfLines={1}>
              {date_create}
            </Text>
          </View>
          <View style={styles.historyRow}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.historyRow}>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
        <View style={styles.arrow}>
          <Icon name="arrow-back" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const getStyle = viewed =>
  RNStyles.create({
    common: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#fff',
    },
    testCont: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: '#CBCBCB',
      paddingVertical: 8,
      paddingHorizontal: 8,
      backgroundColor: !viewed ? '#F3F3F3' : 'transparent',
    },
    borderBottom: {
      borderBottomWidth: 1,
    },
    historyRow: {
      width: `${screenWidth - 48}`,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginVertical: 4,
    },
    historyKey: {
      fontSize: 20,
      lineHeight: 22,
      marginRight: 16,
      fontWeight: 'bold',
      color: colors.black,
    },
    title: {
      fontFamily: fonts.heading,
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 22,
      color: colors.black,
    },
    message: {
      fontFamily: fonts.primaryRegular,
      fontSize: 16,
      lineHeight: 20,
      color: colors.black,
    },
    containerTouch: {
      width: 20,
      alignItems: 'center',
      marginHorizontal: 8,
    },
    date: {
      fontSize: 12,
      fontFamily: fonts.primaryRegular,
      color: '#ADADAD',
    },
    arrow: {
      paddingHorizontal: 8,
      transform: [{ rotate: '180deg' }],
    },
  });

export default NotificationItem;
