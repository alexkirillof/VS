import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import { Button, Counter, TotalPrice } from '../../components';
import {
  colors,
  fonts,
  fontWeight,
  ImagesDefault,
  screenWidth,
} from '../../styles';
import FastImage from 'react-native-fast-image';
import RenderHtml from 'react-native-render-html';

const ProductView = ({
  product,
  navigation,
  amount,
  counterId,
  setOpenCounterId,
  loyaltyCard,
  addToBasket,
}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (showButton) {
      setTimeout(() => {
        setShowButton(false);
      }, 2000);
    }
  }, [showButton]);

  if (product?.properties) {
    delete product.properties.marketingovoe_opisanie;
    delete product.properties.more_photo;
    delete product.properties.section;
    delete product.properties.card_price;
    delete product.properties.action;
    delete product.properties.features;
    delete product.properties.popular;
    delete product.properties.aktsiza;
    delete product.properties.fat;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topPageContent}>
        <View style={styles.leftSide}>
          <FastImage
            source={
              product.image ? { uri: product.image } : ImagesDefault.imagePreview
            }
            style={styles.image}
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.mainName}>{product.title}</Text>
          {product.inventory?.sku && (
            <Text style={styles.smallText}>
              Артикул: {product.inventory?.sku}
            </Text>
          )}
          {product.inventory?.measure ? (
            <Text style={styles.smallText}>
              Осталось:{' '}
              {product.inventory?.quantity + ' ' + product.inventory?.measure}
            </Text>
          ) : null}
          <View style={styles.description}>
            {product.inventory?.flag && (
              <FastImage
                source={{ uri: product.inventory?.flag }}
                style={styles.flag}
                resizeMode={'contain'}
              />
            )}
            {product.inventory?.description && (
              <Text style={styles.descriptionText}>
                {product.inventory?.description}
              </Text>
            )}
          </View>
          {Object.values(product?.properties).map((item, index) => {
            return (
              <View
                style={[
                  styles.propsList,
                  index % 2 ? styles.listOdd : styles.listEven,
                ]}
                key={index + item.name}>
                <Text style={styles.propsText}>{item.name}</Text>
                <Text style={styles.propsText}>{item.value}</Text>
              </View>
            );
          })}
          <View
            style={[
              styles.propsList,
              Object.values(product?.properties)?.length % 2
                ? styles.listOdd
                : styles.listEven,
            ]}>
            <Text style={styles.propsText}>Производитель</Text>
            <Text style={styles.propsText}>{product.vendor}</Text>
          </View>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.priceContainerLeft}>
          <Text style={{ fontWeight: '300' }}>Цена</Text>
          <TotalPrice
            style={{ fontWeight: '300' }}
            price={product.pricing.price}
          />
        </View>
        {product.pricing?.loyalty_price > 0 && (
          <View style={styles.priceContainerRight}>
            <Text style={{ fontWeight: '300' }}>Цена по карте</Text>
            <TotalPrice price={product.pricing.loyalty_price} />
          </View>
        )}
      </View>
      <View style={styles.buttons}>
        {amount > 0 ? (
          <Counter
            editCountStyle={{ height: 50 }}
            id={counterId}
            size={product.inventory.measure}
            step={product.inventory.step}
            maxStep={product.inventory?.quantity}
            setOpenCounterId={setOpenCounterId}
            openCounterId={counterId}
            startCount={amount}
            onChange={count => {
              addToBasket(product.id, count);
            }}
          />
        ) : (
          <Button
            style={styles.addToCartButton}
            textContainerStyle={{ justifyContent: 'flex-start' }}
            textStyle={{ fontSize: 22, lineHeight: 26, fontWeight: '900' }}
            icon={true}
            value={
              loyaltyCard && product.pricing.loyalty_price
                ? product.pricing.loyalty_price.toFixed(2) + ' \u20BD'
                : product.pricing.sale_price > 0 &&
                  product.pricing.sale_price < product.pricing.price
                  ? product.pricing.sale_price.toFixed(2) + ' \u20BD'
                  : product.pricing.price.toFixed(2) + ' \u20BD'
            }
            onPress={() => {
              addToBasket(product.id, product.inventory.step);
            }}
          />
        )}
        <Button
          style={styles.buyShopButton}
          textStyle={{ fontSize: 16, lineHeight: 20, fontWeight: '900' }}
          onPress={() =>
            navigation.navigate('BuyShop', {
              shops: product.shops,
            })
          }
          value="Где купить?"
          reversDisable={false}
        />
      </View>
      <Text style={{ fontSize: 12, fontWeight: '300', marginTop: 12, }}>* Цены действительны при заказе на сайте и в приложении.</Text>
      {product.description && product.description !== '' ? (
        <View style={styles.descriptionBlock}>
          <Text style={styles.descriptionTitle}>Все характеристики</Text>
          <RenderHtml
            source={{ html: product.description }}
            baseStyle={{
              fontSize: 16,
              lineHeight: 20,
              color: colors.black,
              fontFamily: fonts.primaryRegular,
            }}
            contentWidth={screenWidth}
          />
        </View>
      ) : null}
      {showButton && (
        <View style={styles.popUpButton}>
          <Button
            text="Выбрано максимальное количество товара"
            type="blueButton"
          />
        </View>
      )}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
};
const styles = RNStyles.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    backgroundColor: colors.background.white,
    paddingHorizontal: 8,
  },
  topPageContent: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 24,
  },
  leftSide: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rightSide: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  wrapperContainer: {
    paddingHorizontal: 8,
  },
  image: {
    backgroundColor: colors.white,
    marginHorizontal: 8,
    height: 360,
  },
  zoomMap: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 10,
  },
  map: {
    width: '100%',
  },
  mainName: {
    fontFamily: fonts.heading,
    color: colors.black,
    fontWeight: fontWeight.bold,
    fontSize: 20,
    lineHeight: 24,
    marginVertical: 4,
  },
  smallText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.darkGray,
    marginVertical: 4,
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 8,
  },
  propsList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  listEven: {
    backgroundColor: '#EAEAEA',
  },
  propsText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    lineHeight: 20,
    justifyContent: 'center',
  },
  sale: {
    fontSize: 12,
    lineHeight: 14,
    color: colors.text.redPrimary,
  },
  favorite: {
    flexDirection: 'row-reverse',
    marginRight: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  floatBlock: {
    marginHorizontal: -8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatLoyalty: {
    backgroundColor: colors.primary,
  },
  floatSales: {
    backgroundColor: colors.secondary,
  },
  floatBlockText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: colors.white,
    textTransform: 'uppercase',
  },
  priceMessage: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: colors.black,
  },
  descriptionBlock: {
    marginTop: 12,
  },
  descriptionTitle: {
    fontFamily: fonts.heading,
    fontSize: 22,
    lineHeight: 26,
    color: colors.btnGray,
    marginBottom: 8,
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 4,
  },
  descriptionText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.lightGray,
  },
  flag: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  priceContainerLeft: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  priceContainerRight: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  addToCartButton: {
    flex: 1,
    minWidth: 160,
    minHeight: 56,
    paddingHorizontal: 20,
  },
  buyShopButton: {
    minWidth: 160,
    minHeight: 56,
    marginLeft: 8,
    paddingHorizontal: 20,
  },
});
export default ProductView;
