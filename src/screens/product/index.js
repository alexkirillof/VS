import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Alert} from 'react-native';
import {animateLayout} from '@tapston/react-native-animation';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setBasketValue} from '../../store/reducers/basket';
import {addFavorite, deleteFavorite} from '../../store/reducers/user';
import {apiPostPublic} from '../../core/api';
import {PreloaderFullscreen, SetFavourite} from '../../components';

import ProductView from './product-view';

const ProductContainer = ({navigation}) => {
  const {params} = useRoute();
  const dispatch = useDispatch();

  const {shop, sessid, hash, favorites, loyaltyCard, deliveryType, deliveryId} =
    useSelector(state => state.user);

  const {basketProducts} = useSelector(state => state.cart);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCounterId, setOpenCounterId] = useState(null);
  const [amount, setAmount] = useState(0);

  const getProduct = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    try {
      apiPostPublic(`/product/${params?.productId}`, {
        sessid: sessid,
        hash: hash,
        data: {
          ...dataObj,
          getReviews: 'Y',
          getProps: 'Y',
          getShops: 'Y',
        },
      }).then(res => {
        if (res.data.type !== 'ERROR') {
          setProduct(res.data);
          setLoading(false);
        } else {
          Alert.alert(res.data.message, res.data.description);
          navigation.goBack();
        }
      });
    } catch (err) {
      setLoading(false);
      Alert.alert(err);
    }
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

  useLayoutEffect(() => {
    animateLayout();
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product) {
      checkProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basketProducts]);

  useEffect(() => {
    if (product) {
      getProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop]);

  const setFavorite = () => {
    !favorites.includes(product.id)
      ? changeFavorite('add', product.id)
      : changeFavorite('remove', product.id);
  };

  useEffect(() => {
    if (product) {
      const includes = favorites.includes(product.id);
      navigation.setOptions({
        headerTitle: () => (
          <SetFavourite active={includes} onPress={setFavorite} />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, favorites]);

  const checkProduct = () => {
    basketProducts.find(el => {
      if (el.id === product.id) {
        setAmount(el.inventory?.quantity);
      }
    });
  };

  const addToBasket = (id, quantity) => {
    setAmount(quantity);
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
    <ProductView
      counterId={1}
      setAmount={setAmount}
      amount={amount}
      favorites={favorites}
      setOpenCounterId={setOpenCounterId}
      openCounterId={openCounterId}
      product={product}
      basketProducts={basketProducts}
      setFavorite={setFavorite}
      addToBasket={addToBasket}
      navigation={navigation}
      loyaltyCard={loyaltyCard}
    />
  );
};

export default ProductContainer;
