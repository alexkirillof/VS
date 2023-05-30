import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import analytics from '@react-native-firebase/analytics';
import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {Linking} from 'react-native';

export const log = (variant = 'default', text = 'Hello world', data) => {
  var consoleStyles = {
    default: 'color: Orchid;',
    info: 'color: SkyBlue;',
    warn: 'color: Khaki;',
    error: 'color: red;',
    astorage: 'color: Coral;',
    cloud: 'color: LightSkyBlue;',
    user: 'color: PaleGreen;',
  };
  const finishText = () => {
    switch (variant) {
      case 'error':
        return `[ERROR]${text}`;
      case 'warn':
        return `[WARN]${text}`;
      case 'info':
        return `[INFO]${text}`;
      default:
        return text;
    }
  };
  if (__DEV__) {
    return console.log(
      '%c%s',
      consoleStyles[variant],
      finishText(),
      data ? '--->>> ' : '',
      data || '',
    );
  }
};

export const hitSlop = {
  left: 15,
  right: 15,
  top: 15,
  bottom: 15,
};

export const checkStoragePermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        (await PermissionsAndroid.check('android.permission.CAMERA')) &&
        (await PermissionsAndroid.check(
          'android.permission.READ_EXTERNAL_STORAGE',
        )) &&
        (await PermissionsAndroid.check(
          'android.permission.WRITE_EXTERNAL_STORAGE',
        ))
      ) {
        return true;
      } else {
        Alert.alert(
          'Error',
          'No permission to use the camera',
          [
            {
              text: 'Close',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
        return false;
      }
    } else {
      if (__DEV__) {
        return true;
      }
      const statuses = await requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]);
      console.log(Object.values(statuses).every(el => el === 'UNAVAILABLE'));
      if (Object.values(statuses).every(el => el === 'granted')) {
        return true;
      } else {
        Alert.alert(
          'Error',
          'No permission to use the camera',
          [
            {
              text: 'Close',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
        return false;
      }
    }
  } catch (err) {
    console.warn(err);
    Alert.alert(
      'Error',
      'No permission to use the camera',
      [
        {
          text: 'Close',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
    return false;
  }
};

export const writeEmail = (subject, messageBody, ownEmail) => {
  // const subject = 'Message to the team';
  // const messageBody = 'Hello, ';
  // const ownEmail = 'info@vliga.com';

  const url = `mailto:${ownEmail}?subject=${subject}&body=${messageBody}`;
  console.log(url);
  openURL(url);
};

export const openURL = async url => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Unable to open this URL: ${url}`);
  }
};

export const activateAnalytics = async () => {
  try {
    await analytics().setAnalyticsCollectionEnabled(true);
  } catch (err) {
    console.log('err', err);
  }
};

export const trackScreenView = async screen => {
  await analytics().logScreenView({
    screen_name: screen,
    screen_class: screen,
  });
};

export const trackEvent = async (event, params) => {
  if (event) {
    await analytics().logEvent(event, params);
  }
};

export const sortPrices = pricing => {
  delete pricing.bonus;
  const prices = Object.values(pricing).filter(el => el > 0.1);
  return prices.sort((a, b) => !a - !b || a - b).reverse();
};
