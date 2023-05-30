import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {setSelectedShop, setShopId} from '../../store/reducers/user';
import {setBasketLength, setBasketValue} from '../../store/reducers/basket';
import {apiPostPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import SelectBuyShopView from './select-buy-shop-view';

const SelectBuyShopContainer = props => {
  const {shop, sessid, hash, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );

  const route = useRoute();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [shopData, setShopData] = useState(shop);

  const getBasket = () => {
    let dataObj = {};
    if (deliveryType === 0 && shopData) {
      dataObj.shopId = shopData.id;
      dataObj.cityId = shopData.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/cart', {
      sessid: sessid,
      hash: hash,
      data: dataObj,
    }).then(res => {
      if (res?.type !== 'ERROR') {
        dispatch(setBasketLength(res.totals.quantity));
        dispatch(setBasketValue(res));
      } else {
        console.log('warn', res.message);
      }
    });
  };

  const selectShop = item => {
    setShopData(item);
  };

  const saveShop = () => {
    dispatch(setSelectedShop(shopData));
    dispatch(setShopId(shopData?.city));
    getBasket();
    props.navigation.goBack();
  };

  if (route.params?.shops?.length <= 0) {
    return <PreloaderFullscreen />;
  }

  return (
    <SelectBuyShopView
      loading={loading}
      shops={route.params?.shops}
      shopId={shopData?.id}
      selectShop={selectShop}
      saveShop={saveShop}
      checked={checked}
      setChecked={setChecked}
      navigation={props.navigation}
    />
  );
};

export default SelectBuyShopContainer;
