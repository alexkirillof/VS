import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Sentry from '@sentry/react-native';
import {useRoute, CommonActions} from '@react-navigation/native';
import {
  clearUserData,
  setUserData,
  setLoyaltyCard,
} from '../../store/reducers/user';
import {
  clearBasketValue,
  setBasketLength,
  setBasketValue,
} from '../../store/reducers/basket';
import {apiPostPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import ProfileView from './profile-view';

const ProfileContainer = props => {
  const {
    data,
    sessid,
    hash,
    shop,
    favorites,
    deliveryType,
    deliveryId,
    notifications,
  } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const route = useRoute();
  const [loading, setLoading] = useState(true);

  const handleUserData = () => {
    setLoading(true);
    try {
      apiPostPublic('/user', {
        sessid: sessid,
        hash: hash ? hash : route.params.hash,
        data: {},
      }).then(res => {
        if (res.type === 'ERROR_NOT_AUTH') {
          Sentry.setUser(null);
          dispatch(clearUserData());
          setLoading(false);
          props.navigation.navigate('Auth');
        } else if (res.data.id) {
          Sentry.setUser(res.data);
          dispatch(setUserData(res.data, res.sessid, res.hash));
          dispatch(setLoyaltyCard(res.data?.loyaltyCard?.number));
          setLoading(false);
        } else {
          setLoading(false);
          Alert.alert('Ошибка', res.message);
        }
      });
    } catch (err) {
      setLoading(false);
      Alert.alert('Ошибка', err);
    }
  };

  const handleUserBasket = () => {
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
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
      if (res !== undefined) {
        dispatch(setBasketLength(res.totals?.quantity));
        dispatch(setBasketValue(res));
      } else {
        Alert.alert('Ошибка', res.message);
      }
    });
  };

  useEffect(() => {
    handleUserData();
  }, []);

  useEffect(() => {
    if (sessid && hash) {
      handleUserBasket();
    }
  }, [sessid, hash]);

  const signOut = () => {
    setLoading(true);
    try {
      apiPostPublic('/logout', {
        sessid: sessid,
        hash: hash,
        data: {},
      }).then(res => {
        if (res.type === 'SUCCESS') {
          dispatch(clearUserData(res.sessid));
          dispatch(clearBasketValue());
          setLoading(false);
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'MainStack', params: {screen: 'TabHome'}}],
            }),
          );
        } else {
          setLoading(false);
          Alert.alert('Ошибка', res.message);
        }
      });
    } catch (err) {
      setLoading(false);
      Alert.alert('Ошибка', err);
    }
    setLoading(false);
  };

  if (loading || data === null) {
    return <PreloaderFullscreen />;
  }

  return (
    <ProfileView
      navigation={props.navigation}
      notifications={notifications}
      loading={loading}
      data={data}
      favorites={favorites}
      signOut={signOut}
    />
  );
};

export default ProfileContainer;
