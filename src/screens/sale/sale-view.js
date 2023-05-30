import React from 'react';
import {
  FlatList,
  View,
  PanResponder,
  RefreshControl,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import { DropdownFilter, ItemPreview } from '../../components';

import { colors, fontWeight } from '../../styles';
import { CONFIG_RESPONDER } from '../../core/configs';

const SaleView = props => {
  const panResponer = PanResponder.create(
    CONFIG_RESPONDER(props.setOpenCounterId),
  );

  return (
    <TouchableWithoutFeedback
      style={styles.wrapper}
      onPress={() => props.setOpenCounterId(null)}>
      <View {...panResponer.panHandlers} style={styles.common}>
        {/* <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('InfoPage', {
              name: 'Купоны и программа лояльности',
            })
          }>
          <Text style={styles.buttonOutlined}>
            Купоны и программа лояльности
          </Text>
        </TouchableOpacity> */}
        <View style={styles.header}>
          <DropdownFilter
            countSearchItem={props.size}
            selectedFilter={props.selectedSort}
            setSelectedFilter={filter => {
              props.setSelectedSort(filter);
            }}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
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
                amount={am ? am.inventory?.quantity : 0}
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
  header: {
    paddingHorizontal: 8,
  },
  loader: {
    paddingVertical: 20,
  },
  textBlock: {
    fontSize: 18,
    lineHeight: 20,
    color: colors.black,
    fontWeight: fontWeight.bold,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  buttonOutlined: {
    fontSize: 18,
    lineHeight: 20,
    color: colors.primary,
    fontWeight: fontWeight.bold,
    marginTop: 14,
    marginBottom: 6,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
});

export default SaleView;
