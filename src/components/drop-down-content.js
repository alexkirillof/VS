import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {animateLayout} from '@tapston/react-native-animation';

import Icon from './icon';
import {colors, fonts} from '../styles';
import {TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Component DropDownContent
 * @prop {string} descriptionName - название дроп дауна
 * @prop {boolean} fontBoldText - жирный шрифт для текста
 * @prop {boolean} paddingHorizontal - горизонтальные отступы
 */
const DropDownContent = props => {
  const [toggle, setToggle] = useState(false);
  const styles = getStyle(props.fontBoldText, toggle);

  useEffect(() => {
    animateLayout();
  }, [toggle]);

  return (
    <View style={styles.common}>
      <TouchableOpacity
        activeOpacity={TOUCHABLE_OPACITY_VALUE}
        style={styles.container}
        onPress={() => setToggle(!toggle)}>
        <Text
          style={
            props.fontBoldText
              ? [styles.text, styles.fontBoldText]
              : styles.text
          }>
          {props.descriptionName}
        </Text>
        <TouchableOpacity
          activeOpacity={TOUCHABLE_OPACITY_VALUE}
          onPress={() => setToggle(!toggle)}
          style={styles.dropRoute}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={[styles.contentContainer, {display: toggle ? 'flex' : 'none'}]}>
        {props.children}
      </View>
    </View>
  );
};

const getStyle = (fontBoldText, toggle) => {
  return RNStyles.create({
    dropRoute: {
      width: 40,
      alignItems: 'center',
      transform: toggle ? [{rotate: '90deg'}] : [{rotate: '270deg'}],
    },
    route: {
      width: 14,
      height: 6,
    },
    routeActive: {
      width: 14,
      height: 6,
      transform: [{rotate: toggle ? '90deg' : '270deg'}],
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    text: {
      fontFamily: fonts.textSemibold,
      color: colors.text.black,
      fontSize: 20,
      lineHeight: 22,
      marginTop: 16,
      marginBottom: 8,
    },
    fontBoldText: {
      fontFamily: fonts.textSemibold,
      color: colors.black,
      fontSize: 20,
      lineHeight: 24,
    },
  });
};

export default DropDownContent;
