import React from 'react';
import {FlatList, View, Text, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNStyles from '@tapston/react-native-styles';
import {Button, PreloaderFullscreen, HistoryItem} from '../../components';
import {screenWidth, ImagesDefault, colors} from '../../styles';
import {ScrollView} from 'react-native-gesture-handler';

const OrdersHistoryView = props => {
  if (props.loading) {
    return <PreloaderFullscreen />;
  }

  if (props.orders.length <= 0) {
    return (
      <View style={[styles.content, styles.noContent]}>
        <ScrollView>
          <FastImage
            source={ImagesDefault.noOrders}
            style={styles.image}
            resizeMode={'contain'}
          />
          <Text style={styles.title}>Вы пока ничего не купили</Text>
          <Text style={styles.text}>
            Сделайте свой первый заказ и здесь появятся купленные товары.
          </Text>
          <Button
            value="Выбрать товары"
            onPress={() => props.navigation.navigate('TabHome')}
          />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <FlatList
        overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
        style={styles.listWrapper}
        data={props.orders}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <HistoryItem
            onPress={() =>
              props.navigation.navigate('Order', {orderId: item.id})
            }
            key={item.id}
            name={item.number}
            date={item.date}
            status={item.status}
            total={item.price}
          />
        )}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

const styles = RNStyles.create({
  content: {
    height: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 8,
  },
  noContent: {
    paddingTop: 124,
  },
  image: {
    height: `${screenWidth / 1.8}`,
    width: '100%',
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 48,
  },
  wrapper: {
    paddingVertical: 16,
  },
});

export default OrdersHistoryView;
