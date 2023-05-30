import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {animateLayout} from '@tapston/react-native-animation';
import {useSelector, useDispatch} from 'react-redux';
import {
  setFilters,
  setFiltersCategory,
  setFiltersStatus,
} from '../../store/reducers/filters';
import {useRoute} from '@react-navigation/native';
import {apiPostPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import FiltersView from './filters-view';

const FiltersContainer = props => {
  const {shop, sessid, hash, deliveryType, deliveryId} = useSelector(
    state => state.user,
  );
  const {selectedFilters} = useSelector(state => state.filters);

  const route = useRoute();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(true);
  const [filters, setFiltersArray] = useState([]);
  const [selected, setSelected] = useState({});
  const [opened, setOpened] = useState(null);
  const [prices, setPrices] = useState([0, 1]);
  const [values, setValues] = useState([]);
  const [checked, setChecked] = useState([]);

  const handleFilters = () => {
    let dataObj = {};
    if (deliveryType === 0 && shop !== null) {
      dataObj.shopId = shop.id;
      dataObj.cityId = shop.city;
    } else {
      dataObj.addressId = deliveryId;
    }
    try {
      apiPostPublic(`/filter/${route.params.action}`, {
        sessid: sessid,
        hash: hash,
        data: {
          ...dataObj,
          filter: selectedFilters,
        },
      }).then(res => {
        if (res) {
          setFiltersArray(res.data);
          setLoading(false);
        }
      });
    } catch (err) {
      setLoading(false);
      Alert.alert('Ошибка', err);
    }
  };

  useEffect(() => {
    animateLayout();
    handleFilters();
  }, []);

  useEffect(() => {
    animateLayout();
    handleFilters();
  }, [selectedFilters]);

  const setAllFilters = () => {
    animateLayout();
    if (Object.keys(selected).length > 0) {
      dispatch(setFiltersStatus(true));
      dispatch(setFiltersCategory(route.params.action));
    }
    props.navigation.navigate(route.params.screenName);
  };

  const setFilter = (code, val) => {
    animateLayout();
    dispatch(setFilters(code, {from: val[0], to: val[1]}));
  };

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <FiltersView
      navigation={props.navigation}
      filters={filters}
      selected={selected}
      selectedFilters={selectedFilters}
      setSelected={setSelected}
      setFilter={setFilter}
      opened={opened}
      setValues={setValues}
      setAllFilters={setAllFilters}
      values={values}
      setChecked={setChecked}
      checked={checked}
      setPrices={setPrices}
      prices={prices}
      loadingButton={loadingButton}
    />
  );
};

export default FiltersContainer;
