import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import NavContainer from './Navigation';
import {resetFilters} from './store/reducers/filters';
import {
  clearUserData,
  setUserData,
  addFavorite,
  setLoyaltyCard,
  setNotifications,
} from './store/reducers/user';
import {setUpdateStatus} from './store/reducers/app';
import {compare} from 'compare-versions';
import {setBasketLength, setBasketValue} from './store/reducers/basket';
import {CURRENT_VERSION} from './core/configs';
import {PreloaderFullscreen} from './components';
import {Notification} from './components';
import {apiPostPublic} from './core/api';
import {activateAnalytics} from './core/utils';

const AppMiddleware = ({routingInstrumentation}) => {
  const {shop, adult, sessid, hash, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );

  const dispatch = useDispatch();
  const [loadingStartCount, setLoadingStartCount] = useState(true);

  const getBasket = () => {
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/cart', {
      sessid: sessid,
      hash: hash,
      data: dataObj,
    }).then(res => {
      if (res && res.type !== 'ERROR') {
        dispatch(setBasketLength(res.totals.quantity));
        dispatch(setBasketValue(res));
        if (!hash) {
          dispatch(setUserData(null, res.sessid, null));
        }
      } else {
        console.log('warn', res?.message);
      }
    });
  };

  const getFavorites = () => {
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/favorites', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
      },
    }).then(res => {
      if (res && res.type !== 'ERROR') {
        res.products.map(el => dispatch(addFavorite(el.id)));
      }
    });
  };

  const updateUserData = () => {
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    try {
      apiPostPublic('/user', {
        sessid: sessid,
        hash: hash,
        data: {
          ...dataObj,
        },
      }).then(res => {
        if (res.type !== 'ERROR_NOT_AUTH') {
          dispatch(setUserData(res.data, res.sessid, res.hash));
          dispatch(setLoyaltyCard(res.data?.loyaltyCard?.number));
        } else {
          dispatch(clearUserData());
          console.log('warn', res.message);
        }
      });
    } catch (err) {
      Alert.alert('Ошибка', err);
    }
  };

  const getConfig = () => {
    setLoadingStartCount(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    try {
      apiPostPublic('/getConfig', {
        sessid: sessid,
        hash: hash,
        data: {
          ...dataObj,
        },
      }).then(res => {
        if (res?.type !== 'ERROR') {
          const result = compare(CURRENT_VERSION, res.data.min_version, '<');
          dispatch(setUpdateStatus(result));
          setLoadingStartCount(false);
        } else {
          console.log('warn', res?.message);
          setLoadingStartCount(false);
        }
      });
    } catch (err) {
      setLoadingStartCount(false);
      Alert.alert('Ошибка', err);
    }
  };

  const getNotifications = () => {
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    try {
      apiPostPublic('/user/notifications/', {
        sessid: sessid,
        hash: hash,
        data: {
          filter: 'not_viewed',
          pageSize: 1,
          pageNum: 1,
          ...dataObj,
        },
      }).then(res => {
        if (res) {
          dispatch(setNotifications(res.data?.quantity?.not_viewed));
        }
      });
    } catch (err) {
      Alert.alert('Ошибка', err);
    }
  };

  useEffect(() => {
    getConfig();
    getNotifications();
    dispatch(resetFilters());
    getFavorites();
    getBasket();

    if (!hash) {
      dispatch(clearUserData());
      console.log('warn', 'Auth failed, redux cleared');
    } else {
      updateUserData();
    }

    activateAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!adult) {
    return <Notification type="alcohol" />;
  }

  return loadingStartCount ? (
    <PreloaderFullscreen />
  ) : (
    <NavContainer routingInstrumentation={routingInstrumentation} />
  );
};

export default AppMiddleware;
