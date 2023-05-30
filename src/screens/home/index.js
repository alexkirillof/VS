import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  Platform,
  ScrollView,
  Text,
  BackHandler,
} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {animateLayout} from '@tapston/react-native-animation';
import {useSelector, useDispatch} from 'react-redux';
import * as NotificationsService from '../../core/utils/notifications';
import {
  HomeBanners,
  HomeCategories,
  Button,
  ModalPopup,
  Input,
} from '../../components';
import {incrementStartCount} from '../../store/reducers/app';
import {apiPostPublic, apiPutPublic} from '../../core/api';
import {colors, fonts} from '../../styles';
import {ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = ({navigation}) => {
  const {shop, sessid, hash, deliveryType, favorites, deliveryId} = useSelector(
    state => state.user,
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [bannersList, setBannersList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const getBanners = () => {
    setLoadingBanners(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/main_slider', {
      sessid: sessid,
      hash: hash,
      data: dataObj,
    }).then(res => {
      if (res?.type !== 'ERROR') {
        setBannersList(res?.data);
      } else {
        Alert.alert(res?.message);
      }
      setLoadingBanners(false);
    });
  };

  const setPushToken = (os, token) => {
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    try {
      apiPutPublic('/user', {
        sessid: sessid,
        hash: hash,
        data: {
          ...dataObj,
          token: [{platform: os, id: token}],
        },
      });
    } catch (err) {
      Alert.alert('Ошибка', err);
    }
  };

  const updateUserEmail = () => {
    setButtonLoading(true);
    try {
      apiPutPublic('/user', {
        sessid: sessid,
        hash: hash,
        data: {
          email: email,
        },
      }).then(res => {
        if (res.type !== 'ERROR_NOT_AUTH') {
          setShowModal(!showModal);
          Alert.alert('Обновлено', 'Данные успешно обновлены');
          setButtonLoading(false);
        } else {
          Alert.alert('Ошибка', res.message);
          setButtonLoading(false);
        }
      });
    } catch (err) {
      Alert.alert('Ошибка', err);
      setButtonLoading(false);
    }
  };

  const getPopularCategories = () => {
    setLoadingCategories(true);
    setLoading(true);
    let dataObj = {};
    if (deliveryType === 0 && shop) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/popular/sections/', {
      sessid: sessid,
      hash: hash,
      data: dataObj,
    }).then(res => {
      setCategoryList(res?.data?.sections);
      setLoadingCategories(false);
      setLoading(false);
    });
  };

  const getUserData = () => {
    try {
      apiPostPublic('/user', {
        sessid: sessid,
        hash: hash,
        data: {},
      }).then(res => {
        if (res.type !== 'ERROR_NOT_AUTH') {
          if (!res.data.email) {
            setShowModal(!showModal);
          }
        } else {
          console.log('warn', res.message);
        }
      });
    } catch (err) {
      Alert.alert('Ошибка', err);
    }
  };

  const getUserInfo = () => {
    setLoadingUserInfo(true);
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    apiPostPublic('/userInfo/', {
      sessid: sessid,
      hash: hash,
      data: dataObj,
    }).then(res => {
      if (res.type !== 'ERROR_NOT_AUTH') {
        setUserInfo(res.data);
        setLoadingUserInfo(false);
      } else {
        setUserInfo(null);
        setLoadingUserInfo(false);
      }
    });
  };

  useEffect(() => {
    animateLayout();
    dispatch(incrementStartCount());
    getBanners();
    getPopularCategories();

    NotificationsService.requestPermission()
      .then(res => {
        if (sessid && hash) {
          setPushToken(Platform.OS, res);
        }
      })
      .catch(err => console.log(err));

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBanners();
      getPopularCategories();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getUserInfo();
    getUserData();
    NotificationsService.requestPermission().then(res => {
      if (sessid && hash) {
        setPushToken(Platform.OS, res);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
      style={styles.wrapper}>
      <HomeBanners
        bannersList={bannersList}
        loading={loadingBanners}
        navigation={navigation}
      />
      <TouchableOpacity
        style={styles.selectedShop}
        // onPress={() => navigation.navigate('TabShops')}>
        onPress={() => navigation.push('SelectCity')}>
        <Text styles={styles.shopName}>
          {shop?.name ? shop.name : 'Выберите магазин'}
        </Text>
      </TouchableOpacity>
      {showModal && (
        <ModalPopup
          onRequestClose={() => setShowModal(!showModal)}
          title={'Укажите ваш Емэйл'}
          children={
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Емейл необходим, чтобы отправлять вам электронный чек. {'\n'}
                Бумажные чеки могут не выдаваться в связи с перебоями поставок
                чековой ленты.
              </Text>
              <Input
                title="Email"
                placeholder="email@vinsklad.ru"
                value={email}
                image={false}
                onChangeText={text => setEmail(text)}
              />
              <Button
                value="Сохранить"
                disabled={!email}
                loading={buttonLoading}
                onPress={updateUserEmail}
              />
            </View>
          }
        />
      )}
      {loading && loadingCategories ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : (
        <View style={styles.blocks}>
          <HomeCategories
            navigation={navigation}
            categoryList={categoryList}
            favorites={favorites}
          />
        </View>
      )}
      <View style={{height: 20}} />
    </ScrollView>
  );
};

const styles = RNStyles.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalContent: {
    paddingHorizontal: 8,
  },
  modalText: {
    paddingVertical: 24,
    fontSize: 20,
    color: colors.black,
  },
  blocks: {
    padding: 8,
  },
  selectedShop: {
    margin: 8,
    backgroundColor: colors.gray,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  shopName: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: fonts.primaryRegular,
    fontWeight: '400',
  },
});

export default Home;
