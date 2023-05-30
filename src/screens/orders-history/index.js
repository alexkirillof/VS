import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiPostPublic } from '../../core/api';

import OrdersHistoryView from './orders-history-view';

const OrdersHistoryContainer = props => {
  const { sessid, hash } = useSelector(state => state.user);

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    setLoading(true);
    apiPostPublic('/user/history', {
      sessid: sessid,
      hash: hash,
      data: {
        filter: 'all',
        pageSize: 50,
        pageNum: 1,
      },
    }).then(res => {
      if (res !== 'ERROR') {
        setOrders(res.data.orders);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <OrdersHistoryView
      setLoading={setLoading}
      orders={orders}
      loading={loading}
      getOrders={getOrders}
      navigation={props.navigation}
    />
  );
};

export default OrdersHistoryContainer;
