import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const config = async navigation => {
  PushNotification.configure({
    popInitialNotification: true,
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    onNotification: notification => {
      if (notification.foreground) {
        showPushData(notification);
      }
      if (notification.userInteraction) {
        handlePressPush(navigation, notification.data);
      }
      if (Platform.OS === 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NewData);
      }
    },
  });
  PushNotification.createChannel({
    channelId: 'vine',
    channelName: 'Винный склад',
    channelDescription: 'A channel for notifications',
    playSound: true,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  });
};

// export const init = async (navigation) => {
//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     showPushData(remoteMessage);
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//     handlePressPush(navigation, remoteMessage.data);
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//         handlePressPush(navigation, remoteMessage.data);
//       }
//     });

//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     handlePressPush(navigation, remoteMessage.data);
//     if (Platform.OS === 'ios') {
//       PushNotificationIOS.setApplicationIconBadgeNumber(1);
//     }
//   });

//   return unsubscribe;
// }

const handlePressPush = (navigation, notification) => {
  if (!navigation || !notification) {
    return;
  }

  if (notification.product) {
    navigation.navigate('MainStack', {
      screen: 'TabHome',
      params: {
        screen: 'ProductStack',
        params: {
          screen: 'Product',
          params: {
            productId: notification.product,
          },
        },
      },
    });
  } else if (notification.category) {
    navigation.navigate('MainStack', {
      screen: 'TabHome',
      params: {
        screen: 'CategoryStack',
        params: {
          screen: 'ProductList',
          params: {
            categoryId: notification.category,
            categoryName: notification.name ?? '',
          },
        },
      },
    });
  }
};

const showPushData = async remoteMessage => {
  PushNotification.localNotification({
    channelId: 'vine',
    ...remoteMessage,
    // title: remoteMessage.title,
    // message: remoteMessage.message,
    // userInfo: remoteMessage.data,
  });
};

export const requestPermission = async () => {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log(enabled);
    if (enabled) {
      const token = await messaging().getToken();
      return token;
    }
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (
      granted === PermissionsAndroid.RESULTS.GRANTED ||
      granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      const token = await messaging().getToken();
      return token;
    }
  }
};
