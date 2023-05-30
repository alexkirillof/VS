import React, {useState, useEffect} from 'react';
import {Switch, Platform, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import {colors} from '../styles';

/**
 * Component description
 * @prop {function(value)} onChange - callback change switcher
 * @prop {bool} value - value switcher
 */
const Switcher = ({onChange = () => {}, value}) => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setToggle(value);
  }, [value]);
  if (Platform.OS === 'ios') {
    return (
      <Switch
        value={toggle}
        onValueChange={check => {
          setToggle(check);
          onChange(check);
        }}
        tintColor="white"
        ios_backgroundColor={colors.background.switcherBackground}
      />
    );
  } else if (Platform.OS === 'android') {
    return (
      <Switch
        value={toggle}
        onValueChange={check => {
          setToggle(check);
          onChange(check);
        }}
        tintColor={colors.modalBackground.switcherDefault}
        onTintColor={colors.modalBackground.switcherActive}
        thumbTintColor={colors.white}
      />
    );
  }
};

const styles = RNStyles.create({
  common: {},
});

export default Switcher;
