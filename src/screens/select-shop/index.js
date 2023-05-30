import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute, CommonActions} from '@react-navigation/native';
import {setSelectedShop, setShopId} from '../../store/reducers/user';
import {apiGetPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import SelectShopView from './select-shop-view';

const SelectShopContainer = props => {
  const route = useRoute();
  const {shop} = useSelector(state => state.user);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [shops, setShops] = useState([]);
  const [shopData, setShopData] = useState(shop);

  const handleShopsList = () => {
    setLoading(true);
    try {
      apiGetPublic(`/shops/${route.params.cityId}`, {
        data: {},
      }).then(res => {
        if (res.type !== 'ERROR') {
          setShops(res.shops);
          setLoading(false);
        } else {
          Alert.alert(res.message);
          setLoading(false);
        }
      });
    } catch (err) {
      Alert.alert(err);
      setLoading(false);
    }
  };

  const selectShop = item => {
    setShopData(item);
  };

  const saveShop = () => {
    dispatch(setSelectedShop(shopData));
    dispatch(setShopId(shopData?.city));
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'MainStack', params: {screen: 'TabHome'}}],
      }),
    );
  };

  useEffect(() => {
    handleShopsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <SelectShopView
      loading={loading}
      shops={shops}
      shopId={shopData?.id}
      selectShop={selectShop}
      saveShop={saveShop}
      checked={checked}
      setChecked={setChecked}
      navigation={props.navigation}
    />
  );
};

export default SelectShopContainer;
