import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {Button, ShopItem} from '../../components';

import {colors, fontWeight} from '../../styles';

const SelectShopView = props => {
  return (
    <SafeAreaView style={styles.common}>
      <ScrollView>
        <View style={styles.content}>
          {props.shops.map(item => {
            return (
              <ShopItem
                key={item.id}
                name={item.name}
                workTime={item.schedule}
                delivery={item.delivery === '1' ? true : false}
                onPress={() => props.selectShop(item)}
                checked={props.shopId === item.id}
              />
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button onPress={props.saveShop} value="Сохранить" />
      </View>
    </SafeAreaView>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    backgroundColor: colors.white,
    height: '100%',
  },
  wrap: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listItem: {
    color: colors.text.black,
    fontSize: 14,
    fontWeight: fontWeight.bold,
    marginRight: 8,
  },
  content: {
    paddingHorizontal: 8,
    flex: 1,
    width: '100%',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default SelectShopView;
