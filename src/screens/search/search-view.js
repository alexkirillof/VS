import React from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Platform,
  ActivityIndicator,
} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import { colors } from '../../styles';
import { ItemPreview, EmptySearch } from '../../components';
const SearchView = props => {
  return (
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
        if (!props.loadingPagination && props.pageNumber <= props.last) {
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
      ListEmptyComponent={() => (
        <View style={styles.common}>
          <EmptySearch
            error={props.error}
            onPress={() => props.navigation.navigate('Home')}
          />
        </View>
      )}
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
            measure={item.inventory.measure}
            step={item.inventory.step}
            maxStep={item.inventory.quantity}
            amount={am !== undefined ? am.inventory.quantity : 0}
            pricing={item.pricing}
            sale={
              (item.pricing.loyalty_price > 0 || item.pricing.sale_price > 0) &&
              item.pricing.price
            }
            price_message={item.pricing.price_message}
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
    />
  );
};

const styles = RNStyles.create({
  wrapper: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  container: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  foundStaff: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.text.black,
  },
});

export default SearchView;
