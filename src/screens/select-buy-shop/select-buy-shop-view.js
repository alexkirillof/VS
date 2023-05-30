import React from 'react';
import { View } from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import { ScrollView } from 'react-native-gesture-handler';

import { Button, ShopItem } from '../../components';

import { colors, fontWeight } from '../../styles';

const SelectBuyShopView = props => {
  return (
    <View style={styles.common}>
      <ScrollView>
        <View style={styles.content}>
          {props.shops.map(item => {
            return (
              <ShopItem
                key={item.id}
                name={item.name}
                workTime={item.schedule}
                amount={item.amount}
                delivery={item.delivery === '1'}
                onPress={() => props.selectShop(item)}
                checked={props.shopId === item.id}
              />
            );
          })}
        </View>
      </ScrollView>
      <Button
        style={{ marginHorizontal: 8 }}
        onPress={props.saveShop}
        value="Сохранить"
      />
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    backgroundColor: colors.white,
    height: '100%',
    paddingVertical: 16,
  },
  topSection: {
    width: '100%',
    paddingHorizontal: 8,
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
  },
});

export default SelectBuyShopView;
