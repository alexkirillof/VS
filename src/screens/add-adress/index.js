import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDeliveryId} from '../../store/reducers/user';
import {useRoute} from '@react-navigation/native';
import {
  apiPostDadata,
  apiPostDadataCleaner,
  apiPostPublic,
} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import AddAdressView from './add-adress-view';
import {Alert} from 'react-native';

const AddAdressContainer = props => {
  const {shop, sessid, hash, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );
  const dispatch = useDispatch();
  const route = useRoute();
  const mapRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [openCounterId, setOpenCounterId] = useState(null);
  const [adress, setAdress] = useState('');
  const [fullAdress, setFullAdress] = useState({});
  const [adressesList, setAdressesList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

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

  const addAdress = async () => {
    try {
      setLoading(true);
      apiPostPublic('/user/address/add', {
        sessid: sessid,
        hash: hash,
        data: {
          full_address: adress,
          region: fullAdress.data.region_with_type,
          city_name: fullAdress.data.city
            ? fullAdress.data.city
            : fullAdress.data.settlement,
          post_index: fullAdress.data.postal_code,
          street: fullAdress.data.street_with_type,
          house: fullAdress.data.house,
          flat: false,
        },
      }).then(res => {
        if (res.type !== 'ERROR') {
          props.navigation.goBack();
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

  if (loading) {
    return <PreloaderFullscreen />;
  }
  return (
    <AddAdressView
      setLoading={setLoading}
      mapRef={mapRef}
      adress={adress}
      loadingSearch={loadingSearch}
      setAdress={setAdress}
      adressesList={adressesList}
      suggestions={suggestions}
      addAdress={addAdress}
      selectAdress={selectAdress}
      searchAdress={searchAdress}
      deliveryId={deliveryId}
      setDeliveryIdItem={setDeliveryIdItem}
      setOpenCounterId={setOpenCounterId}
      openCounterId={openCounterId}
      navigation={props.navigation}
    />
  );
};

export default AddAdressContainer;
