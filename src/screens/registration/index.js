import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { PreloaderFullscreen } from '../../components';
import { apiPostPublic } from '../../core/api';

import RegistrationScreenView from './registration-screen-view';

const RegistrationContainer = props => {
  const { sessid, hash } = useSelector(state => state.user);

  const phoneInput = useRef(null);

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(__DEV__ ? '8900000000' : '');
  const [name, setName] = useState(__DEV__ ? 'Петр' : '');
  const [lastname, setLastname] = useState(__DEV__ ? 'Иванов' : '');
  const [email, setEmail] = useState(__DEV__ ? 'test@test.ru' : '');
  const [birthDay, setBirthDay] = useState(null);

  const handleRegistrationCode = () => {
    setLoading(true);
    try {
      apiPostPublic('/registration', {
        sessid: sessid,
        data: {
          phone: phoneNumber,
          name: name + ' ' + lastname,
          email: email,
          birthday: birthDay,
          check: 'Y',
        },
      }).then(res => {
        if (res.type !== 'ERROR') {
          props.navigation.push('Verification', {
            phone: phoneNumber,
            pinCode: res.sms_debug_only,
          });
          setLoading(false);
        } else {
          setLoading(false);
          Alert.alert(res.message, res.description);
        }
      });
    } catch (err) {
      setLoading(false);
      Alert.alert('Ошибка', err);
    }
  };

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <RegistrationScreenView
      navigation={props.navigation}
      loading={loading}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      name={name}
      setName={setName}
      lastname={lastname}
      setLastname={setLastname}
      email={email}
      phoneInput={phoneInput}
      birthDay={birthDay}
      setEmail={setEmail}
      setBirthDay={setBirthDay}
      handleRegistrationCode={handleRegistrationCode}
    />
  );
};

export default RegistrationContainer;
