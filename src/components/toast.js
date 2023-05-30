import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {useSelector, useDispatch} from 'react-redux';

import {setBasketToastOpen} from '../store/reducers/user';
import {colors} from '../styles';
import {TOUCHABLE_OPACITY_VALUE, HIT_SLOP} from '../core/configs';

/**
 * Component Toast -> для уведомлений
 * @prop {string} message - сообщение
 * @prop {string} actionTitle - название события
 * @prop {function} action - событие
 */
const Toast = props => {
  const {basketToastOpen} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (basketToastOpen) {
      setTimeout(() => {
        dispatch(setBasketToastOpen(false));
      }, 3000);
    }
  }, [basketToastOpen]);

  if (basketToastOpen) {
    return null;
  }
  return (
    <View style={[styles.container]}>
      <View style={styles.block}>
        <Text style={styles.message}>{props.message || 'Сообщение'}</Text>
        <TouchableOpacity
          hitSlop={HIT_SLOP}
          activeOpacity={TOUCHABLE_OPACITY_VALUE}
          style={styles.action}
          onPress={() => {
            if (props.action && typeof props.action === 'function') {
              props.action();
            }
          }}>
          <Text style={styles.actionText}>
            {props.actionTitle || 'Событие'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    width: '100%',
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: 74,
    zIndex: 1000,
  },
  block: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 6,
    '@media ios': {
      shadowColor: colors.black,
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    '@media android': {
      elevation: 4,
    },
  },
  message: {
    flex: 3,
    fontSize: 14,
    lineHeight: 16,
    color: colors.white,
    textAlign: 'left',
  },
  action: {
    flex: 1,
    marginRight: 20,
  },
  actionText: {
    color: colors.white,
    textAlign: 'right',
    paddingVertical: 4,
  },
});

export default Toast;
