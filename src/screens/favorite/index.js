import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, deleteFavorite} from '../../store/reducers/user';
import {setBasketValue} from '../../store/reducers/basket';
import {apiPostPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import FavoriteView from './favorite-view';

const FavoriteContainer = props => {
  const {basketProducts} = useSelector(state => state.cart);
  const {shop, sessid, hash, favorites, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [openCounterId, setOpenCounterId] = useState(null);
  const [favoritesProducts, setFavorites] = useState(null);

  const getFavorites = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/favorites', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setFavorites(res.products);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert(res.message);
      }
    });
  };

  const changeFavorite = (method, id) => {
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic(`/favorites/${method}`, {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        productId: id,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        method === 'add'
          ? dispatch(addFavorite(id))
          : dispatch(deleteFavorite(id));
      } else {
        Alert.alert(res.message);
      }
    });
  };

  useEffect(() => {
    getFavorites();
  }, [favorites]);

  const setFavorite = id => {
    !favorites.includes(id)
      ? changeFavorite('add', id)
      : changeFavorite('remove', id);
  };

  const addToBasket = (id, quantity) => {
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/cart/additem', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        product_id: id,
        quantity: quantity,
      },
    }).then(res => {
      if (res?.type !== 'ERROR') {
        dispatch(setBasketValue(res));
      } else {
        Alert.alert('Информация', res.message);
      }
    });
  };

  if (loading) {
    return <PreloaderFullscreen />;
  }
  return (
    <FavoriteView
      setLoading={setLoading}
      setOpenCounterId={setOpenCounterId}
      openCounterId={openCounterId}
      favorites={favoritesProducts}
      favoritesState={favorites}
      setFavorite={setFavorite}
      basketProducts={basketProducts}
      navigation={props.navigation}
      addToBasket={addToBasket}
    />
  );
};

export default FavoriteContainer;
