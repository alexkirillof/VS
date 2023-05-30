import React, {useState} from 'react';
import {View, Text, Modal} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {useDispatch} from 'react-redux';
import {setAdult} from '../store/reducers/user';
import Button from './button';
import Icon from './icon';

import {colors, fonts, screenWidth} from '../styles';

/**
 * Component Notification
 * @prop {string} type - тип модалки
 * @prop {function} close - функция закрытия нотификации
 * @prop {string} buttonText - текст кнопки
 */
const Notification = props => {
  const dispatch = useDispatch();

  const [reject, setReject] = useState(false);

  const styles = getStyle(props.type);
  const render = () => {
    switch (props.type) {
      case 'alcohol':
        return (
          <View>
            <View style={styles.adultIcon}>
              <Icon name="adult" />
            </View>
            <View style={styles.subscribeCont}>
              <Text style={[styles.textCont, styles.boldText]}>
                {!reject
                  ? 'Вам уже \n исполнилось 18 лет?'
                  : 'Мы заботимся о здоровье будущего поколения, поэтому не демонстрируем алкоголь и сигареты лицам младше 18 лет.'}
              </Text>
            </View>
            {!reject && (
              <View style={styles.footer}>
                <Button
                  style={styles.button}
                  value={'Да'}
                  onPress={() => dispatch(setAdult(true))}
                />
                <Button
                  style={[styles.button, {marginLeft: 8}]}
                  value={'Нет'}
                  onPress={() => {
                    dispatch(setAdult(false));
                    setReject(true);
                  }}
                />
              </View>
            )}
          </View>
        );
    }
  };
  return (
    <Modal transparent vesible animationType="fade">
      <View style={styles.common}>
        <View
          style={
            props.type === 'contact'
              ? [styles.container, styles.checNot]
              : styles.container
          }>
          {render()}
        </View>
      </View>
    </Modal>
  );
};

const getStyle = type =>
  RNStyles.create({
    common: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: colors.modalBackground.black,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    container: {
      paddingVertical: 32,
      paddingHorizontal: 16,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      borderRadius: 20,
    },
    checNot: {
      height: 430,
    },
    textCont: {
      textAlign: 'center',
      fontSize: 24,
      lineHeight: 26,
      color: colors.primaryBlack,
    },
    borderTest: {
      borderTopWidth: 0.5,
      borderColor: colors.modalBackground.black,
      width: '100%',
      marginTop: 32,
      height: 'auto',
    },
    subscribeCont: {
      paddingHorizontal: 20,
      alignItems: 'center',
      marginBottom: 32,
      '@media (max-height: 568)': {
        marginBottom: 12,
      },
    },
    boldText: {
      fontFamily: fonts.primaryRegular,
      color: colors.black,
    },
    adultIcon: {
      height: 124,
      marginBottom: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    smallText: {
      textAlign: 'center',
      fontSize: 14,
      lineHeight: 16,
      color: colors.black,
      marginTop: 8,
    },
    button: {
      width: `${screenWidth / 2 - 42}`,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

export default Notification;
