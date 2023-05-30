import {Platform} from 'react-native';
import {getVersion, getBuildNumber} from 'react-native-device-info';

const API_PATH = 'https://newapi.vinsklad.ru';
//const API_PATH = "https://vinsklad.uvelirsoft.info";
const DADATA_PATH = 'https://suggestions.dadata.ru/suggestions/4_1/rs';
const DADATA_CLEANER_PATH = 'https://cleaner.dadata.ru/v1';
const API_CONTENT_TYPE = 'application/json';
const DADATA_TOKEN = '0705bb3b7efea96e10669a8ad9e4b8080c951d2b';
const DADATA_CLEAR_TOKEN = '4353b9e197e42afa78b8d4dba0e7a81d07d518fc';
const CURRENT_VERSION = getVersion() + '.' + getBuildNumber();
const PLAYSTORE_LINK = 'market://details?id=us.startmobile.vinestore';
const APPSTORE_LINK = 'itms-apps://itunes.apple.com.ru/app/id1450252717';
//const TOKEN = "1234567890";
const TOKEN =
  'mkJFN70Pzj1UMvh-3iHqlH80iik!7a!dLiNd9HgEA8eC2n-=ejeaRGwi077iXVxBpMN3MG0Np1onyhCpbJQW0l!zZbVnAtZQ6c/nU2k?y0IDB!IAcx=A/gD0b8=ujnccve392csHa6i-4wCW9OoYG?pZD=2yuB0KsXHrHPiEKaaNRzs1xu985teFEjGmfy1f-kUI3TWl62g/8BdKI-f66E7WuXt5l7xNv3utbUWxypXbwIatdyzkHb5rYL/B!XIV';

const CONFIG_RESPONDER = setOpenCounterId => {
  return {
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const {dx, dy} = gestureState;
      const sensativity = 6;
      if (
        dx > sensativity ||
        dx < -sensativity ||
        dy > sensativity ||
        dy < -sensativity
      ) {
        setOpenCounterId(null);
      }
      // return (
      //   dx > sensativity ||
      //   dx < -sensativity ||
      //   dy > sensativity ||
      //   dy < -sensativity
      // );
    },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      return false;
    },
  };
};

const APP_VERSION =
  Platform.OS === 'android'
    ? getVersion() + '.' + getBuildNumber()
    : getBuildNumber() + '.' + getVersion();

const HIT_SLOP = {
  top: 15,
  bottom: 15,
  left: 15,
  right: 15,
};

const TOUCHABLE_OPACITY_VALUE = 0.4;
export {
  TOUCHABLE_OPACITY_VALUE,
  HIT_SLOP,
  CONFIG_RESPONDER,
  API_PATH,
  API_CONTENT_TYPE,
  TOKEN,
  APP_VERSION,
  DADATA_PATH,
  DADATA_TOKEN,
  DADATA_CLEAR_TOKEN,
  DADATA_CLEANER_PATH,
  CURRENT_VERSION,
  PLAYSTORE_LINK,
  APPSTORE_LINK,
};
