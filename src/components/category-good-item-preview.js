import React, {useState, useEffect} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import RNStyles from '@tapston/react-native-styles';
import PriceTag from './price-tag';
import Icon from './icon';

import {ImagesDefault, colors, screenWidth} from '../styles';
import {TOUCHABLE_OPACITY_VALUE} from '../core/configs';
import {apiPostPublic} from '../core/api';
/**
 * Component CategoryGoodItemPreview Краткое Описание Товара и цены в магазинах
 * @prop {string} id - id товара
 * @prop {function} onPress - функция
 * @prop {hook} setOpenCounterId - хук для закрытия каунтера
 * @prop {hook} openCounterId - хук для закрытия каунтера
 */
const CategoryGoodItemPreview = ({
  id = null,
  onSale = true,
  favorite = true,
  onPress = () => {},
  onChange = () => {},
  onPressFavorite = () => {},
  setOpenCounterId,
}) => {
  const {shop, deliveryType, deliveryId} = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const [openToast, setOpenToast] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    openToast
      ? setTimeout(() => {
          setOpenToast(false);
        }, 3000)
      : null;
  }, [openToast]);

  const getProduct = () => {
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    setLoading(true);
    try {
      apiPostPublic(`/product/${id}`, {
        data: dataObj,
      }).then(res => {
        if (res) {
          setProduct(res.data);
        } else {
          Alert.alert(res.message, res.description);
        }
      });
    } catch (err) {
      Alert.alert(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.common}>
        <View style={[styles.header, !onSale ? styles.favorite : '']}>
          {onSale ? (
            <View style={styles.onSale}>
              <Icon name="sale" fill={colors.primary} />
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.favorite}
            activeOpacity={TOUCHABLE_OPACITY_VALUE}
            onPress={onPressFavorite}>
            <Icon
              name="favorite"
              fill={favorite ? colors.primary : colors.gray}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={TOUCHABLE_OPACITY_VALUE}
          style={styles.top}
          onPress={() => {
            onPress();
          }}>
          <FastImage
            source={
              product.image ? {uri: product.image} : ImagesDefault.defaultImage
            }
            style={styles.image}
            resizeMode={'contain'}
          />
          <View style={styles.content}>
            <Text numberOfLines={3} style={styles.mainText}>
              {product.title}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.footer}>
          <PriceTag price={23} sale={123} />
        </View>
      </View>
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    flex: 1,
    width: `${screenWidth}`,
    margin: 4,
  },
  common: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.grayShadow,
    borderRadius: 6,
  },
  header: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favorite: {
    flexDirection: 'row-reverse',
  },
  onSale: {
    padding: 4,
    backgroundColor: colors.gray,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  image: {
    width: `${screenWidth / 2 - 34}`,
    height: 200,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  content: {
    marginHorizontal: 16,
    height: 90,
  },
  mainText: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.black,
    paddingVertical: 16,
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    color: colors.text.grayPrice,
  },
  footer: {
    justifyContent: 'space-between',
    backgroundColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
export default CategoryGoodItemPreview;
