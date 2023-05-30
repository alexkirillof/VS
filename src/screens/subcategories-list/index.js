import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { animateLayout } from '@tapston/react-native-animation';
import { PreloaderFullscreen } from '../../components';
import SubCategoriesListView from './subcategories-list-view';
import { apiPostPublic } from '../../core/api';

const SubCategoriesListContainer = props => {
  const { parentId } = props.route.params;
  const { shop, deliveryType, deliveryId } = useSelector(state => state.user);
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
    apiPostPublic(`/catalog/${parentId}`, {
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
  };

  useEffect(() => {
    animateLayout();
    handleCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return <SubCategoriesListView navigation={props.navigation} data={data} />;
};

export default SubCategoriesListContainer;
