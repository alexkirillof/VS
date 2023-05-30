import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {animateLayout} from '@tapston/react-native-animation';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';

import {resetFilters, setSortCategory} from '../../store/reducers/filters';
import {addFavorite, deleteFavorite} from '../../store/reducers/user';
import {setBasketValue} from '../../store/reducers/basket';
import {apiPostPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import ProductCategoriesView from './product-categories-view';

let nativeEvent = null;

const ProductCategoriesContainer = ({navigation}) => {
  const {shop, sessid, hash, favorites, adult, deliveryType, deliveryId} =
    useSelector(state => state.user);
  const {basketProducts} = useSelector(state => state.cart);
  const {selectedFilters, filtersStatus, sortCategory, filtersCategory} =
    useSelector(state => state.filters);

  const dispatch = useDispatch();
  const route = useRoute();

  const [openCounterId, setOpenCounterId] = useState(null);
  const [productsData, setProducts] = useState([]);
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [last, setLast] = useState(0);
  const [loadingPagination, setLoadingPagination] = useState(false);

  const getProducts = () => {
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic(`/category/${route.params.categoryId}`, {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        sort: sortCategory,
        pageSize: 10,
        pageNum: pageNumber,
        filter: selectedFilters,
        getReviews: 'Y',
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setProducts(res.data.products);
        setSize(res.data?.quantity);
        setLast(res.data.pages);
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
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic(`/category/${route.params.categoryId}`, {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        sort: sortCategory,
        pageSize: 10,
        pageNum: pageNumber,
        filter: selectedFilters,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setProducts(old => [...old, ...res.data.products]);
        setSize(res.data?.quantity);
        setLast(res.data.pages);
      } else {
        setLoading(false);
        Alert.alert(res.message);
      }
      setReload(false);
      setLoadingPagination(false);
      setLoading(false);
    });
  };

  const checkFilters = () => {
    if (filtersStatus && filtersCategory !== route.params.categoryId) {
      dispatch(resetFilters());
    }
  };

  const setSelectedSort = sort => {
    dispatch(setSortCategory(sort));
  };

  useEffect(() => {
    animateLayout();
    checkFilters();
  }, []);

  useEffect(() => {
    if (reload && !loading) {
      setProducts([]);
      setPageNumber(1);
      reloadData();
    }
  }, [reload]);

  useEffect(() => {
    if (!loading && pageNumber !== 1) {
      reloadData();
    }
  }, [pageNumber]);

  useEffect(() => {
    setProducts([]);
    setPageNumber(1);
    getProducts();
  }, [sortCategory]);

  useEffect(() => {
    setProducts([]);
    setPageNumber(1);
    getProducts();
  }, [selectedFilters]);

  const setFavorite = id => {
    !favorites.includes(id)
      ? changeFavorite('add', id)
      : changeFavorite('remove', id);
  };

  const addToBasket = (id, amount) => {
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
        quantity: amount,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        dispatch(setBasketValue(res));
      } else {
        setOpenCounterId(null);
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
    <ProductCategoriesView
      setOpenCounterId={setOpenCounterId}
      loadingPagination={loadingPagination}
      setLoadingPagination={setLoadingPagination}
      onScrollEndReached={onScrollEndReached}
      adult={adult}
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
      products={productsData}
      basketProducts={basketProducts}
      setFavorite={setFavorite}
      addToBasket={addToBasket}
      navigation={navigation}
      setSelectedSort={setSelectedSort}
      selectedSort={sortCategory}
    />
  );
};

export default ProductCategoriesContainer;
