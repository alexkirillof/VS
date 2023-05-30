import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {apiPostPublic} from '../../core/api';

import OrderView from './order-view';
import {Alert} from 'react-native';

const OrderContainer = props => {
  const {sessid, hash} = useSelector(state => state.user);
  const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [paymentWindow, setPaymentWindow] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const getOrder = () => {
    setLoading(true);
    apiPostPublic(`/user/history/detail/${route.params.orderId}`, {
      sessid: sessid,
      hash: hash,
      data: {},
    }).then(res => {
      if (res !== 'ERROR') {
        setOrder(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert('Ошибка', res.message);
      }
    });
  };

  const handlePayment = () => {
    setLoading(true);
    apiPostPublic(`/user/history/paylink/${route.params.orderId}`, {
      sessid: sessid,
      hash: hash,
      data: {},
    }).then(res => {
      console.log('RE', res);
      if (res !== 'ERROR') {
        setPaymentUrl(res.data.url);
        setPaymentWindow(true);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert('Ошибка', res.message);
      }
    });
  };

  const handleWebViewNavigationStateChange = newNavState => {
    const {url} = newNavState;

    if (url.includes('success.php?')) {
      getOrder();
      handleClose();
    }
  };

  const handleClose = () => {
    setPaymentWindow(false);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <OrderView
      setLoading={setLoading}
      order={order}
      loading={loading}
      navigation={props.navigation}
      handlePayment={handlePayment}
      paymentWindow={paymentWindow}
      handleClose={handleClose}
      handleWebViewNavigationStateChange={handleWebViewNavigationStateChange}
      paymentUrl={paymentUrl}
    />
  );
};

export default OrderContainer;
