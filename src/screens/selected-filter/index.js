import React, {useState, useEffect} from 'react';
import {animateLayout} from '@tapston/react-native-animation';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {setFilters, setFiltersStatus} from '../../store/reducers/filters';
import {PreloaderFullscreen} from '../../components';

import FiltersView from './selected-filter-view';

const FiltersContainer = props => {
  const {selectedFilters} = useSelector(state => state.filters);
  const route = useRoute();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState({});
  const [type, setType] = useState(null);
  const [values, setValues] = useState([]);
  const [checked, setChecked] = useState([]);
  const [loadingPagination, setLoadingPagination] = useState(false);

  const handleFilters = () => {
    setLoading(true);
    setType(route.params.code);
    setSelected({
      [route.params.code]: '',
    });
    setValues(route.params.values);
    if (selectedFilters[route.params.code]) {
      setChecked(selectedFilters[route.params.code]);
    } else {
      setChecked([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    animateLayout();
    handleFilters();
  }, [selectedFilters]);

  const toFilter = code => {
    if (checked?.find(val => val === code)) {
      const index = checked.indexOf(code);
      if (index > -1) {
        checked.splice(index, 1);
      }
      setChecked(checked);
    } else {
      setChecked(old => [...old, code]);
    }
  };

  const setTypeFilters = () => {
    dispatch(setFilters(type, checked));
    dispatch(setFiltersStatus(true));
    props.navigation.pop();
  };

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <FiltersView
      navigation={props.navigation}
      type={type}
      selected={selected}
      setSelected={setSelected}
      setValues={setValues}
      toFilter={toFilter}
      values={values}
      setChecked={setChecked}
      checked={checked}
      setTypeFilters={setTypeFilters}
      screenName={route.params.screenName}
      loadingPagination={loadingPagination}
      setLoadingPagination={setLoadingPagination}
    />
  );
};

export default FiltersContainer;
