import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {colors, fontWeight, screenWidth} from '../styles';
import Icon from './icon';
import {HIT_SLOP, TOUCHABLE_OPACITY_VALUE} from '../core/configs';
/**
 * модальный попап
 * @prop {function} onRequestClose - функция закрытия модалки
 * @prop {string} title - заголовок(название магазина)
 */
const ModalPopup = props => {
  return (
    <Modal
      onRequestClose={() =>
        props.onRequestClose ? props.onRequestClose() : null
      }
      animationType="fade"
      transparent>
      <View style={styles.popupContainer}>
        <TouchableOpacity
          hitSlop={HIT_SLOP}
          activeOpacity={TOUCHABLE_OPACITY_VALUE}
          style={{flex: 1, zIndex: -1}}
          onPress={() => (props.onRequestClose ? props.onRequestClose() : null)}
        />
        <View style={styles.popup}>
          <View style={styles.close}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity
              onPress={() =>
                props.onRequestClose ? props.onRequestClose() : null
              }
              hitSlop={HIT_SLOP}
              activeOpacity={TOUCHABLE_OPACITY_VALUE}
              style={styles.closeButton}>
              <Icon name="close" />
            </TouchableOpacity>
          </View>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const styles = RNStyles.create({
  popupContainer: {
    backgroundColor: colors.modalBackground.black,
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: -1,
  },
  popup: {
    width: `${screenWidth}`,
    height: '100%',
    top: 0,
    position: 'absolute',
    backgroundColor: '#f1f2f2',
  },
  title: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: fontWeight.bold,
    color: colors.text.black,
  },
  close: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    width: 18,
    height: 18,
    position: 'absolute',
    right: 12,
    top: 8,
  },
});

export default ModalPopup;
