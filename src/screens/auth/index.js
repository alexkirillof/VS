import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData, setLoyaltyCard} from '../../store/reducers/user';
import {PreloaderFullscreen} from '../../components';
import {apiPostPublic} from '../../core/api';

import AuthScreenView from './auth-screen-view';

const AuthContainer = props => {
  const {sessid, hash} = useSelector(state => state.user);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(__DEV__ ? '9999999999' : '');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleUserData = hashId => {
    setLoading(true);
    try {
      apiPostPublic('/user', {
        sessid: sessid,
        hash: hashId,
        data: {},
      }).then(res => {
        if (res.id) {
          dispatch(setUserData(res.data, res.sessid, res.hash));
          dispatch(setLoyaltyCard(res.data?.loyaltyCard?.number));
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

  const handleSendCode = () => {
    setLoading(true);
    try {
      apiPostPublic('/auth', {
        sessid: sessid,
        hash: hash,
        data: {
          phone: phoneNumber,
        },
      }).then(async res => {
        if (res.type === 'NOAUTH') {
          await setLoading(false);
          await props.navigation.push('Verification', {
            phone: phoneNumber,
            pinCode: res.sms_debug_only,
          });
        } else if (res.type === 'SUCCESS') {
          await handleUserData(res.hash);
          await setLoading(false);
          await props.navigation.navigate('ProfileStack', {
            screen: 'Profile',
            params: {hash: res.hash},
          });
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

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <AuthScreenView
      navigation={props.navigation}
      loading={loading}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      handleSendCode={handleSendCode}
      showLoginModal={showLoginModal}
      setShowLoginModal={setShowLoginModal}
    />
  );
};

export default AuthContainer;
