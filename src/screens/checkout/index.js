import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {clearBasketValue} from '../../store/reducers/basket';
import {PreloaderFullscreen} from '../../components';
import {useRoute, CommonActions} from '@react-navigation/native';
import {apiPostPublic} from '../../core/api';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

import CheckoutView from './checkout-view';

const CheckoutContainer = props => {
  const phoneInput = useRef(null);
  const route = useRoute();
  const dispatch = useDispatch();

  const today = moment().format('DD.MM.YYYY');
  const tommorow = moment().add(1, 'days').format('DD.MM.YYYY');

  const {shop, data, sessid, deliveryType, deliveryId, deliveryAddress, hash} =
    useSelector(state => state.user);

  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [expressDelivery, setExpressDelivery] = useState(false);
  const [expressDeliveryText, setExpressDeliveryText] = useState('');
  const [selectedExpressDelivery, setSelectedExpressDelivery] = useState(false);
  const [payment, setPayment] = useState(0);
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState(today);
  const [avaliableTime, setAvaliableTime] = useState([]);
  const [orders, setOrders] = useState([]);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [selectedTime, setSelectTime] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(data.phone);
  const [userName, setName] = useState(data.name);
  const [lastname, setLastname] = useState(data.lastname);
  const [email, setEmail] = useState(data.email);
  const [paymentWindow, setPaymentWindow] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const checkoutParams = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }

    apiPostPublic('/checkout/params/', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        payment_type: 'offline',
        props: {
          DELIVERY_DATE: date,
          EXPRESS_DELIVERY: 'N',
        },
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        if (res.data.props.DELIVERY_TIME) {
          setAvaliableTime(res.data.props.DELIVERY_TIME.VALUES);
          setMinDate(
            moment(
              res.data.props.DELIVERY_DATE.VALUE_MIN,
              'DD.MM.YYYY',
            ).format(),
          );
          setMaxDate(
            moment(
              res.data.props.DELIVERY_DATE.VALUE_MAX,
              'DD.MM.YYYY',
            ).format(),
          );
        } else {
          setSelectedExpressDelivery(true);
          setPayment(1);
        }
        if (res.data.props.EXPRESS_DELIVERY) {
          setExpressDelivery(true);
          setExpressDeliveryText(res.data.props.EXPRESS_DELIVERY.NAME);
        }
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert('Ошибка', res.message);
      }
    });
  };

  const checkout = () => {
    if (selectedExpressDelivery) {
      handleOrder();
    } else if (selectedTime) {
      handleOrder();
    } else {
      Alert.alert('Ошибка', 'Укажите время доставки');
    }
  };

  const handleOrder = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/checkout', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        payment_type: payment === 0 ? 'offline' : 'online',
        props: {
          NAME: userName + ' ' + lastname,
          PHONE: phoneNumber,
          EMAIL: email,
          DELIVERY_DATE: date,
          DELIVERY_TIME: selectedTime,
          EXPRESS_DELIVERY: selectedExpressDelivery ? 'Y' : 'N',
        },
        comment: comment,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setOrders(res.data.orders);
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
        Alert.alert('Ошибка', res.message);
      }
    });
  };

  const handleClose = () => {
    setSuccess(false);
    dispatch(clearBasketValue());
    setPaymentUrl(null);
    setPaymentWindow(false);
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'MainStack', params: {screen: 'TabHome'}}],
      }),
    );
  };

  const handlePayment = paymentObject => {
    setPaymentUrl(paymentObject.action_url);
    setPaymentWindow(true);
  };

  const handleWebViewNavigationStateChange = newNavState => {
    const {url} = newNavState;

    if (url.includes('success.php?')) {
      handleClose();
    }
  };

  useEffect(() => {
    checkoutParams();
  }, [date]);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <CheckoutView
      shop={shop}
      navigation={props.navigation}
      handleClose={handleClose}
      handlePayment={handlePayment}
      handleWebViewNavigationStateChange={handleWebViewNavigationStateChange}
      paymentWindow={paymentWindow}
      paymentUrl={paymentUrl}
      date={date}
      delivery={route.params.delivery}
      deliveryId={deliveryId}
      deliveryAddress={deliveryAddress}
      setDate={setDate}
      selectedTime={selectedTime}
      setSelectTime={setSelectTime}
      phoneInput={phoneInput}
      payment={payment}
      orders={orders}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      userName={userName}
      setName={setName}
      lastname={lastname}
      setLastname={setLastname}
      email={email}
      setEmail={setEmail}
      comment={comment}
      setComment={setComment}
      expressDelivery={expressDelivery}
      expressDeliveryText={expressDeliveryText}
      setSelectedExpressDelivery={setSelectedExpressDelivery}
      selectedExpressDelivery={selectedExpressDelivery}
      success={success}
      setSuccess={setSuccess}
      setPayment={setPayment}
      checkout={checkout}
      avaliableTime={avaliableTime}
      maxDate={maxDate}
      minDate={minDate}
      today={today}
      tommorow={tommorow}
    />
  );
};

export default CheckoutContainer;
