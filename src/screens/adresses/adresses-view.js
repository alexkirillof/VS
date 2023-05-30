import React from 'react';
import {FlatList, View, Platform, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {ListItem, Button} from '../../components';
import {colors, screenWidth} from '../../styles';

const AdressesView = props => {
  //YaMap.init('52001e2c-17ae-495b-9bb2-9e0f9660e2c0');
  //Geocoder.init('ccbf0818-e003-407d-ab2a-39afffb0db86');

  // useEffect(() => {
  //   if (props.mapRef) {
  //     props.mapRef.current.fitAllMarkers();
  //   }
  // }, [props.mapRef]);

  return (
    <View style={styles.content}>
      <FlatList
        overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
        style={styles.listWrapper}
        data={props.adressesList}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity onPress={() => props.deleteAdress(item.id)}>
              <Text>Удалить</Text>
            </TouchableOpacity>
            <ListItem
              onPress={() =>
                props.setDeliveryIdItem(item.id, item.full_address)
              }
              name={item.full_address}
              lines={6}
              arrow={false}
              checkActive={props.deliveryId === item.id}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.buttonContainer}>
        <Button
          value="Добавить адрес"
          onPress={() => props.navigation.navigate('NewAdress')}
        />
      </View>
    </View>
  );
};

const styles = RNStyles.create({
  content: {
    height: '100%',
    backgroundColor: colors.white,
  },
  noContent: {
    marginTop: 124,
  },
  listWrapper: {
    height: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  image: {
    height: `${screenWidth / 1.8}`,
    width: '100%',
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
  wrapper: {
    paddingVertical: 16,
  },
  buttonContainer: {
    marginBottom: 24,
    marginHorizontal: 16,
  },
});

export default AdressesView;
