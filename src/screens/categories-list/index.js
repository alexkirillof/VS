import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {animateLayout} from '@tapston/react-native-animation';

import {apiPostPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import CategoriesListView from './categories-list-view';
/**
 * При навигации на данный экран в сторе должен быть id города
 */
const CategoriesListContainer = props => {
  const {shop, deliveryType, deliveryId} = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleCategories = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    try {
      apiPostPublic('/catalog/0', {
        data: {
          ...dataObj,
        },
      }).then(res => {
        if (res.type !== 'ERROR') {
          setData(res.data);
          setLoading(false);
        } else {
          setLoading(false);
          Alert.alert(res.message);
        }
      });
    } catch (err) {
      setLoading(false);
      Alert.alert(err);
    }
  };

  useEffect(() => {
    animateLayout();
    handleCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <CategoriesListView
      navigation={props.navigation}
      loading={loading}
      data={data}
    />
  );
};

export default CategoriesListContainer;
