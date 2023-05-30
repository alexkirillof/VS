import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {apiGetPublic, apiPostPublic} from '../../core/api';
import LaunchSecondView from './launch-second-view';

const LaunchSecondContainer = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);

  const handleRegions = async () => {
    setLoading(true);
    try {
      apiPostPublic('/regions', {
        data: {},
      }).then(res => {
        if (res.type !== 'ERROR') {
          console.log(res);
          let regionsArray = Object.entries(res.regions);
          regionsArray.map(item => {
            setRegions(regions => [
              ...regions,
              {
                id: item[0],
                name: item[1],
              },
            ]);
          });
          handleCities(Object.keys(res.regions)[0]);
        } else {
          Alert.alert(res.message);
        }
      });
    } catch (err) {
      Alert.alert(err);
    }
    setLoading(false);
  };

  const handleCities = async id => {
    setLoading(true);
    await setCities([]);
    try {
      apiPostPublic(`/cities/${id}`, {
        data: {},
      }).then(res => {
        if (res.type !== 'ERROR') {
          let citiesArray = Object.entries(res.cities);
          citiesArray.map(item => {
            setCities(cities => [
              ...cities,
              {
                id: item[0],
                name: item[1],
              },
            ]);
          });
        } else {
          Alert.alert(res.message);
        }
      });
    } catch (err) {
      Alert.alert(err);
    }
    setLoading(false);
  };

  const handleShops = async id => {
    setLoading(true);
    try {
      apiGetPublic(`/shops2/${id}`, {
        data: {},
      }).then(res => {
        if (res.type !== 'ERROR') {
          props.navigation.navigate('Third', {
            cityId: id,
          });
        } else {
          Alert.alert(res.message);
        }
      });
    } catch (err) {
      Alert.alert(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleRegions();
  }, []);

  return (
    <LaunchSecondView
      loading={loading}
      regions={regions}
      cities={cities}
      handleCities={handleCities}
      handleShops={handleShops}
      toggleCheckBox={toggleCheckBox}
      setToggleCheckBox={setToggleCheckBox}
      navigation={props.navigation}
    />
  );
};

export default LaunchSecondContainer;
