import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import {colors, screenWidth} from '../styles';
import Icon from './icon';
import {TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Search input
 * @prop {string} placeholder - input placeholder
 * @prop {string} value - input value
 * @prop {function} onChange - return input value
 * @prop {Object} style - input styles
 * @prop {boolean} autoFocus - input autofocus
 */
const SearchInput = ({
  placeholder = 'Поиск',
  value = '',
  autoFocus = true,
  onChange,
  editable = true,
  style = {},
}) => {
  const [valueInput, setValueInput] = useState('');

  useEffect(() => {
    setValueInput(value);
    return () => {
      setValueInput('');
    };
  }, [value]);

  return (
    <View style={{...styles.common, ...style}}>
      <Icon name="search-input-icon" />
      <TextInput
        editable={editable}
        autoFocus={autoFocus}
        value={valueInput}
        placeholderTextColor={colors.text.grayPrice}
        onChange={({nativeEvent: {text}}) => {
          setValueInput(text);
          onChange ? onChange(text) : null;
        }}
        style={styles.input}
        placeholder={placeholder}
      />
      {valueInput.length > 0 ? (
        <TouchableOpacity
          activeOpacity={TOUCHABLE_OPACITY_VALUE}
          style={styles.clear}
          onPress={() => {
            onChange ? onChange('') : null;
            setValueInput('');
          }}>
          <Icon name="search-input-close" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
    height: 38,
    flexDirection: 'row',
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  input: {
    flex: 1,
    color: colors.black,
    width: `${screenWidth - 16}`,
    marginLeft: 8,
    marginRight: 24,
    height: 48,
    flexWrap: 'wrap',
  },
  clear: {
    position: 'absolute',
    right: 8,
  },
});

export default SearchInput;
