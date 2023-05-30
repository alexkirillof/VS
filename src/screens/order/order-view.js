import React from 'react';
import { FlatList, View, Text } from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import WebView from 'react-native-webview';
import { Button, PreloaderFullscreen, ModalPopup } from '../../components';
import { screenWidth, colors } from '../../styles';

const OrderView = ({
  loading,
  order,
  handlePayment,
  paymentWindow,
  handleClose,
  handleWebViewNavigationStateChange,
  paymentUrl,
}) => {
  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <View style={styles.content}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View>
              <Text style={styles.listTitle}>Информация о заказе:</Text>
              <Text style={styles.title}>Номер: {order.number}</Text>
              <Text style={styles.title}>Дата заказа: {order.date}</Text>
              <Text style={styles.title}>Cтатус заказа: {order.status}</Text>
              <Text style={styles.title}>
                Сумма заказа: {order.price} {'\u20BD'}
              </Text>
              {order.payment.is_online && !order.payment.is_paid && (
                <Button
                  style={styles.button}
                  color="secondary"
                  onPress={handlePayment}
                  value="Оплатить"
                />
              )}
            </View>
            <View>
              <Text style={styles.listTitle}>Товары:</Text>
            </View>
          </>
        )}
        contentContainerStyle={styles.list}
        data={order.products}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <View style={styles.productList}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.inventory?.quantity} шт.</Text>
          </View>
        )}
      />
      {paymentWindow ? (
        <ModalPopup
          top={10}
          onRequestClose={handleClose}
          children={
            <WebView
              source={{ uri: paymentUrl }}
              style={styles.webViewStyle}
              onNavigationStateChange={newNavState =>
                handleWebViewNavigationStateChange(newNavState)
              }
            />
          }
        />
      ) : null}
    </View>
  );
};

const styles = RNStyles.create({
  content: {
    height: '100%',
    paddingHorizontal: 8,
    backgroundColor: colors.white,
  },
  button: {
    marginVertical: 16,
  },
  list: {
    marginTop: 16,
  },
  image: {
    height: `${screenWidth / 2.2}`,
    width: '100%',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 16,
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  wrapper: {
    paddingVertical: 16,
  },
  productList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  webViewStyle: {
    marginTop: 20,
    zIndex: -1,
  },
});

export default OrderView;
