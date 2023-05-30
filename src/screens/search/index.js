import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addFavorite, deleteFavorite} from '../../store/reducers/user';
import {setBasketValue} from '../../store/reducers/basket';
import {PreloaderFullscreen, SearchInput} from '../../components';
import {
  View,
  TouchableOpacity,
  Text,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {apiPostPublic} from '../../core/api';
import {CONFIG_RESPONDER, TOUCHABLE_OPACITY_VALUE} from '../../core/configs';
import {colors} from '../../styles';
import SearchView from './search-view';
let nativeEvent = null;

const SearchContainer = props => {
  //const navParams = props.navigation.state.params;
  const {shop, sessid, hash, favorites, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );
  const {basketProducts} = useSelector(state => state.cart);
  const [openCounterId, setOpenCounterId] = useState(null);

  const dispatch = useDispatch();

  const [products, setProducts] = useState(null);
  const [timers, setTimers] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stopRequest, setStopRequest] = useState(true);
  const [reload, setReload] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [last, setLast] = useState(0);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState({
    label: 'По умолчанию',
    value: 'abc',
  });
  const panResponer = PanResponder.create(CONFIG_RESPONDER(setOpenCounterId));
  // useEffect(() => {
  //   if (navParams) {
  //     setLoading(true);
  //     if (navParams.searchText) {
  //       setInputValue(navParams.searchText);
  //     } else {
  //       setInputValue('');
  //     }
  //   }
  // }, [navParams]);

  useEffect(() => {
    clearTimeout(timers);
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      setStopRequest(false);
      apiPostPublic('/search', {
        sessid: sessid,
        hash: hash,
        data: {
          ...dataObj,
          filter: {},
          sort: 'popular',
          pageNum: 1,
          pageSize: 20,
          searchText: inputValue,
        },
      }).then(res => {
        if (res.type !== 'ERROR') {
          console.log('true', res.data.pages);
          setProducts(res.data.products);
          setPageNumber(1);
          setLast(res.data.pages);
          setLoading(false);
          setStopRequest(true);
          setReload(false);
        } else {
          setReload(false);
          setProducts(null);
          setLast(0);
          setLoading(false);
          setStopRequest(true);
          inputValue !== '' ? setError(true) : setError(false);
        }
      });
    }, 1500);
    setTimers(timer);
  }, [inputValue, reload]);

  const reloadData = () => {
    console.log('false', last);
    console.log('false222', pageNumber);
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    setStopRequest(false);
    apiPostPublic('/search', {
      sessid: sessid,
      hash: hash,
      data: {
        ...dataObj,
        filter: {},
        sort: 'popular',
        pageNum: pageNumber,
        pageSize: 20,
        searchText: inputValue,
      },
    }).then(res => {
      if (res.type !== 'ERROR') {
        setProducts(old => [...old, ...res.data.products]);
        setLast(res.data.pages);
        setLoadingPagination(false);
        setStopRequest(true);
        setReload(false);
      } else {
        setLoadingPagination(false);
        setStopRequest(true);
        setReload(false);
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

  useEffect(() => {
    if (!loading && pageNumber !== 1) {
      reloadData();
    }
  }, [pageNumber]);

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
    apiPostPublic('/cart/additem/', {
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

  return (
    <TouchableWithoutFeedback onPress={() => setOpenCounterId(null)}>
      <View {...panResponer.panHandlers} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.input}>
            <SearchInput
              onChange={value => {
                setLoading(true);
                setInputValue(value);
              }}
              value={inputValue}
            />
          </View>
          {/* <TouchableOpacity
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            onPress={() => {
              setInputValue("");
              setStopRequest(true);
              setLoading(false);
            }}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Отмена</Text>
          </TouchableOpacity> */}
        </View>

        {loading ? (
          <View style={styles.common}>
            <PreloaderFullscreen />
          </View>
        ) : (
          <SearchView
            openCounterId={openCounterId}
            setOpenCounterId={setOpenCounterId}
            loadingPagination={loadingPagination}
            setLoadingPagination={setLoadingPagination}
            onScrollEndReached={onScrollEndReached}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setLast={setLast}
            last={last}
            setPageNumber={setPageNumber}
            setReload={setReload}
            pageNumber={pageNumber}
            products={products}
            error={error}
            isReload={reload}
            favorites={favorites}
            basketProducts={basketProducts}
            setFavorite={setFavorite}
            addToBasket={addToBasket}
            navigation={props.navigation}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = RNStyles.create({
  common: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'space-between',
    backgroundColor: '#eaeaea',
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  closeButtonText: {
    color: colors.black,
    '@media (max-height: 568)': {
      fontSize: 14,
    },
  },
});

export default SearchContainer;
