import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import InfoPageView from './info-page-view';
import {PreloaderFullscreen} from '../../components';
import {apiPostPublic} from '../../core/api';
import {API_PATH} from '../../core/configs';

const InfoPageContainer = props => {
  const {shop, sessid, hash, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/getContent', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        url: `${API_PATH}/loyalty/coupons/`,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setData(res.content);
      } else {
        setLoading(false);
        Alert.alert(res.message);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return <InfoPageView data={data} navigation={props.navigation} />;
};

export default InfoPageContainer;
