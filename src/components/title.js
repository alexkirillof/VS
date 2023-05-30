import React from 'react';
import RNStyles from '@tapston/react-native-styles';
import TextTicker from 'react-native-text-ticker';
import {fonts} from '../styles';

const Title = ({screenName = ''}) => {
  return (
    <TextTicker
      bounce={false}
      animationType="bounce"
      bounceSpeed={250}
      repeatSpacer={100}
      bounceDelay={50}
      numberOfLines={1}
      style={styles.screenName}>
      {screenName}
    </TextTicker>
  );
};

const styles = RNStyles.create({
  screenName: {
    fontFamily: fonts.heading,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 22,
    color: '#515151',
  },
});

export default Title;
