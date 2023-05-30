import {Dimensions, PixelRatio} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

const {height, width} = Dimensions.get('window');
export const screenHeight = height;
export const screenWidth = width;
export const ratio = PixelRatio.get();

export const colors = {
  white: '#FFFFFF',
  black: '#363434',
  primaryBlack: '#363434',
  primary: '#e31e24',
  secondary: '#e31e24',
  red: '#FF3B31',
  yellow: '#FFCC00',
  gray: '#EAEAEA',
  darkGray: '#363434',
  lightGray: '#515151',
  btnGray: '#9D9B9B',
  grayShadow: 'rgba(216,216,216, 0.5)',
  notification: 'rgba(239,253,247, .5)',
  grayPrice: '#A7A7A7',
  text: {
    white: '#FFFFFF',
    black: '#222222',
    primaryBlack: '#4A4A4A',
    primary: '#e31e24',
    redPrimary: '#E02020',
    grayPrice: '#A7A7A7',
    green: '#4CD964',
  },
  background: {
    white: '#FFFFFF',
    black: '#222222',
    gray: '#979797',
    buttonGray: '#E9E9E9',
    grayLight: '#CBCBCB',
    yellow: '#FFCC00',
    red: '#FF3B31',
    redOrange: '#E02020',
    primary: '#e31e24',
    primaryOrange: '#FA6400',
    switcherBackground: 'rgba(120,120,128,0.16)',
  },
  border: {
    blackSmall: 'rgba(0, 0, 0, 0.1)',
  },
  modalBackground: {
    black: 'rgba(0, 0, 0, 0.5)',
    white: 'rgba(255, 255, 255, 0.7)',
    switcherDefault: '#ededee',
    switcherActive: '#42ce69',
  },
};

export const fonts = {
  primaryRegular: 'SFProText-Regular',
  primaryMedium: 'SF Pro Text Semibold',
  primaryBold: 'SF Pro Text Bold',
  secondaryRegular: 'SF Pro Display',
  secondaryBold: 'SFProDisplay-Bold',
  heading: 'SF UI Display Heavy',
  textSemibold: 'SF UI Display Semibold',
};

export const fontWeight = {
  thin: '300',
  regular: '400',
  medium: '500',
  bold: '900',
};

export const ImagesDefault = {
  route: require('../materials/images/image/route.png'),
  splash: require('../assets/splash.png'),
  defaultImage: require('../assets/no-image.jpeg'),
  noFavorite: require('../assets/no-favorite.png'),
  empty: require('../assets/empty.png'),
  emptyNotifications: require('../assets/no-notifications.png'),
  noOrders: require('../assets/no-orders.png'),
  noLoyalty: require('../assets/no-loyalty.png'),
  LoyaltyCard: require('../assets/loyaltyCard.png'),
  LoyaltyBg: require('../assets/loyaltyBg.png'),
  notice: require('../assets/notice.png'),
  updateLogo: require('../assets/updateLogo.png'),
};

export const hitSlop = {
  top: RNStyles.h(16),
  right: RNStyles.w(16),
  bottom: RNStyles.h(16),
  left: RNStyles.w(16),
};

export const shadowConfig = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.09,
  shadowRadius: 10,
  '@media android': {
    borderWidth: 1,
    borderColor: colors.general10,
  },
};
