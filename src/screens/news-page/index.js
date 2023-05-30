import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import NewsPageView from './news-page-view';
import {Alert} from 'react-native';
import {PreloaderFullscreen} from '../../components';
import {apiPostPublic} from '../../core/api';

const NewsPageContainer = props => {
  const {shop, sessid, hash, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );

  const route = useRoute();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic(`/news/detail/${route.params.newsId}`, {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
      },
    }).then(res => {
      if (res.data.type !== 'ERROR') {
        setData(res.data);
        setLoading(false);
      } else {
        props.navigation.goBack();
        Alert.alert(res.data.message);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return <NewsPageView data={data} navigation={props.navigation} />;
};

export default NewsPageContainer;
