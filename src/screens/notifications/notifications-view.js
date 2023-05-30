import React from 'react';
import { View, FlatList, Platform, Alert } from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import { EmptyNotifications, NotificationItem } from '../../components';

import { colors, screenWidth } from '../../styles';

const NotificationsView = props => {
  props.openCheckAllModal &&
    Alert.alert('', 'Отметить все уведомления как прочитанные?', [
      {
        text: 'Отмена',
        onPress: () => props.setOpenCheckAllModal(false),
        style: 'cancel',
      },
      {
        text: 'Прочитать',
        onPress: props.checkAllNotifications,
      },
    ]);

  return (
    <View style={styles.common}>
      <FlatList
        overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
        contentContainerStyle={styles.container}
        data={props.notifications}
        extraData={props.notifications}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => !props.loadgin && (<EmptyNotifications />)}
        renderItem={({ item }) => (
          <NotificationItem
            onPress={() => {
              props.setViewed(item.id);
              if (item.product_id) {
                props.navigation.navigate('ProductStack', {
                  screen: 'Product',
                  params: {
                    productId: item.product_id,
                  },
                });
              } else if (item.section_id) {
                props.navigation.navigate('CategoryStack', {
                  screen: 'ProductList',
                  params: {
                    categoryId: item.section_id,
                  },
                });
              } else if (item.order_id) {
                props.navigation.navigate('OrdersHistoryStack', {
                  screen: 'Order',
                  params: {
                    orderId: item.order_id,
                  },
                });
              }
            }}
            key={item.id}
            {...item}
          />
        )}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    backgroundColor: colors.white,
    height: '100%',
  },
  container: {
    backgroundColor: colors.white,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '900',
    paddingBottom: 12,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  image: {
    height: `${screenWidth / 2.2}`,
    width: '100%',
    marginBottom: 24,
  },
});

export default NotificationsView;
