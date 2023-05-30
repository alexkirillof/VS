import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../styles';

const Label = ({text, ...restProps}) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});

export default memo(Label);
