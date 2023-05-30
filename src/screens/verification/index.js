import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Sentry from '@sentry/react-native';
import {
  setUserData,
  setNotifications,
  setLoyaltyCard,
} from '../../store/reducers/user';
import {setBasketValue, setBasketLength} from '../../store/reducers/basket';
import {addFavorite} from '../../store/reducers/user';
import {PreloaderFullscreen} from '../../components';
import {apiPostPublic} from '../../core/api';

import VerificationScreenView from './verification-screen-view';

let interval;
let maxIntervalDate;

const VerificationContainer = props => {
  const {phone, pinCode} = props.route.params;
  const {sessid, deliveryType, deliveryId, shop} = useSelector(
    state => state.user,
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [code, setCode] = useState(null);
  const [filled, setFilled] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [timer, setTimer] = useState(120);
  const [showTimer, setShowTimer] = useState(true);

  const handleUserData = hashId => {
    try {
      apiPostPublic('/user', {
        sessid: sessid,
        hash: hashId,
        data: {},
      }).then(async res => {
        if (res.data) {
          Sentry.setUser(res.data);
          dispatch(setUserData(res.data, res.sessid, res.hash));
          dispatch(setLoyaltyCard(res.data?.loyaltyCard?.number));
          getNotificationsCount();
          getBasket(res.hash);
          getFavorites(res.hash);
          await props.navigation.navigate('MainStack', {
            screen: 'TabHome',
          });
          setLoading(false);
        } else {
          Alert.alert('Ошибка', res.message);
          setLoading(false);
        }
      });
    } catch (err) {
      Alert.alert('Ошибка', err);
      setLoading(false);
    }
  };

  const getNotificationsCount = hash => {
    try {
      apiPostPublic('/user/notifications/', {
        sessid: sessid,
        hash: hash,
        data: {
          filter: 'not_viewed',
          pageSize: 1,
          pageNum: 1,
        },
      }).then(res => {
        if (res) {
          dispatch(setNotifications(res.data?.quantity.not_viewed));
        }
      });
    } catch (err) {
      Alert.alert('Ошибка', err);
    }
  };

  const getBasket = hash => {
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
        dispatch(setBasketLength(res.totals?.quantity));
        dispatch(setBasketValue(res));
      } else {
        console.log('warn', res.message);
      }
    });
  };

  const getFavorites = hash => {
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
      if (res.type !== 'ERROR') {
        res.products.map(el => dispatch(addFavorite(el.id)));
      }
    });
  };

  const handleCheckCode = () => {
    setLoadingButton(true);
    try {
      apiPostPublic('/verification', {
        sessid: sessid,
        data: {
          phone: phone,
          message: code,
        },
      }).then(res => {
        if (res?.type === 'SUCCESS') {
          handleUserData(res.hash);
        } else {
          Alert.alert(res.message);
        }
        setLoadingButton(false);
      });
    } catch (err) {
      setLoadingButton(false);
      Alert.alert('Ошибка', err);
    }
  };

  const resendCode = () => {
    setLoading(true);
    try {
      apiPostPublic('/auth', {
        sessid: sessid,
        data: {
          phone: phone,
        },
      }).then(res => {
        if (res.type === 'NOAUTH') {
          setShowTimer(true);
          startTimer();
        } else {
          Alert.alert('Ошибка', res.message);
        }
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      Alert.alert('Ошибка', err);
    }
  };

  const stopTimer = () => {
    clearInterval(interval);
    setDisableButton(false);
    setShowTimer(false);
  };

  const startTimer = () => {
    const iterationsCount = 120;

    setDisableButton(true);
    setShowTimer(true);
    setTimer(iterationsCount);

    maxIntervalDate =
      Math.floor(new Date().getTime() / 1000 + iterationsCount) + 1;

    interval = setInterval(() => {
      let n = Math.floor(maxIntervalDate - new Date().getTime() / 1000);

      if (n > 0) {
        setTimer(old => {
          if (old === 0) {
            stopTimer();
            setShowTimer(false);
          } else {
            return n;
          }
        });
      } else {
        stopTimer();
        setShowTimer(false);
      }
    }, 1000);
  };

  useEffect(() => {
    if (__DEV__) {
      setCode(pinCode);
      setFilled(true);
    }
    startTimer();
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <VerificationScreenView
      navigation={props.navigation}
      route={props.route}
      loading={loading}
      loadingButton={loadingButton}
      phone={phone}
      code={code}
      setCode={setCode}
      resendCode={resendCode}
      handleCheckCode={handleCheckCode}
      disableButton={disableButton}
      filled={filled}
      setFilled={setFilled}
      showTimer={showTimer}
      timer={timer}
    />
  );
};

export default VerificationContainer;
