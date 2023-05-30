import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNStyles from '@tapston/react-native-styles';
import {ScrollView} from 'react-native-gesture-handler';

import {Button, ShopItem} from '../../components';

import {colors, fontWeight} from '../../styles';

const LaunchThirdView = props => {
  if (props.loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.common}>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, width: '100%'}}>
          {props.shops.map(item => {
            return (
              <ShopItem
                key={item.id}
                name={item.name}
                workTime={item.schedule}
                onPress={() => props.selectShop(item)}
                checked={props.shopId === item.id}
              />
            );
          })}
        </ScrollView>
        <View style={styles.button}>
          <Button
            onPress={() => props.navigation.navigate('MainStack')}
            value="Далее"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
  },
  topSection: {
    width: '100%',
    paddingHorizontal: 16,
  },
  listItem: {
    color: colors.text.black,
    fontSize: 20,
    fontWeight: fontWeight.bold,
    marginRight: 16,
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
    width: '100%',
  },
  screenTitle: {
    textAlign: 'left',
    width: '100%',
    paddingVertical: 22,
    marginBottom: 26,
    color: colors.text.black,
    fontSize: 26,
    fontWeight: fontWeight.bold,
  },
  button: {
    marginBottom: 8,
    flexDirection: 'row',
  },
});

export default LaunchThirdView;
