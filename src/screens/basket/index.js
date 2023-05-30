import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearBasketValue, setBasketValue} from '../../store/reducers/basket';
import {addFavorite, deleteFavorite} from '../../store/reducers/user';
import {PreloaderFullscreen} from '../../components';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {apiPostPublic} from '../../core/api';

import BasketView from './basket-view';
import {Alert} from 'react-native';

const BasketContainer = props => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {basketValue, basketProducts} = useSelector(state => state.cart);
  const {
    shop,
    data,
    loyaltyCard,
    sessid,
    hash,
    deliveryAddress,
    deliveryType,
    deliveryId,
    favorites,
  } = useSelector(state => state.user);

  const [baksetItems, setBasketItems] = useState([]);
  const [promocodes, setPromocodes] = useState([]);
  const [promocode, setPromocode] = useState('');
  const [fullPrice, setFullPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [openCounterId, setOpenCounterId] = useState(null);
  const [openClearModal, setOpenClearModal] = useState(false);
  const [couponModal, setСouponModal] = useState(false);
  const [openChangeDelivery, setOpenChangeDelivery] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(false);

  const snapPoints = useMemo(() => ['30%'], []);

  const bottomSheetRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const reloadData = () => {
    setLoading(true);

    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }

    apiPostPublic('/cart', {
      sessid: sessid,
      hash: hash,
      data: dataObj,
    }).then(res => {
      if (res.type !== 'ERROR' && res.totals) {
        dispatch(setBasketValue(res));
        setBasketItems(res.products);
        setFullPrice(res.totals.total);
        setPromocodes(res.coupons);
        setDiscount(res.totals.subtotal_base);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert(res.message);
      }
    });
  };

  const removeItem = id => {
    setLoading(true);

    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }

    apiPostPublic('/cart/removeitem', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        basketId: id,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        dispatch(setBasketValue(res));
        setBasketItems(res.products);
        setFullPrice(res.totals.total);
        setDiscount(res.totals.subtotal_base);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert(res.message);
      }
    });
  };

  const changeAmount = (itemId, amount) => {
    setProductLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }

    if (amount > 0) {
      apiPostPublic('/cart/update', {
        sessid: sessid,
        hash: hash,
        data: {
          ...dataObj,
          basketId: itemId,
          quantity: amount,
        },
      }).then(res => {
        if (res.type !== 'ERROR') {
          dispatch(setBasketValue(res));
          setBasketItems(res.products);
          setFullPrice(res.totals.total);
          setDiscount(res.totals.subtotal_base);
          setProductLoading(false);
        } else {
          setProductLoading(false);
          Alert.alert(res.message);
        }
      });
    } else {
      removeItem(itemId);
      setProductLoading(false);
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

  const clearBasket = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }

    apiPostPublic('/cart/clear', {
      sessid: sessid,
      data: dataObj,
    }).then(res => {
      if (res.type !== 'ERROR') {
        dispatch(clearBasketValue());
        setBasketItems([]);
        setPromocodes([]);
        setOpenClearModal(false);
        setFullPrice(0);
        setDiscount(0);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert(res.message);
      }
    });
  };

  const setFavorite = id => {
    !favorites.includes(id)
      ? changeFavorite('add', id)
      : changeFavorite('remove', id);
  };

  const applyPromocode = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }

    apiPostPublic('/cart/addcoupon', {
      sessid: sessid,
      data: {
        ...dataObj,
        code: promocode,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        dispatch(setBasketValue(res));
        setBasketItems(res.products);
        setFullPrice(res.totals.total);
        setDiscount(res.totals.subtotal_base);
        setPromocodes(res.coupons);
        setСouponModal(false);
        setPromocode('');
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert(res.message);
      }
    });
  };

  const removePromocode = code => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }

    apiPostPublic('/cart/removecoupon', {
      sessid: sessid,
      data: {
        ...dataObj,
        code: code,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        dispatch(setBasketValue(res));
        setBasketItems(res.products);
        setFullPrice(res.totals.total);
        setDiscount(res.totals.subtotal_base);
        setPromocodes(res.coupons);
        setСouponModal(false);
        setPromocode('');
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert(res.message);
      }
    });
  };

  const closeModal = () => {
    setСouponModal(false);
    setPromocode('');
  };

  useEffect(() => {
    props.navigation.setParams({
      clearBasketModal: () => {
        setOpenClearModal(true);
      },
    });
    reloadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, []),
  );

  useEffect(() => {
    props.navigation.setParams({
      clearBasketModal: () => {
        setOpenClearModal(true);
      },
    });

    isFocused ? reloadData() : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <BasketView
      productLoading={productLoading}
      changeAmount={changeAmount}
      setBasketItems={setBasketItems}
      setOpenClearModal={setOpenClearModal}
      deliveryId={deliveryId}
      openClearModal={openClearModal}
      openChangeDelivery={openChangeDelivery}
      setOpenChangeDelivery={setOpenChangeDelivery}
      setOpenCounterId={setOpenCounterId}
      openCounterId={openCounterId}
      values={basketValue}
      fullPrice={fullPrice}
      discountPrice={discount}
      minOrderPrice={basketValue ? basketValue.totals.min_order_sum : 0}
      shop={shop}
      favorites={favorites}
      deliveryType={deliveryType}
      deliveryAddress={deliveryAddress}
      basket={basketProducts}
      navigation={props.navigation}
      baksetItems={baksetItems}
      removeItem={removeItem}
      applyPromocode={applyPromocode}
      removePromocode={removePromocode}
      clearBasket={clearBasket}
      setFavorite={setFavorite}
      promocode={promocode}
      promocodes={promocodes}
      couponModal={couponModal}
      setСouponModal={setСouponModal}
      closeModal={closeModal}
      setPromocode={setPromocode}
      user={data}
      snapPoints={snapPoints}
      bottomSheetRef={bottomSheetRef}
      handlePresentModalPress={handlePresentModalPress}
      loyaltyCard={loyaltyCard}
    />
  );
};

export default BasketContainer;
