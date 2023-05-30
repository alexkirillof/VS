import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import FastImage from 'react-native-fast-image';
import {Button} from '../../components';

import {colors, fonts, ImagesDefault, screenWidth} from '../../styles';

const ForceUpdateView = props => {
  return (
    <SafeAreaView style={styles.common}>
      <FastImage
        style={styles.upgradeImg}
        source={ImagesDefault.updateLogo}
        resizeMode={'contain'}
      />

      <Text style={styles.upgradeTitleText}>Требуется обновление!</Text>
      <Text style={styles.upgradeText}>
        Мы добавили новые функции и исправили ошибки. Чтобы продолжить
        использование, вам необходимо обновить приложение!
      </Text>
      <Button
        style={styles.upgradeButton}
        value="Обновить"
        onPress={props.handleUrlUpdate}
      />
    </SafeAreaView>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    justifyContent: 'center',
    aligItems: 'center',
    backgroundColor: colors.white,
  },
  upgradeImg: {
    width: screenWidth / 1.5,
    height: screenWidth / 1.5,
    alignSelf: 'center',
    marginBottom: 24,
  },
  upgradeTitleText: {
    fontFamily: fonts.secondaryBold,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  upgradeText: {
    fontFamily: fonts.secondaryRegular,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
    paddingHorizontal: 24,
    marginBottom: 48,
  },
  upgradeButton: {
    marginHorizontal: 24,
  },
});

export default ForceUpdateView;
