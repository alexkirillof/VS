import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNStyles from '@tapston/react-native-styles';
import {Button, Input, Select} from '../../components';
import {colors, screenWidth, ImagesDefault, fonts} from '../../styles';
import moment from 'moment';
import 'moment/locale/ru';
import Barcode from '@kichiyaki/react-native-barcode-generator';
moment.locale('ru');

const LoyaltyCardView = props => {
  console.log('PRP', props);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      style={styles.content}>
      <ScrollView contentContainerStyle={styles.srollView}>
        {props.addVirtualCard && !props.loading ? (
          <View>
            {Object.keys(props.addCardFields)?.map(field => {
              const currentField = props.addCardFields[field];
              if (currentField.type === 'date') {
                return (
                  <View style={styles.container}>
                    <Text style={styles.title}>{currentField.name}</Text>
                    <View style={styles.inputWithout}>
                      <TouchableOpacity onPress={props.showDatePicker}>
                        <Text style={styles.dateText}>
                          {props.cardProps[field]
                            ? props.cardProps[field]
                            : 'Выберите дату'}
                        </Text>
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={props.pickerMode}
                        mode="date"
                        display="spinner"
                        headerTextIOS={'Выберите дату'}
                        confirmTextIOS={'Сохранить'}
                        cancelTextIOS={'Отменить'}
                        value={
                          props.cardProps[field]
                            ? moment(
                                props.cardProps[field],
                                'DD.MM.YYYY',
                              ).toDate()
                            : moment().toDate()
                        }
                        maximumDate={moment().add(-13, 'years').toDate()}
                        onConfirm={date => props.handleConfirm(field, date)}
                        onCancel={props.hideDatePicker}
                      />
                    </View>
                  </View>
                );
              } else if (currentField.type === 'list') {
                const list = currentField.list.map(item => ({
                  label: item,
                  value: item,
                }));

                return (
                  <Select
                    title={currentField.name}
                    list={list}
                    selected={props.cardProps[field]}
                    onChangeSelect={value =>
                      props.setCardProps({
                        ...props.cardProps,
                        [field]: value,
                      })
                    }
                  />
                );
              } else if (currentField.type === 'phone') {
                return (
                  <Input
                    enablesReturnKeyAutomatically={true}
                    returnKeyType={'next'}
                    title="Номер телефона"
                    placeholder="+7 (999) 999-99-99"
                    keyboardType="number-pad"
                    mask={'custom'}
                    options={{
                      mask: '+7 (999) 999 99 99',
                      getRawValue: function (value, settings) {
                        return value
                          .replace('+7', '8')
                          .replace(/\s|\(|\)/g, '');
                      },
                    }}
                    value={props.cardProps[field]}
                    image={false}
                    onChangeText={text =>
                      props.setCardProps({
                        ...props.cardProps,
                        [field]: text,
                      })
                    }
                  />
                );
              } else {
                return (
                  <Input
                    title={currentField.name}
                    placeholder={currentField.value}
                    value={props.cardProps[field]}
                    image={false}
                    onChangeText={text =>
                      props.setCardProps({
                        ...props.cardProps,
                        [field]: text,
                      })
                    }
                  />
                );
              }
            })}
            <Button
              value="Выпустить карту"
              disabled={
                !props.cardProps.birthday ||
                Object.keys(props.addCardFields).length !==
                  Object.keys(props.cardProps).length
              }
              loading={props.loading}
              onPress={props.addNewCard}
            />
            <View style={{marginBottom: 40}} />
          </View>
        ) : props.addCard || props.cardNumber !== '' ? (
          <ImageBackground
            source={ImagesDefault.LoyaltyBg}
            resizeMode="cover"
            style={styles.imageBg}>
            <View style={styles.barCodeContainer}>
              <Barcode
                format="CODE128B"
                value={props.cardNumber}
                text={props.cardNumber}
                width={screenWidth - 16}
                height={120}
                maxWidth={screenWidth - 16}
              />
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.noContent}>
            <FastImage
              source={ImagesDefault.noLoyalty}
              style={styles.image}
              resizeMode={'contain'}
            />
            <View style={styles.cardText}>
              <View style={styles.textRow}>
                <Text style={styles.text}>
                  После добавления карты вам станет доступна спеццена на товары
                  Цена по карте.
                </Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.text}>
                  Также вы сможете участвовать в розыгрышах и акциях магазина
                  Винный склад.
                </Text>
              </View>
            </View>
            <Button
              style={styles.newCard}
              color="secondary"
              value="Выпустить виртуальную карту"
              onPress={props.getCardFormFields}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = RNStyles.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  srollView: {
    flexGrow: 1,
    paddingHorizontal: 8,
  },
  noContent: {
    marginTop: 64,
    marginBottom: 24,
  },
  image: {
    height: `${screenWidth / 1.5}`,
    width: '100%',
  },
  imageBg: {
    flex: 1,
    justifyContent: 'center',
  },
  barCodeContainer: {
    paddingVertical: 20,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: colors.gray,
    backgroundColor: colors.white,
  },
  cardText: {
    marginTop: 54,
    marginBottom: 24,
  },
  textRow: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  text: {
    textAlign: 'left',
    fontSize: 18,
    marginVertical: 16,
  },
  wrapper: {
    paddingVertical: 8,
  },
  newCard: {
    marginBottom: 24,
  },
  container: {
    flexDirection: 'column',
    marginVertical: 12,
  },
  inputWithout: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#dedce4',
    padding: 16,
    fontSize: 18,
    width: '100%',
    color: colors.black,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 2.5,
  },
});

export default LoyaltyCardView;
