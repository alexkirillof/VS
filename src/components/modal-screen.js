import React from 'react';
import {View, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {fontWeight, colors} from '../styles';

/**
 * Component ModalScreen
 * @prop {string} name - название иконки
 * @prop {string} smile - смайл
 * @prop {string} boldWord - Жирный шрифт
 * @prop {string} text - основной текст
 * @prop {string} textButton - текст кнопки
 * @prop {function} onPress - функция на кнопку
 * @prop {boolean} loading - показать ли лоадер вместо кнопки
 */
const ModalScreen = props => {
  return (
    <View style={styles.common}>
      {/* <View style={styles.containerIcon}>
        <Icon name={props.name} />
      </View> */}
      <View style={styles.containerText}>
        <Text>{props.smile ? props.smile : ''}</Text>
        <View>
          <Text style={[styles.message, styles.boldWord]}>
            {props.boldWord ? props.boldWord : ''}
          </Text>
          <Text style={styles.message}>{props.text}</Text>
        </View>
      </View>
      {/* <View style={styles.buttonCont}>
        {props.loading ? (
          <PreloaderFullscreen />
        ) : (
          <Button
            text={props.textButton ? props.textButton : 'На главную'}
            onPress={() => props.onPress()}
          />
        )}
      </View> */}
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 70,
  },
  containerIcon: {
    marginTop: 66,
    alignItems: 'center',
  },
  containerText: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: colors.text.black,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 4,
  },
  boldWord: {
    fontWeight: fontWeight.bold,
  },
  buttonCont: {
    marginTop: 26,
  },
});

export default ModalScreen;
