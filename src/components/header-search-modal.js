import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNStyles from '@tapston/react-native-styles';

import {colors, screenWidth} from '../styles';
import {SearchInput} from './search-input';
import {Icon} from './icon';
import {ItemPreview} from './item-preview';
import {EmptySearch} from './empty-search';
import {PreloaderFullscreen} from './preloader-fullscreen';
import {TOUCHABLE_OPACITY_VALUE} from '../core/configs';
import {apiPostPublic} from '../core/api';

/**
 * Header search modal
 * @prop {Array[{label, value}]} data - data
 * @prop {boolean} isOpen - open search modal
 * @prop {boolean} searchCity - поиск городов
 * @prop {Function({label, value})} selection - callback selection item
 * @prop {Function} onRequestClose - callback will call when close button push
 * @prop {any} navigation
 * @prop {String} placeholder - placeholder
 * @prop {object} activeCity - active city
 */
const HeaderSearch = ({
  isOpen = false,
  selection,
  onRequestClose = () => null,
  cities = [],
  searchCity = false,
  placeholder = '',
  activeCity,
  navigation,
}) => {
  const {shop, sessid, hash, favorites, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );
  const {basketProducts} = useSelector(state => state.cart);
  const [openCounterId, setOpenCounterId] = useState(null);

  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [timers, setTimers] = useState(null);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [error, setError] = useState(false);

  const styles = getStyles(isOpen);

  const filter = (val, list) => {
    let result = [];
    list.forEach(i => {
      if (i.toLowerCase().indexOf(val.toLowerCase()) === 0) {
        result.push(i);
      }
    });
    return result;
  };

  useEffect(() => {
    setLoading(true);
    setLoading(false);
    return () => {
      setData([]);
      setInputValue('');
    };
  }, [isOpen]);

  useEffect(() => {
    clearTimeout(timers);
    if (inputValue !== '') {
      let dataObj = {};
      if (deliveryType === 0 && shop !== null) {
        dataObj.shopId = shop.id;
        dataObj.cityId = shop.city;
      } else {
        dataObj.addressId = deliveryId;
      }
      setLoading(true);
      const timer = setTimeout(() => {
        apiPostPublic('/search', {
          sessid: sessid,
          hash: hash,
          data: {
            ...dataObj,
            filter: {},
            sort: 'abc',
            pageNum: 1,
            pageSize: 20,
            searchText: inputValue,
          },
        }).then(res => {
          if (res.type !== 'ERROR') {
            setData(res.data.products);
          }
          //setQuantity(res.data?.quantity);
          setLoading(false);
        });
      }, 1500);
      setTimers(timer);
    }
  }, [inputValue]);

  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        onRequestClose();
        break;
      case SWIPE_RIGHT:
        onRequestClose();
        break;
    }
  };
  return (
    <GestureRecognizer
      onSwipe={onSwipe}
      style={{
        flex: 1,
      }}>
      <Modal
        onRequestClose={onRequestClose}
        animationType="fade"
        visible={isOpen}
        transparent>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <SearchInput
              style={styles.searchInput}
              onChange={value => {
                setLoading(true);
                setInputValue(value);
              }}
              placeholder={placeholder}
            />
            <TouchableOpacity
              activeOpacity={TOUCHABLE_OPACITY_VALUE}
              onPress={onRequestClose}
              style={styles.closeButton}>
              <Icon name="close" />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            {isLoading ? (
              <PreloaderFullscreen />
            ) : (
              <FlatList
                //onEndReachedThreshold={1}
                style={{paddingVertical: Platform.OS === 'android' ? 8 : 4}}
                overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
                // onEndReached={() => {
                //   console.log('END', props.pageNumber);
                //   if (!props.loadingPagination && props.pageNumber !== props.last) {
                //     props.setLoadingPagination(true);
                //     props.setPageNumber(props.pageNumber + 1);
                //   }
                // }}
                // onScroll={e => {
                //   if (Platform.OS === 'ios') {
                //     props.onScrollEndReached(e);
                //   }
                // }}
                ListFooterComponent={
                  loadingPagination && (
                    <View style={styles.loader}>
                      <ActivityIndicator size="small" color={colors.primary} />
                    </View>
                  )
                }
                ListEmptyComponent={() => (
                  <View style={styles.common}>
                    <EmptySearch
                      error={error}
                      onPress={() => navigation.navigate('Home')}
                    />
                  </View>
                )}
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  const am = basketProducts.find(el => el.id === item.id);
                  return (
                    <ItemPreview
                      id={item.id}
                      index={index}
                      key={item.id}
                      mainText={item.title}
                      measure={item.inventory.measure}
                      step={item.inventory.step}
                      maxStep={item.inventory?.quantity}
                      amount={am ? am.inventory?.quantity : 0}
                      pricing={item.pricing}
                      price_message={item.pricing.price_message}
                      sale={
                        item.pricing.loyalty_price > 0 ||
                        item.pricing.sale_price
                          ? item.pricing.price
                          : null
                      }
                      onSale={
                        item.pricing.loyalty_price > 0 ||
                        item.pricing.sale_price > 0
                      }
                      image={item.image}
                      onPressFavorite={() => {
                        setFavorite(item.id);
                      }}
                      favorite={favorites.includes(item.id)}
                      openCounterId={openCounterId}
                      setOpenCounterId={setOpenCounterId}
                      onChange={amount => {
                        addToBasket(item.id, amount);
                      }}
                      onPress={() => {
                        navigation.navigate('ProductStack', {
                          screen: 'Product',
                          params: {
                            productId: item.id,
                          },
                        });
                      }}
                    />
                  );
                }}
              />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </GestureRecognizer>
  );
};
const getStyles = searchIsOpen => {
  return RNStyles.create({
    input: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
      backgroundColor: '#eaeaea',
    },
    header: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      paddingVertical: 10,
      justifyContent: 'space-between',
      backgroundColor: '#eaeaea',
    },
    searchInput: {
      width: `${screenWidth}` - 40,
    },
    closeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
      paddingRight: 10,
    },
    closeButtonText: {
      color: colors.text.black,
      '@media (max-height: 568)': {
        fontSize: 14,
      },
    },
    wrapper: {
      flex: 1,
      backgroundColor: colors.background.white,
    },
    scrollWrapper: {
      paddingBottom: 50,
    },
    content: {
      backgroundColor: colors.background.white,
      paddingLeft: 32,
      // elevation: 4,
      // shadowColor: colors.text.black,
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      borderRadius: 6,
      marginVertical: 20,
      marginHorizontal: 16,
    },
    contentHistory: {
      backgroundColor: colors.background.white,
      // elevation: 4,
      // shadowColor: colors.text.black,
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      borderRadius: 6,
      marginTop: 20,
      marginHorizontal: 16,
      paddingBottom: 16,
    },
    historyResultHeader: {
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      color: 'rgba(0,0,0, 0.5)',
      textTransform: 'uppercase',
      paddingTop: 16,
      lineHeight: 18,
    },
    clear: {
      fontSize: 14,
      color: 'rgba(0,0,0, 0.5)',
      textTransform: 'uppercase',
      paddingTop: 16,
      lineHeight: 16,
    },
  });
};

export default HeaderSearch;
