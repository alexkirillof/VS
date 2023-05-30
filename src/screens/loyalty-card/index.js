import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoyaltyCard} from '../../store/reducers/user';
import {PreloaderFullscreen} from '../../components';
import {apiPostPublic} from '../../core/api';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

import LoyaltyCardView from './loyalty-card-view';

const LoyaltyCardContainer = props => {
  const dispatch = useDispatch();
  const {shop, data, sessid, hash, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );

  const {token, id, last_app_entry, loyaltyCard, ...userData} = data || {};

  const [loading, setLoading] = useState(true);
  const [addCard, setAddCard] = useState(false);
  const [addVirtualCard, setAddVirtualCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [addCardFields, setAddCardFields] = useState([]);
  const [cardProps, setCardProps] = useState({...userData});
  const [pickerMode, setPickerMode] = useState(false);

  const userCard = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/user/card/', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        if (res.data.loyaltyCard.number) {
          setCardNumber(res.data?.loyaltyCard?.number);
          setNewCardNumber(res.data?.loyaltyCard?.number);
        }
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert('Ошибка', res.message);
      }
    });
  };

  const addUserCard = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/user/card/add', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        card_number: newCardNumber,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setCardNumber(res.data?.loyaltyCard?.number);
        setLoading(false);
        Alert.alert('Поздравляем!', 'Карта успешно добавлена!');
      } else {
        setLoading(false);
        Alert.alert('Ошибка', res.message);
      }
    });
  };

  const getCardFormFields = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/user/card/getvirtualparams', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setAddCardFields(res.data);
        setAddVirtualCard(!addVirtualCard);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert('Ошибка', res.message);
      }
    });
  };

  const addNewCard = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/user/card/addvirtual', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        params: {
          ...cardProps,
        },
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setCardNumber(res.data?.loyaltyCard?.number);
        dispatch(setLoyaltyCard(res.data?.loyaltyCard?.number));
        setAddVirtualCard(!addVirtualCard);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert('Ошибка', res.message);
      }
    });
  };

  const showDatePicker = () => {
    setPickerMode(true);
  };

  const hideDatePicker = () => {
    setPickerMode(false);
  };

  const handleConfirm = (field, selectedDate) => {
    setCardProps({
      ...cardProps,
      [field]: moment(selectedDate).format('DD.MM.YYYY'),
    });
    hideDatePicker();
  };

  useEffect(() => {
    userCard();
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <LoyaltyCardView
      setLoading={setLoading}
      loading={loading}
      addCardFields={addCardFields}
      setAddCard={setAddCard}
      getCardFormFields={getCardFormFields}
      addCard={addCard}
      addVirtualCard={addVirtualCard}
      setCardProps={setCardProps}
      cardProps={cardProps}
      cardNumber={cardNumber}
      newCardNumber={newCardNumber}
      setNewCardNumber={setNewCardNumber}
      setCardNumber={setCardNumber}
      addUserCard={addUserCard}
      handleConfirm={handleConfirm}
      showDatePicker={showDatePicker}
      hideDatePicker={hideDatePicker}
      pickerMode={pickerMode}
      navigation={props.navigation}
      addNewCard={addNewCard}
      data={data}
    />
  );
};

export default LoyaltyCardContainer;
