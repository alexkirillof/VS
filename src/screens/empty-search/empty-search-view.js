import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Icon, Button} from '../../components';
import {b, fontWeight} from '../../styles';

const EmptySearchView = props => {
  return (
    <View style={styles.common}>
      <View style={styles.containerIcon}>
        <Icon name="emptySearch" />
      </View>
      <View style={styles.containerText}>
        <Text>😢</Text>
        <Text style={styles.message}>
          Простите, по вашему запросу товаров не найдено
        </Text>
      </View>
      <View style={styles.buttonCont}>
        <Button text="На главную" />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  common: {
    paddingHorizontal: b(16),
  },
  containerIcon: {
    alignItems: 'center',
  },
  containerText: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: b(20),
    lineHeight: b(30),
    textAlign: 'center',
    marginTop: b(4),
  },
  boldWord: {
    fontWeight: fontWeight.bold,
  },
  buttonCont: {
    marginTop: b(26),
  },
});

export default EmptySearchView;
