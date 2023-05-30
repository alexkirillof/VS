import React, {useState, useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useSelector} from 'react-redux';
import {apiPostPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';
import {animateLayout} from '@tapston/react-native-animation';
import SelectCityView from './select-city-view';

const SelectCityContainer = props => {
  const {startCount} = useSelector(state => state.app);
  const {shopRegionId, hash, deliveryType} = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);

  const handleRegions = async () => {
    setLoading(true);
    try {
      apiPostPublic('/regions').then(res => {
        if (res.type !== 'ERROR') {
          const region = res.regions.reduce(
            (o, item) => ({...o, [item.id]: {name: item.name}}),
            {},
          );
          setRegions(region);
          res.regions.map(item => handleCities(item.id));
           console.log('%c%s', 'color: lime;',  res.regions);
        } else {
          Alert.alert(res.message);
        }
      });
    } catch (err) {
      Alert.alert(err);
      setLoading(false);
    }
  };

  const handleCities = id => {
    setLoading(true);
    try {
      apiPostPublic(`/cities/${id ? id : shopRegionId}`, {
        data: {},
      }).then(res => {
        if (res.type !== 'ERROR') {
          setRegions(state => ({
            ...state,
            [id]: {
              name: state[id].name,
              cities: res.cities,
            },
          }));
          setLoading(false);
        } else {
          Alert.alert(res.message);
          setLoading(false);
        }
      });
    } catch (err) {
      Alert.alert(err);
      setLoading(false);
    }
  };

  const handleShops = city => {
    if (city.shops <= 0) {
      Alert.alert(
        'Информация',
        'В этом городе доступна только доставка на дом',
      );
    } else {
      props.navigation.navigate('SelectShop', {
        cityId: city.id,
      });
    }
  };

  useEffect(() => {
    animateLayout();
    handleRegions();
    if (startCount > 0) {
      props.navigation.setOptions({
        headerLeft: () => null,
      });
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <SelectCityView
      regions={regions}
      deliveryType={deliveryType}
      hash={hash}
      handleCities={handleCities}
      handleShops={handleShops}
      navigation={props.navigation}
    />
  );
};

export default SelectCityContainer;
