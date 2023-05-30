import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import {resetFilters} from '../store/reducers/filters';
import {useDispatch, useSelector} from 'react-redux';
import {colors, screenWidth} from '../styles';
import Icon from './icon';
import {HIT_SLOP, TOUCHABLE_OPACITY_VALUE} from '../core/configs';
/**
 * Header
 * @prop {boolean} backButton - header back button
 * @prop {boolean} closeCross - header close button
 * @prop {boolean} searchButton - header search button
 * @prop {boolean} searchInput - header search input
 * @prop {boolean} selectShop - header slsect shop
 * @prop {React component} leftArea - header search button
 * @prop {boolean} basketTrash - header right basket trash
 */
const Header = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {user} = useSelector(store => store);
  const {shop, deliveryType, deliveryAddress} = useSelector(
    store => store.user,
  );
  const {basketLength} = useSelector(store => store.cart);
  const {filtersStatus} = useSelector(store => store.filters);

  const styles = getStyles(user.data);

  return (
    <View style={styles.common}>
      <View style={styles.leftArea}>
        {props.backButton && (
          <TouchableOpacity
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            onPress={() => {
              navigation.dispatch(CommonActions.goBack());
            }}
            hitSlop={HIT_SLOP}
            style={styles.containerLeftButton}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
        )}
        {props.selectShop && (
          <TouchableOpacity
            onPress={() =>
              deliveryType === 0 && shop
                ? navigation.navigate('SelectCity', {
                    screen: 'SelectShop',
                    params: {
                      cityId: shop.city,
                    },
                  })
                : navigation.navigate('SelectCity', {
                    screen: 'SelectCity',
                  })
            }>
            {deliveryType === 0 && shop ? (
              <Text style={styles.deliveryNameText} numberOfLines={1}>
                {shop.name}
              </Text>
            ) : deliveryType !== 0 && deliveryAddress !== '' ? (
              <Text style={styles.deliveryNameText} numberOfLines={1}>
                {deliveryAddress}
              </Text>
            ) : (
              <Text style={styles.deliveryNameText}>
                Выберите способ доставки
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerArea}>
        {props.name && (
          <View style={styles.iconContainer}>
            <Icon name={props.name} />
          </View>
        )}
      </View>

      {props.searchInput && (
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => navigation.navigate('Search')}>
          <Icon name="search-input-icon" />
          <Text style={styles.inputText}>Поиск</Text>
        </TouchableOpacity>
      )}

      <View style={styles.rightArea}>
        {props.searchButton && (
          <TouchableOpacity
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            onPress={() => {
              navigation.navigate('Search');
            }}
            hitSlop={HIT_SLOP}
            style={styles.containerRightButton}>
            <Icon name="search" fill={'#979797'} />
          </TouchableOpacity>
        )}
        {props.notifications && user.data && (
          <TouchableOpacity
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            onPress={() => {
              navigation.navigate('ProfileStack', {
                screen: 'Notifications',
              });
            }}
            hitSlop={HIT_SLOP}
            style={styles.containerRightButton}>
            <Icon name="notifications" />
            {user.notifications > 0 && (
              <View style={styles.notificationsCount}>
                <Text style={styles.notificationsCountText}>
                  {user.notifications > 99 ? '99+' : user.notifications}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        {props.closeCross && (
          <TouchableOpacity
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            onPress={() => {
              navigation.dispatch(CommonActions.goBack());
            }}
            style={[styles.containerRightButton, styles.closeCross]}>
            <Icon name="close" />
          </TouchableOpacity>
        )}
        {props.checkAll && (
          <TouchableOpacity
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            style={styles.containerRightButton}
            onPress={() => {
              const callback = route.params.checkAllNotifications;
              callback ? callback() : null;
            }}>
            <Icon name="check-all" />
          </TouchableOpacity>
        )}
        {props.resetFilters && (
          <TouchableOpacity
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            onPress={() => {
              dispatch(resetFilters());
            }}
            style={styles.clearFilters}>
            <Text style={styles.clearFiltersText}>Сбросить все</Text>
          </TouchableOpacity>
        )}
        {props.basketTrash && (
          <TouchableOpacity
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            style={styles.containerRightButton}
            onPress={() => {
              const callback = route.params.clearBasketModal;
              callback ? callback() : null;
            }}>
            {basketLength > 0 && (
              <Icon name="close" fill={props.fill ? props.fill : '#979797'} />
            )}
          </TouchableOpacity>
        )}
        {props.filters && (
          <TouchableOpacity
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            style={[styles.containerRightButton, styles.filters]}
            onPress={() => {
              navigation.navigate('FiltersStack', {
                screen: 'FiltersList',
                params: {
                  action:
                    route.params !== undefined &&
                    route.params.categoryId !== undefined
                      ? route.params.categoryId
                      : 'actions',
                  screenName: route.name,
                  filters:
                    route.params !== undefined &&
                    route.params.filters !== undefined
                      ? route.params.filters
                      : null,
                },
              });
            }}>
            <Icon name="filters" fill={'#363434'} />
            {filtersStatus && <View style={styles.badge} />}
          </TouchableOpacity>
        )}
        {props.profile && (
          <TouchableOpacity
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            style={[styles.containerRightButton, {marginRight: 0}]}
            onPress={() => {
              if (user.data) {
                navigation.navigate('ProfileStack', {screen: 'Profile'});
              } else {
                navigation.navigate('Auth');
              }
            }}>
            {user.data ? (
              <Icon name="user-active" />
            ) : (
              <Icon name="user" fill={'#979797'} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const getStyles = user =>
  RNStyles.create({
    common: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 8,
      zIndex: 1000,
    },
    containerLeftButton: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    containerRightButton: {
      height: '100%',
      width: 40,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    clearFilters: {
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    filters: {
      position: 'relative',
    },
    clearFiltersText: {
      fontSize: 16,
    },
    badge: {
      backgroundColor: colors.secondary,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      square: 12,
      borderRadius: 20,
      top: 10,
      right: -6,
    },
    iconContainer: {
      marginRight: 6,
    },
    leftArea: {
      flex: 3,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
    deliveryNameText: {
      maxWidth: `${screenWidth / 1.35 - 16}`,
    },
    centerArea: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    rightArea: {
      flex: 3,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
    },
    searchContainer: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.white,
      width: user ? `${screenWidth - 60}` : `${screenWidth - 16}`,
      height: 38,
      paddingHorizontal: 8,
      borderRadius: 6,
    },
    inputText: {
      color: colors.grayPrice,
      marginLeft: 8,
    },
    closeCross: {
      width: 18,
      height: 18,
    },
    notificationsCount: {
      square: 20,
      backgroundColor: colors.secondary,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40,
      top: 10,
      right: -6,
    },
    notificationsCountText: {
      color: colors.text.white,
      fontSize: 9,
      textAlign: 'center',
    },
  });

export default Header;
