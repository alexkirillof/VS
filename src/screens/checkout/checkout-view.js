import React from 'react';
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import WebView from 'react-native-webview';
import {Button, Icon, ModalPopup, Input} from '../../components';
import {screenWidth, colors, fonts} from '../../styles';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const CheckoutView = (props, {phoneInput}) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
        keyboardVerticalOffset={120}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.deliveryType}>
            <View style={styles.deliveryAddress}>
              {props.shop ? (
                <View>
                  <Text style={styles.deliveryTypeText}>{props.shop.name}</Text>
                  <View style={styles.deliveryLine}>
                    <Icon name="time" />
                    <Text style={styles.deliveryTime}>
                      {props.shop.schedule}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.deliveryTypeText}>
                    {props.deliveryAddress !== ''
                      ? props.deliveryAddress
                      : 'Выберите магазин'}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.selectDateContainer}>
              <View>
                <Text style={styles.inputTitle}>Выберите день</Text>
              </View>
              <View style={styles.selectDayContainer}>
                <TouchableOpacity
                  style={[
                    styles.selectDay,
                    props.date === props.today && styles.activeDay,
                  ]}
                  onPress={() => {
                    props.setDate(props.today);
                  }}>
                  <Text
                    style={[
                      styles.selectDayText,
                      props.date === props.today && styles.activeDayText,
                    ]}>
                    Сегодня
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.selectDay,
                    props.date === props.tommorow && styles.activeDay,
                  ]}
                  onPress={() => {
                    props.setDate(props.tommorow);
                  }}>
                  <Text
                    style={[
                      styles.selectDayText,
                      props.date === props.tommorow && styles.activeDayText,
                    ]}>
                    Завтра
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.selectedDate}>{props.date}</Text>
            </View>
            <View>
              <View>
                <Text style={styles.inputTitle}>Выберите время</Text>
              </View>
              <View style={styles.selectTime}>
                {props.avaliableTime.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.time,
                      props.selectedTime === item && styles.timeSelected,
                    ]}
                    onPress={() => props.setSelectTime(item)}>
                    <Text
                      style={[
                        styles.dateTimeText,
                        props.selectedTime === item && styles.timeSelected,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Input
              title="Имя Фамилия"
              placeholder="Имя Фамилия"
              value={props.userName}
              image={false}
              onChangeText={text => props.setName(text)}
            />
            <Input
              editable={false}
              title="Номер телефона"
              placeholder="+7 (999) 999-99-99"
              keyboardType="number-pad"
              setRef={ref => (phoneInput = ref)}
              mask={'custom'}
              options={{
                mask: '+7 (999) 999 99 99',
                getRawValue: function (value, settings) {
                  return value.replace('+7', '8').replace(/\s|\(|\)/g, '');
                },
              }}
              value={props.phoneNumber}
              image={false}
              onChangeText={text => {
                props.setPhoneNumber(text);
              }}
            />
            <Input
              title="Email"
              placeholder="email@vliga.com"
              value={props.email}
              image={false}
              onChangeText={text => props.setEmail(text)}
            />
            <TextInput
              style={styles.textArea}
              onChangeText={props.setComment}
              value={props.comment}
              underlineColorAndroid="transparent"
              placeholder="Комментарий к заказу"
              placeholderTextColor="#bfbfbf"
              numberOfLines={10}
              multiline={true}
            />
          </View>
          <Button
            value="Оформить заказ"
            onPress={() => {
              props.checkout();
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {props.success ? (
        <ModalPopup
          top={10}
          onRequestClose={() => props.handleClose()}
          children={
            <View style={styles.modalSucessContent}>
              <View style={styles.successIcon}>
                <Icon name={'success'} />
              </View>
              <Text style={styles.titleSuccess}>Ваш заказ принят</Text>
              <Text style={styles.textSuccess}>
                Ожидайте уведомление о готовности заказа
              </Text>
              <Text style={styles.ordersTitleText}>
                {props.orders.length === 1
                  ? 'Ваш номер заказа:'
                  : 'Ваши номера заказов:'}
              </Text>
              {props.orders.map(order => (
                <View key={order.account_number}>
                  <Text style={styles.ordersText}>
                    {order.account_number}
                    {'\n'}
                    {order.order_type_text}
                  </Text>
                  {order.payment.is_online ? (
                    <Button
                      style={styles.button}
                      color="secondary"
                      onPress={() => props.handlePayment(order.payment)}
                      value="Оплатить"
                    />
                  ) : (
                    <Button
                      style={styles.button}
                      color="secondary"
                      onPress={() => props.handleClose()}
                      value="Продолжить покупки"
                    />
                  )}
                </View>
              ))}
            </View>
          }
        />
      ) : null}
      {props.paymentWindow ? (
        <ModalPopup
          top={10}
          onRequestClose={() => props.handleClose()}
          children={
            <WebView
              source={{uri: props.paymentUrl}}
              style={styles.webViewStyle}
              onNavigationStateChange={newNavState =>
                props.handleWebViewNavigationStateChange(newNavState)
              }
            />
          }
        />
      ) : null}
    </>
  );
};

const styles = RNStyles.create({
  content: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  noContent: {
    marginTop: 124,
    paddingHorizontal: 8,
  },
  image: {
    height: `${screenWidth / 1.8}`,
    width: '100%',
  },
  inputTitle: {
    fontFamily: fonts.heading,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 24,
    color: colors.black,
    marginVertical: 8,
  },
  inputTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '400',
    marginBottom: 12,
    marginTop: 8,
    marginLeft: 12,
  },
  deliveryType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deliveryAddress: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'column',
    backgroundColor: colors.gray,
  },
  deliveryTypeTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
    color: colors.black,
  },
  deliveryLine: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  deliveryTypeText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 6,
  },
  deliveryTime: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.lightGray,
    marginLeft: 8,
  },
  arrow: {
    width: 24,
    marginRight: 16,
  },
  textContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  textArea: {
    fontFamily: fonts.primaryRegular,
    fontWeight: '400',
    borderColor: '#dedce4',
    color: colors.black,
    borderWidth: 1,
    padding: 16,
    borderRadius: 6,
    height: 120,
    fontSize: 16,
    lineHeight: 24,
    justifyContent: 'flex-start',
  },
  button: {
    width: `${screenWidth - 32}`,
  },
  time: {
    width: `${screenWidth / 4 - 16}`,
    alignItems: 'center',
    fontFamily: fonts.primaryRegular,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 22,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.primary,
    margin: 4,
  },
  dateText: {
    fontFamily: fonts.primaryRegular,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 20,
    color: colors.white,
  },
  dateContainer: {
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.primary,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: colors.primary,
    color: colors.white,
  },
  dateTimeText: {
    color: colors.black,
  },
  timeSelected: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  selectTime: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  modalSucessContent: {
    marginTop: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 36,
  },
  successIcon: {
    marginBottom: 48,
  },
  titleSuccess: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  ordersTitleText: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  ordersText: {
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 16,
  },
  textSuccess: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 16,
    color: colors.primary,
    textAlign: 'center',
  },
  webViewStyle: {
    marginTop: 20,
    zIndex: -1,
  },
  selectDateContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  selectDayContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  selectDay: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    marginRight: 8,
  },
  activeDay: {
    backgroundColor: colors.primary,
  },
  selectDayText: {
    color: colors.primary,
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
  },
  activeDayText: {
    color: colors.white,
  },
  selectedDate: {
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
  },
});

export default CheckoutView;
