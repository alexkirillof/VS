import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {setSelectedShop} from '../../store/reducers/user';
import {apiGetPublic} from '../../core/api';
import LaunchThirdView from './launch-third-view';

const LaunchThirdContainer = props => {
  const {cityId} = props.route.params;

  const {storeShop} = useSelector(state => state.user);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState(null);

  const handleShops = async () => {
    setLoading(true);
    try {
      apiGetPublic(`/shops2/${cityId}`, {
        data: {},
      }).then(res => {
        if (res.type !== 'ERROR') {
          setShops(Object.values(res.shops));
        } else {
          Alert.alert(res.message);
        }
      });
    } catch (err) {
      Alert.alert(err);
    }
    setLoading(false);
  };

  const selectShop = async shopData => {
    await dispatch(setSelectedShop(shopData));
    await setShopId(shopData.id);
  };

  useEffect(() => {
    if (storeShop) {
      setShopId(storeShop.id);
    }
  }, [storeShop]);

  useEffect(() => {
    handleShops();
    if (storeShop) {
      setShopId(storeShop.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LaunchThirdView
      loading={loading}
      shops={shops}
      shopId={shopId}
      selectShop={selectShop}
      checked={checked}
      setChecked={setChecked}
      navigation={props.navigation}
    />
  );
};

export default LaunchThirdContainer;
