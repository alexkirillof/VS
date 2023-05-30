import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {animateLayout} from '@tapston/react-native-animation';
import {useSelector, useDispatch} from 'react-redux';
import {addFavorite, deleteFavorite} from '../../store/reducers/user';
import {setBasketValue} from '../../store/reducers/basket';
import {resetFilters} from '../../store/reducers/filters';
import {apiPostPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import SaleView from './sale-view';
const SaleContainer = props => {
  let nativeEvent = null;
  const {basketProducts} = useSelector(state => state.cart);
  const {shop, sessid, hash, favorites, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );
  const {selectedFilters, filtersCategory} = useSelector(
    state => state.filters,
  );

  const dispatch = useDispatch();

  const [openCounterId, setOpenCounterId] = useState(null);
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [last, setLast] = useState(0);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [selectedSort, setSelectedSort] = useState('abc');

  const getProducts = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/category/actions/', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        sort: selectedSort,
        pageSize: 10,
        pageNum: pageNumber,
        filter: selectedFilters,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setProducts(res.data.products);
        setSize(res.data?.quantity);
        setLast(res.data.pages);
        setLoading(false);
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

  const reloadData = () => {
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/category/actions/', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        sort: selectedSort,
        pageSize: 10,
        pageNum: pageNumber,
        filter: selectedFilters,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setProducts(old => [...old, ...res.data.products]);
        setSize(res.data?.quantity);
        setLast(res.data.pages);
      }
      setReload(false);
      setLoadingPagination(false);
      setLoading(false);
    });
  };

  const checkFilters = () => {
    if (filtersCategory !== 'actions') {
      dispatch(resetFilters());
    }
  };

  useEffect(() => {
    animateLayout();
    checkFilters();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reload && !loading) {
      setProducts([]);
      setPageNumber(1);
      reloadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    setProducts([]);
    setPageNumber(1);
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  useEffect(() => {
    if (!loading && pageNumber !== 1) {
      reloadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      setProducts([]);
      setPageNumber(1);
      getProducts();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort]);

  const setFavorite = id => {
    !favorites.includes(id)
      ? changeFavorite('add', id)
      : changeFavorite('remove', id);
  };

  const addToBasket = (id, amount) => {
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
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
        quantity: amount,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        dispatch(setBasketValue(res));
      } else {
        Alert.alert('Информация', res.message);
      }
    });
  };

  const onScrollEndReached = e => {
    let previousOffsetY = 0;
    if (nativeEvent) {
      previousOffsetY = nativeEvent.contentOffset.y;
    }
    const offsetY = e.nativeEvent.contentOffset.y;

    if (
      offsetY - previousOffsetY > 0 &&
      offsetY >=
        e.nativeEvent.contentSize.height +
          e.nativeEvent.contentInset.bottom -
          e.nativeEvent.layoutMeasurement.height
    ) {
      if (!last && !loadingPagination) {
        setLoadingPagination(true);
        setPageNumber(old => old++);
      }
    }

    nativeEvent = e.nativeEvent;
  };

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <SaleView
      setOpenCounterId={setOpenCounterId}
      loadingPagination={loadingPagination}
      setLoadingPagination={setLoadingPagination}
      onScrollEndReached={onScrollEndReached}
      last={last}
      size={size}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      openCounterId={openCounterId}
      setReload={setReload}
      setLoading={setLoading}
      isReload={reload}
      favorites={favorites}
      reloadData={reloadData}
      products={products}
      setFavorite={setFavorite}
      addToBasket={addToBasket}
      basketProducts={basketProducts}
      navigation={props.navigation}
      setSelectedSort={setSelectedSort}
      selectedSort={selectedSort}
    />
  );
};

export default SaleContainer;
