import React from 'react';
import {
  FlatList,
  View,
  Text,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNStyles from '@tapston/react-native-styles';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {
  Button,
  BasketGoodItem,
  ModalPopup,
  Input,
  Icon,
  TotalPrice,
} from '../../components';
import {screenWidth, ImagesDefault, fonts, colors} from '../../styles';
import {ScrollView} from 'react-native-gesture-handler';

const BasketView = props => {
  const promocodes = props.promocodes.filter(code => code.applyed);
  return (
    <View style={styles.content}>
      {props.openClearModal
        ? Alert.alert('Уведомление', 'Вы точно хотите очистить корзину?', [
            {
              text: 'Отмена',
              onPress: () => props.setOpenClearModal(false),
              style: 'cancel',
            },
            {
              text: 'Очистить',
              onPress: props.clearBasket,
            },
          ])
        : null}
      {props.openChangeDelivery ? (
        <ModalPopup
          title={'Хотите изменить способ доставки?'}
          onRequestClose={() =>
            props.setOpenChangeDelivery(!props.openChangeDelivery)
          }
          children={
            <View style={styles.deliveryContainer}>
              <Text style={styles.subtitleModal}>
                Выберите удобный метод доставки
              </Text>
              <View style={styles.deliveryButtons}>
                <Button
                  onPress={() => {
                    if (props.deliveryType < 1) {
                      props.setOpenChangeDelivery(!props.openChangeDelivery);
                      props.navigation.navigate('SelectCity');
                    } else {
                      props.setOpenChangeDelivery(!props.openChangeDelivery);
                      props.setDeliveryType(0);
                    }
                  }}
                  value={
                    props.deliveryType < 1 ? 'Изменить магазин' : 'Самовывоз'
                  }
                />
                <Button
                  onPress={() => {
                    if (props.deliveryType > 0) {
                      props.setOpenChangeDelivery(!props.openChangeDelivery);
                      props.navigation.navigate('SelectCity');
                    } else {
                      props.setOpenChangeDelivery(!props.openChangeDelivery);
                      props.setDeliveryType(1);
                    }
                  }}
                  value={
                    props.deliveryType > 0
                      ? 'Указать адрес'
                      : 'Доставка Курьером'
                  }
                />
              </View>
            </View>
          }
        />
      ) : null}
      {props.basket.length > 0 ? (
        <View style={styles.basketList}>
          <View style={styles.deliveryType}>
            <View style={styles.deliveryAddress}>
              {props.deliveryType === 0 && props.shop ? (
                <View>
                  <Text style={styles.deliveryTypeText}>{props.shop.name}</Text>
                  <View style={styles.deliveryLine}>
                    <Icon name="time" />
                    <Text style={styles.deliveryTime}>
                      {props.shop.schedule}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.deliveryTypeText}>
                    {props.deliveryAddress !== ''
                      ? props.deliveryAddress
                      : 'Укажите адрес доставки'}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.couponsContainer}>
            <View style={styles.couponsList}>
              {promocodes.length > 0 &&
                promocodes.map(item => {
                  return (
                    <View
                      style={[
                        styles.couponCode,
                        item.applyed
                          ? styles.couponApplied
                          : styles.couponNotApplyed,
                      ]}>
                      <Text
                        style={[
                          styles.couponCodeText,
                          item.applyed
                            ? styles.couponApplied
                            : styles.couponNotApplyed,
                        ]}>
                        {item.code}
                      </Text>
                      <TouchableOpacity
                        style={styles.closeCross}
                        onPress={() => props.removePromocode(item.code)}>
                        <Icon name="close" />
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
            <Button
              onPress={props.handlePresentModalPress}
              value={'Добавить промокод'}
            />
          </View>
          <FlatList
            overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
            contentContainerStyle={styles.listWrapper}
            data={props.baksetItems}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              const am = props.basket.find(el => el.id === item.id);
              return (
                <BasketGoodItem
                  avaliable={item.available}
                  loading={props.productLoading}
                  id={item.id}
                  key={item.id}
                  mainText={item.title}
                  sku={item.inventory.sku}
                  measure={item.inventory.measure}
                  delivery={item.inventory.order_type_text}
                  step={item.inventory.step}
                  maxStep={item.inventory.avaliable}
                  amount={am ? am.inventory?.quantity : 0}
                  totalPrice={item.pricing.sum}
                  description={item.inventory.description}
                  flag={item.inventory.flag}
                  pricing={item.pricing_def}
                  price_message={item.pricing_def.price_message}
                  onSale={
                    item.pricing_def.loyalty_price > 0 &&
                    item.pricing_def.sale_price > 0
                  }
                  image={item.image}
                  remove={() => props.removeItem(item.basketId)}
                  favorite={props.favorites.includes(item.id)}
                  onPressFavorite={() => {
                    props.setFavorite(item.id);
                  }}
                  onChange={amount => {
                    props.changeAmount(item.basketId, amount);
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
          />
          {props.fullPrice > 0 ? (
            <View style={styles.buttonContainer}>
              {props.minOrderPrice > 0 &&
              props.fullPrice < props.minOrderPrice ? (
                <View style={styles.minOrder}>
                  <Text style={styles.minOrderText}>
                    минимальная сумма заказа {props.minOrderPrice} рублей
                  </Text>
                </View>
              ) : null}
              <View style={styles.footer}>
                <View>
                  <TotalPrice
                    price={props.fullPrice}
                    sale={
                      props.discountPrice !== props.fullPrice
                        ? props.discountPrice
                        : null
                    }
                  />
                </View>
                <Button
                  value="Оформить заказ"
                  disabled={
                    props.minOrderPrice > props.fullPrice ||
                    (!props.shop && !props.deliveryId)
                  }
                  onPress={() => {
                    if (props.user) {
                      if (
                        props.deliveryType === 1 &&
                        props.deliveryAddress === ''
                      ) {
                        Alert.alert(
                          'Информация',
                          'Для оформления доставки необходимо указать адрес',
                          [
                            {
                              text: 'Отмена',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'Указать адрес',
                              onPress: () =>
                                props.navigation.navigate('SelectCity'),
                            },
                          ],
                        );
                      } else {
                        props.navigation.navigate('CheckoutStack', {
                          screen: 'Checkout',
                          params: {
                            delivery: props.deliveryType,
                          },
                        });
                      }
                    } else {
                      Alert.alert(
                        'Для оформления заказа необходимо авторизоваться',
                        '',
                        [
                          {
                            text: 'Отмена',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'Авторизоваться',
                            onPress: () => props.navigation.navigate('Auth'),
                          },
                        ],
                      );
                    }
                  }}
                />
              </View>
            </View>
          ) : null}
        </View>
      ) : (
        <ScrollView>
          <View style={[styles.content, styles.noContent]}>
            <FastImage
              source={ImagesDefault.empty}
              style={styles.image}
              resizeMode={'contain'}
            />
            <Text style={styles.title}>Ой, пусто!</Text>
            <Text style={styles.text}>
              Закажите любой товар в приложении, а оплатите и заберите — в
              магазине!
            </Text>
            <Button
              value="Перейти в каталог"
              onPress={() => props.navigation.navigate('TabHome')}
            />
          </View>
        </ScrollView>
      )}
      <View style={styles.container}>
        <BottomSheetModal
          keyboardBlurBehavior="restore"
          enablePanDownToClose={true}
          style={{borderTopColor: colors.gray, borderTopWidth: 1}}
          handleIndicatorStyle={{backgroundColor: colors.primary}}
          snapPoints={props.snapPoints}
          ref={props.bottomSheetRef}>
          <View style={styles.contentContainer}>
            <View style={styles.couponAddModal}>
              <Text style={styles.promocodeTitle}>Добавьте промокод</Text>
              <Input
                sheet={true}
                value={props.promocode}
                onChangeText={text => props.setPromocode(text)}
                onSubmitEditing={props.applyPromocode}
              />
              <Button
                disabled={props.promocode.length <= 0}
                style={styles.addCouponButton}
                onPress={props.applyPromocode}
                value="Применить"
              />
            </View>
          </View>
        </BottomSheetModal>
      </View>
    </View>
  );
};

const styles = RNStyles.create({
  content: {
    height: '100%',
    backgroundColor: colors.white,
    position: 'relative',
  },
  noContent: {
    marginTop: 112,
    marginHorizontal: 16,
  },
  image: {
    height: `${screenWidth / 1.3}`,
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
  listWrapper: {
    marginHorizontal: 8,
  },
  wrapper: {
    paddingVertical: 8,
    width: `${screenWidth / 2 - 8}`,
  },
  basketList: {
    height: '100%',
  },
  deliveryType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  deliveryAddress: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'column',
    backgroundColor: colors.gray,
  },
  deliveryLine: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  deliveryTypeText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 6,
  },
  deliveryTime: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.lightGray,
    marginLeft: 8,
  },
  buttonContainer: {
    width: '100%',
    bottom: 0,
    left: 0,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    padding: 8,
  },
  minOrder: {
    display: 'flex',
    width: '100%',
    position: 'absolute',
    top: -34,
    paddingVertical: 8,
    backgroundColor: colors.secondary,
  },
  minOrderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  deliveryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitleModal: {
    marginVertical: 8,
  },
  deliveryButtons: {
    maxWidth: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponsContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 8,
  },
  couponsList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 8,
  },
  couponCode: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVetical: 12,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    flexDirection: 'row',
    marginRight: 4,
    marginBottom: 4,
  },
  couponCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    marginRight: 4,
  },
  couponApplied: {
    color: colors.primary,
    borderColor: colors.primary,
  },
  couponNotApplyed: {
    color: colors.darkGray,
    borderColor: colors.darkGray,
  },
  deliveryPrice: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: colors.black,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 24,
  },
  couponAddModal: {
    flex: 1,
    paddingHorizontal: 8,
  },
  promocodeTitle: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.black,
    fontWeight: '900',
    marginBottom: 12,
    marginLeft: 2.5,
  },
  closeCross: {
    width: 16,
    height: 16,
  },
});

export default BasketView;
