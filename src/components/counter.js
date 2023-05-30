import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {colors, fontWeight} from '../styles';
import Icon from './icon';
import Button from './button';

/**
 * Component counter - счетчик количества товаров (Удаление - счетчик - Добавить)
 * @prop {number} startCount -  начальное значение,
 * @prop {string} type - стиль кнопки
 * @prop {function} onChange - возвращает текущее значение
 * @prop {boolean} closeCount
 * @prop {function} changeOpen - колбэк срабатывающий при изменении состояния, возвращающий текущее состояние компоненат
 */
const Counter = ({
  id = null,
  size = null,
  onChange,
  startCount = 0,
  step = 1,
  maxStep = 100,
  type = 'default',
  setOpenCounterId = () => {},
  widthOutRightPadding,
  openCounterId = null,
  editCountStyle,
}) => {
  const isOpen = openCounterId && openCounterId === id;
  const [count, setCount] = useState(startCount);
  const styles = getStyles(type, isOpen, widthOutRightPadding);

  useEffect(() => {
    setCount(startCount);
  }, [startCount]);

  return (
    <View style={styles.counter}>
      {count > 0 && (
        <View style={{...styles.animatedView}}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => {
              count === step && setOpenCounterId(null);
              setCount(count - step);
              onChange(count - step);
            }}
            style={[styles.button, styles.buttonLeft]}>
            <Icon name={'minus'} fill={colors.primary} />
          </TouchableOpacity>
          <View style={[styles.editCount, editCountStyle]}>
            <Text style={styles.editCountText}>
              {Number.isInteger(count) ? count : parseFloat(count).toFixed(1)}
            </Text>
            {size ? <Text style={styles.editCountSize}>{size}</Text> : null}
          </View>
          <TouchableOpacity
            delayPressIn={0}
            disabled={count === parseFloat(maxStep).toFixed(1)}
            onPress={() => {
              if (isOpen) {
                if (count < parseFloat(maxStep).toFixed(1)) {
                  setCount(count + step);
                  onChange(count + step);
                } else {
                  setOpenCounterId(null);
                  Alert.alert(
                    'Информация',
                    'Добавлено максимальное количество товаров.',
                  );
                }
              } else {
                setOpenCounterId(id);
                count === 0 && setCount(step);
                count === 0 && onChange(step);
              }
            }}
            style={[styles.button, styles.buttonLeft]}>
            <View style={[styles.icon]}>
              <Icon name={'plus'} fill={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      )}
      {count === 0 && (
        <Button
          width="full"
          delayPressIn={0}
          value="Добавить в корзину"
          onPress={() => {
            if (isOpen) {
              if (count < parseFloat(maxStep).toFixed(1)) {
                setCount(count + step);
                onChange(count + step);
              } else {
                setOpenCounterId(null);
                Alert.alert(
                  'Информация',
                  'Добавлено максимальное количество товаров.',
                );
              }
            } else {
              setOpenCounterId(id);
              count === 0 && setCount(step);
              count === 0 && onChange(step);
            }
          }}
        />
      )}
    </View>
  );
};

const getStyles = (type, isOpen, widthOutRightPadding) =>
  RNStyles.create({
    animatedView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 6,
      width: '100%',
    },
    counter: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    editCount: {
      flexDirection: 'row',
      width: 40,
      height: 42,
      alignItems: 'center',
      justifyContent: 'center',
    },
    countText: {
      fontSize: 20,
      lineHeight: 22,
      color: colors.black,
      fontWeight: fontWeight.bold,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    countSize: {
      fontSize: 16,
      lineHeight: 22,
      textAlign: 'center',
      color: colors.black,
      fontWeight: fontWeight.bold,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    },
    editCountText: {
      fontSize: 20,
      lineHeight: 24,
      textAlign: 'center',
      color: colors.black,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    },
    editCountSize: {
      fontSize: 20,
      lineHeight: 24,
      textAlign: 'center',
      color: colors.black,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    },
    button: {
      width: 42,
      height: 42,
      alignItems: 'center',
      justifyContent: 'center',
      '@media (max-height: 568)': {
        width: 36,
        height: 36,
      },
    },
  });

export default Counter;
