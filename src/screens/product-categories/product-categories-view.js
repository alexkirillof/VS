import React from 'react';
import {
  FlatList,
  View,
  PanResponder,
  RefreshControl,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNStyles from '@tapston/react-native-styles';

import {
  DropdownFilter,
  ItemPreview,
  Icon,
} from '../../components';

import { colors, screenWidth } from '../../styles';
import { CONFIG_RESPONDER } from '../../core/configs';

const ProductCategoriesView = props => {
  const panResponer = PanResponder.create(
    CONFIG_RESPONDER(props.setOpenCounterId),
  );

  return (
    <TouchableWithoutFeedback
      style={styles.wrapper}
      onPress={() => props.setOpenCounterId(null)}>
      <View {...panResponer.panHandlers} style={styles.common}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => props.navigation.navigate('Search')}>
            <View style={styles.searchInput}>
              <Icon name="search-input-icon" />
              <Text style={styles.inputText}>Поиск</Text>
            </View>
          </TouchableOpacity>
          <DropdownFilter
            countSearchItem={props.size}
            selectedFilter={props.selectedSort}
            setSelectedFilter={sort => {
              props.setSelectedSort(sort);
            }}
          />
        </View>
        <FlatList
          onEndReachedThreshold={1}
          refreshControl={
            <RefreshControl
              tintColor={colors.primary}
              refreshing={props.isReload}
              onRefresh={() => {
                props.setReload(true);
              }}
            />
          }
          onEndReached={() => {
            if (!props.loadingPagination && props.pageNumber !== props.last) {
              props.setLoadingPagination(true);
              props.setPageNumber(props.pageNumber + 1);
            }
          }}
          ListFooterComponent={
            props.loadingPagination && (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            )
          }
          onScroll={e => {
            if (Platform.OS === 'ios') {
              props.onScrollEndReached(e);
            }
          }}
          refreshing={props.isReload}
          data={props.products}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            const am = props.basketProducts.find(el => el.id === item.id);
            return (
              <ItemPreview
                id={item.id}
                index={index}
                key={item.id}
                mainText={item.title}
                sku={item.inventory.sku}
                measure={item.inventory.measure}
                step={item.inventory.step}
                maxStep={item.inventory?.quantity}
                description={item.inventory.description}
                flag={item.inventory.flag}
                delivery={
                  item.inventory?.delivery_message
                    ? item.inventory?.delivery_message
                    : ''
                }
                amount={am !== undefined ? am.inventory?.quantity : 0}
                pricing={item.pricing}
                price_message={item.pricing.price_message}
                sale={
                  item.pricing.loyalty_price > 0 || item.pricing.sale_price
                    ? item.pricing.price
                    : null
                }
                onSale={
                  item.pricing.loyalty_price > 0 || item.pricing.sale_price > 0
                }
                image={item.image}
                onPressFavorite={() => {
                  props.setFavorite(item.id);
                }}
                favorite={props.favorites.includes(item.id)}
                openCounterId={props.openCounterId}
                setOpenCounterId={props.setOpenCounterId}
                onChange={amount => {
                  props.addToBasket(item.id, amount);
                }}
                onPress={() => {
                  props.navigation.navigate('ProductStack', {
                    screen: 'Product',
                    params: {
                      productId: item.id,
                    },
                  });
                }}
              />
            );
          }}
          horizontal={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = RNStyles.create({
  common: {
    height: '100%',
    backgroundColor: colors.white,
  },
  loader: {
    paddingVertical: 20,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    backgroundColor: '#eaeaea',
  },
  searchContainer: {
    backgroundColor: colors.white,
    width: `${screenWidth} - 16`,
    height: 38,
    marginTop: 16,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderRadius: 6,
  },
  searchInput: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputText: {
    color: colors.grayPrice,
    marginLeft: 8,
  },
});

export default ProductCategoriesView;
