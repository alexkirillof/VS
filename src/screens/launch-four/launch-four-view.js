import React from 'react';
import RNStyles from '@tapston/react-native-styles';
import {LaunchScreen} from '../../components';
// import LottieView from 'lottie-react-native';

const LaunchThirdView = props => {
  return (
    <LaunchScreen
      description="Регистрация бонуса"
      // topSection={<LottieView source={FourGif} autoPlay loop />}
      buttonText="Далее"
      bold
      blueButton
      buttonPress={() => {
        props.navigation.navigate('MainStack');
      }}
    />
  );
};

const styles = RNStyles.create({
  common: {},
});

export default LaunchThirdView;
