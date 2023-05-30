import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {PATTERN_EMAIL} from '../core/functions/index';

import {colors} from '../styles';

/**
 * Component description
 * @prop {type} name - description of the prop
 * @prop {boolean} multiline -
 * @prop {string} placeholder
 * @prop {boolean} errorText
 * @prop {string} type
 */
const TextInputView = props => {
  const [errorText, setErrorText] = useState('');
  const [onFocus, setOnFocus] = useState(false);
  const [inputText, setInputText] = useState('');
  return (
    <View
      style={[
        styles.common,
        onFocus ? styles.borderOnFocus : {},
        errorText ? styles.borderErrorOnFocus : {},
      ]}>
      {props.errorText && <Text style={styles.errorText}>{errorText}</Text>}
      <TextInput
        style={
          props.multiline
            ? [styles.textMultiline, styles.text]
            : [styles.textI, styles.text]
        }
        multiline={props.multiline}
        placeholder={props.placeholder}
        placeholderTextColor={colors.text.grayPrice}
        onFocus={() => {
          setOnFocus(true);
          setErrorText('');
        }}
        onBlur={() => {
          setOnFocus(false);
          if (inputText.length > 0) {
            if (props.type === 'email') {
              PATTERN_EMAIL.test(inputText)
                ? setErrorText('')
                : setErrorText('Некорректная почта');
            }
          } else {
            setErrorText('');
          }
        }}
        selectionColor={colors.text.black}
        value={props.textInput}
        onChangeText={value => {
          props.onChangeText(value);
          setInputText(value);
        }}
      />
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
  },
  defaultBorder: {
    borderColor: colors.black,
  },
  borderOnFocus: {
    borderWidth: 2,
    borderColor: colors.black,
  },
  borderErrorOnFocus: {
    borderWidth: 2,
    borderColor: colors.red,
  },
  text: {
    width: '100%',
    fontSize: 16,
    padding: 0,
    lineHeight: 20,
    color: colors.black,
  },
  textMultiline: {
    textAlignVertical: 'top',
    height: 150,
  },
  errorText: {
    fontSize: 10,
    lineHeight: 12,
    color: colors.red,
    position: 'absolute',
    left: 14,
    top: 2,
  },
});

export default TextInputView;
