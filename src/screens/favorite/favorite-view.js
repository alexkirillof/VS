import React from 'react';
import {FlatList, View, Text, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNStyles from '@tapston/react-native-styles';
import {ItemPreview, Button} from '../../components';
import {colors, screenWidth, ImagesDefault} from '../../styles';
import {ScrollView} from 'react-native-gesture-handler';

const FavoriteView = props => {
  return (
    <View style={styles.content}>
      {props.favorites.length > 0 ? (
        <FlatList
          overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
          data={props.favorites}
          extraData={props.favorites}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
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
                favorite={props.favoritesState.includes(item.id)}
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
          keyExtractor={item => `${item.id}`}
          horizontal={false}
        />
      ) : (
        <ScrollView>
          <View style={[styles.content, styles.noContent]}>
            <FastImage
              source={ImagesDefault.noFavorite}
              style={styles.image}
              resizeMode={'contain'}
            />
            <Text style={styles.title}>В избранном пока пусто</Text>
            <Text style={styles.text}>
              Ставьте сердечки на любимые товары из каталога, чтобы не потерять.
            </Text>
            <Button
              value="Перейти в каталог"
              onPress={() => props.navigation.navigate('Home')}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = RNStyles.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  noContent: {
    marginTop: 48,
    padding: 8,
  },
  image: {
    height: `${screenWidth / 1.5}`,
    width: '100%',
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 24,
    fontWeight: '900',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 48,
  },
});

export default FavoriteView;
