import React, {useEffect, useState, useRef} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearUserData, setUserData} from '../../store/reducers/user';
import {apiPutPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import EditProfileView from './edit-profile-view';

const EditProfileContainer = props => {
  const {data, hash, sessid} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const phoneInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(data.phone);
  const [userName, setName] = useState(data.name);
  const [lastname, setLastname] = useState(data.lastname);
  const [email, setEmail] = useState(data.email);
  const [birthDay, setBirthDay] = useState(data.birthday);

  const handleRegistrationCode = () => {
    setLoading(true);
    try {
      apiPutPublic('/user/', {
        sessid: sessid,
        hash: hash,
        data: {
          phone: phoneNumber,
          name: userName,
          birthday: birthDay,
          lastname: lastname,
          email: email,
        },
      }).then(res => {
        if (res.type === 'ERROR_NOT_AUTH') {
          dispatch(clearUserData());
          setLoading(false);
          props.navigation.navigate('Auth');
        } else if (res.data.id) {
          dispatch(setUserData(res.data, sessid, res.hash));
          Alert.alert('Обновлено', 'Данные успешно обновлены');
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

  const deleteUserAccount = () => {
    setLoading(true);
    try {
      apiPostPublic('/user/deactivate', {
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
              index: 0,
              routes: [{name: 'MainStack'}],
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

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <EditProfileView
      navigation={props.navigation}
      loading={loading}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      userName={userName}
      setName={setName}
      lastname={lastname}
      setLastname={setLastname}
      email={email}
      phoneInput={phoneInput}
      setEmail={setEmail}
      setBirthDay={setBirthDay}
      birthDay={birthDay}
      handleRegistrationCode={handleRegistrationCode}
      deleteUserAccount={deleteUserAccount}
    />
  );
};

export default EditProfileContainer;
