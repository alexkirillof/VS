import React, {useState, useEffect} from 'react';
import {Alert, Share} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PersonalCodeView from './personal-code-view';
import {PreloaderFullscreen} from '../../components';
import {apiPostPublic} from '../../core/api';

const PersonalCodeContainer = props => {
  const {shop, sessid, hash, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );

  const [code, setCode] = useState(null);
  const [codesList, setCodesList] = useState(null);
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
    apiPostPublic('/user/promocodes', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setCode(res.data.ref_coupon);
        setCodesList(res.data.coupon_list);
      } else {
        setLoading(false);
        Alert.alert(res.message);
      }
      setLoading(false);
    });
  };

  const onShare = async code => {
    try {
      const result = await Share.share({
        message: code,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert('result.activityType');
        } else {
          Alert.alert('res');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <PersonalCodeView
      code={code}
      codesList={codesList}
      onShare={onShare}
      navigation={props.navigation}
    />
  );
};

export default PersonalCodeContainer;
