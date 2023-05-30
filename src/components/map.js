import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {View} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

/**
 * Component Map
 */
const Map = props => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 53.9,
          longitude: 27.56667,
          latitudeDelta: 0.14,
          longitudeDelta: 0.14,
        }}>
        {props.markers &&
          props.markers.map(shop => (
            <Marker
              key={shop.ID}
              coordinate={{
                latitude: 53.8323,
                longitude: 27.547405,
              }}
              onPress={() => {
                props.onPressMarker(shop);
              }}
            />
          ))}
      </MapView>
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  shopImage: {
    width: 18,
    height: 18,
    borderRadius: 50,
  },
});

export default Map;
