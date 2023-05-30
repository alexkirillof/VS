import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import {colors, fontWeight} from '../styles';
import Icon from './icon';
import {HIT_SLOP, TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Header Dropdown
 * @prop {Array[{label, value}]} options - массив элементов списка. Элемент типа object, состоящий из полей: label(то что выводится), value(id).
 * @prop {object{label, value}} initialItem - отображаемый элемент.
 * @prop {string} type - big, small, blue.
 * @prop {function({label, value})} selection - callback выбора элемента из списка.
 */
const HeaderDropdown = ({
  options = [],
  initialItem = options[0],
  type = 'big',
  fontSize,
  arrowCenter,
  selection = () => null,
}) => {
  const actionSheetRef = useRef();
  const [activeItem, setActive] = useState('');
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const styles = getStyles(type, fontSize);

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  useEffect(() => {
    const mapLabels = options.map(item => item.label);
    mapLabels.push('Отмена');
    setLabels(mapLabels);
    const mapValues = options.map(item => item.value);
    mapValues.push('exit');
    setValues(mapValues);
    setActive(mapLabels[mapValues.indexOf(initialItem)]);
  }, [initialItem]);
  return (
    <>
      <TouchableOpacity
        activeOpacity={TOUCHABLE_OPACITY_VALUE}
        style={styles.dropdownButton}
        hitSlop={HIT_SLOP}
        onPress={showActionSheet}>
        <Text style={styles.dropdownButtonText}>{activeItem}</Text>
        <View style={{position: 'relative', top: 0.8}}>
          <Icon name="arrow-bottom-small" />
        </View>
      </TouchableOpacity>

      <ActionSheet
        ref={actionSheetRef}
        options={labels}
        destructiveButtonIndex={6}
        onPress={index => {
          index !== 6 ? selection(values[index]) : null;
        }}
      />
    </>
  );
};

const getStyles = (type, fontSize) =>
  RNStyles.create({
    dropdown: {
      marginTop: -30,
    },
    dropdownButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: type === 'primary' ? colors.primary : 'transparent',
      padding: type === 'primary' ? 8 : 0,
      borderRadius: type === 'primary' ? 6 : 0,
    },
    dropdownButtonText: {
      fontSize:
        type === 'big' || type === 'primary'
          ? 18
          : type === 'smallMedium'
          ? 14
          : type === 'small'
          ? 14
          : 16,
      fontWeight:
        type === 'smallMedium' || type === 'primary'
          ? fontWeight.medium
          : fontWeight.regular,
      color: type === 'primary' ? colors.white : colors.black,
      marginRight: 4,
      '@media (max-height: 568px)': {
        fontSize:
          fontSize === 'adaptive'
            ? 16
            : type === 'small' && fontSize !== 'adaptive'
            ? 14
            : 18,
      },
    },
    dropdownItem: {
      paddingHorizontal: 16,
      padding: 12,
      borderTopColor: colors.gray,
      borderTopWidth: 1,
    },
    dropdownItemText: {
      fontSize: type === 'big' ? 18 : 16,
      lineHeight: type === 'big' ? 22 : 20,
      color: colors.black,
      fontWeight: fontWeight.regular,
    },
    pickerIOS: {
      backgroundColor: colors.white,
    },
    closeBarIOS: {
      backgroundColor: colors.gray,
      height: 44,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    closeButton: {
      color: colors.black,
      fontSize: 16,
    },
    acceptButton: {
      color: colors.primary,
      fontSize: 16,
    },
    wrapperIOS: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    common: {
      width: 150,
      height: 50,
      color: colors.black,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.modalBackground.black,
    },
    dropdownAndroidWrapper: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    dropdownAndroid: {
      width: '100%',
      paddingBottom: 20,
      backgroundColor: colors.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    dropdownHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
    },
    dropdownHeaderText: {
      fontSize: 16,
      color: colors.grayPrice,
    },
  });

export default HeaderDropdown;
