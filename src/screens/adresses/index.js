import React, {useState, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDeliveryId} from '../../store/reducers/user';
import {useFocusEffect} from '@react-navigation/native';
import {apiPostDadata, apiPostPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import AdressesView from './adresses-view';
import {Alert} from 'react-native';

const AdressesContainer = props => {
  const {shop, sessid, hash, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [openCounterId, setOpenCounterId] = useState(null);
  const [adress, setAdress] = useState('');
  const [fullAdress, setFullAdress] = useState({});
  const [adressesList, setAdressesList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showAddAdress, setShowAddAdress] = useState(false);

  const handleAdress = async () => {
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    setLoading(true);
    try {
      apiPostPublic('/user/address/', {
        sessid: sessid,
        hash: hash,
        data: {},
      }).then(res => {
        setAdressesList(res.data.Addressess);
        setLoading(false);
      });
    } catch (err) {
      console.log('Ошибка', err);
      setLoading(false);
    }
  };

  const searchAdress = async text => {
    setLoadingSearch(true);
    setAdress(text);
    try {
      apiPostDadata('/suggest/address', {
        query: text,
      }).then(res => {
        console.log('RE', res);
        setSuggestions(res.suggestions);
        setLoadingSearch(false);
      });
    } catch (err) {
      console.log('Ошибка', err);
      setLoadingSearch(false);
      //Alert.alert('Ошибка', err);
    }
  };

  const deleteAdress = async id => {
    try {
      setLoading(true);
      apiPostPublic('/user/address/remove', {
        sessid: sessid,
        hash: hash,
        data: {
          addressId: id,
        },
      }).then(res => {
        if (res.type !== 'ERROR') {
          setShowAddAdress(false);
          handleAdress();
        } else {
          Alert.alert('Ошибка', res.message);
        }
        setLoading(false);
      });
    } catch (err) {
      console.log('Ошибка', err);
      setLoading(false);
    }
  };

  const addAdress = async () => {
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    try {
      setLoading(true);
      apiPostPublic('/user/address/add', {
        sessid: sessid,
        hash: hash,
        data: {
          //...dataObj,
          full_address: adress,
          region: fullAdress.data.region_with_type,
          city_name: fullAdress.data.city,
          post_index: fullAdress.data.postal_code,
          street: fullAdress.data.street_with_type,
          house: fullAdress.data.house,
          flat: false,
        },
      }).then(res => {
        if (res.type !== 'ERROR') {
          setShowAddAdress(false);
          handleAdress();
        } else {
          Alert.alert('Ошибка', res.message);
        }
        setLoading(false);
      });
    } catch (err) {
      console.log('Ошибка', err);
      setLoading(false);
    }
  };

  const setDeliveryIdItem = (id, full_address) => {
    dispatch(setDeliveryId(id, full_address));
  };

  const selectAdress = item => {
    setFullAdress(item);
    setAdress(item.value);
  };

  useFocusEffect(
    useCallback(() => {
      handleAdress();
    }, []),
  );

  if (loading) {
    return <PreloaderFullscreen />;
  }
  return (
    <AdressesView
      setLoading={setLoading}
      mapRef={mapRef}
      adress={adress}
      loadingSearch={loadingSearch}
      setAdress={setAdress}
      adressesList={adressesList}
      suggestions={suggestions}
      showAddAdress={showAddAdress}
      addAdress={addAdress}
      deleteAdress={deleteAdress}
      selectAdress={selectAdress}
      setShowAddAdress={setShowAddAdress}
      searchAdress={searchAdress}
      deliveryId={deliveryId}
      setDeliveryIdItem={setDeliveryIdItem}
      setOpenCounterId={setOpenCounterId}
      openCounterId={openCounterId}
      navigation={props.navigation}
    />
  );
};

export default AdressesContainer;
