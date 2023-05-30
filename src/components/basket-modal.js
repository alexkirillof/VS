import React from 'react';
import {Text, TouchableOpacity, View, Modal, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNStyles from '@tapston/react-native-styles';

import {colors, fontWeight} from '../styles';

/**
 * Модалка подтверждения очистки корзины
 * @prop {boolean} visible - видимость модалки
 * @prop {function} clearBasket - функция срабатывающая при подтверждении очистки корзины
 * @prop {function} cancel - функция срабатывающая при отмене очистки корзины
 */
const BasketModal = ({visible = false, clearBasket, cancel}) => {
  return (
    <Modal visible transparent>
      <StatusBar
        backgroundColor={colors.modalBackground.black}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.common}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={clearBasket}
            style={[styles.button, styles.buttonClear]}>
            <Text style={styles.redText}>Очистить корзину</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={cancel}
            style={[styles.button, styles.buttonCancel]}>
            <Text style={styles.blueText}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 14,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonClear: {
    backgroundColor: colors.background.white,
  },
  buttonCancel: {
    backgroundColor: colors.background.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.modalBackground.black,
  },
  blueText: {
    fontSize: 16,
    color: colors.text.blue,
    fontWeight: fontWeight.bold,
  },
  redText: {
    fontSize: 16,
    color: colors.text.red,
  },
});

export default BasketModal;
