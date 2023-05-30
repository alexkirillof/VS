import React from 'react';
import {View, Dimensions, TextInput, Text} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import RNStyles from '@tapston/react-native-styles';
import FastImage from 'react-native-fast-image';
import {colors, fonts} from '../styles';
const {height, width} = Dimensions.get('window');
export const screenHeight = height;
export const screenWidth = width;

const Input = ({
  placeholder = '',
  placeholderTextColor,
  onChangeText = () => {},
  value = '',
  autoFocus = false,
  setRef = null,
  secureTextEntry = false,
  maxLength = 36,
  image = null,
  keyboardType = 'default',
  returnKeyType = 'done',
  editable = true,
  multiline = false,
  title = '',
  mask = null,
  sheet = null,
  options = {},
  titleOpacity = 1,
  onFocus = () => {},
  onTouchStart = () => {},
  onSubmitEditing = () => {},
}) => {
  return (
    <View style={styles.container}>
      {title ? <Text style={[styles.title]}>{title}</Text> : null}
      <View style={styles.inputContainer}>
        {image ? (
          <FastImage source={image} resizeMode="contain" style={styles.img} />
        ) : null}
        {mask && (
          <TextInputMask
            type={mask}
            onTouchStart={onTouchStart}
            multiline={multiline}
            options={options}
            maxLength={maxLength}
            style={image ? styles.inputWith : styles.inputWithout}
            ref={setRef}
            autoFocus={autoFocus}
            placeholder={placeholder}
            onFocus={onFocus}
            placeholderTextColor={placeholderTextColor || '#bfbfbf'}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            autoCapitalize="none"
            value={value ? value.toString() : value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            editable={editable === true || editable === false ? editable : true}
          />
        )}
        {sheet && (
          <BottomSheetTextInput
            onTouchStart={onTouchStart}
            multiline={multiline}
            maxLength={maxLength}
            style={image ? styles.inputWith : styles.inputWithout}
            ref={setRef}
            autoFocus={autoFocus}
            placeholder={placeholder}
            onFocus={onFocus}
            placeholderTextColor={placeholderTextColor || '#bfbfbf'}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            autoCapitalize="none"
            value={value ? value.toString() : value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            editable={editable === true || editable === false ? editable : true}
          />
        )}
        {!mask && !sheet && (
          <TextInput
            onTouchStart={onTouchStart}
            multiline={multiline}
            maxLength={maxLength}
            style={image ? styles.inputWith : styles.inputWithout}
            ref={setRef}
            autoFocus={autoFocus}
            placeholder={placeholder}
            onFocus={onFocus}
            placeholderTextColor={placeholderTextColor || '#bfbfbf'}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            autoCapitalize="none"
            value={value ? value.toString() : value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            editable={editable === true || editable === false ? editable : true}
          />
        )}
      </View>
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    flexDirection: 'column',
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputWith: {
    fontFamily: fonts.primaryRegular,
    borderBottomWidth: 1,
    borderRadius: 20,
    borderColor: '#dedce4',
    paddingLeft: 40,
    paddingBottom: 8,
    fontSize: 18,
    maxWidth: `${screenWidth - 48}`,
    color: colors.text.black,
  },
  inputWithout: {
    fontFamily: fonts.primaryRegular,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#dedce4',
    padding: 16,
    fontSize: 18,
    width: '100%',
    color: colors.black,
  },
  img: {
    width: 20,
    height: 20,
    marginRight: -24,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.black,
    fontWeight: '900',
    marginBottom: 12,
    marginLeft: 2.5,
  },
});

export default Input;
