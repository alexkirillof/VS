import React from 'react';
import {View, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {colors} from '../styles';
import {Picker} from '@react-native-picker/picker';

const Select = ({
  placeholder = 'Выберите вариант...',
  onChangeSelect = () => {},
  title = '',
  list = [],
  selected,
}) => {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.inputWithout}>
        <Picker onValueChange={onChangeSelect} selectedValue={selected}>
          <Picker.Item label={'Выберите вариант'} value={null} />
          {list.map(item => (
            <Picker.Item label={item.label} value={item.value} />
          ))}
        </Picker>
        {/* <RNPickerSelect
          style={{ inputAndroid: { color: 'black' } }}
          pickerProps={{ style: { overflow: 'hidden' } }}
          useNativeAndroidPickerStyle={true}
          placeholder={{
            label: placeholder,
          }}
          onValueChange={}
          items={list}
        /> */}
      </View>
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    flexDirection: 'column',
    marginVertical: 8,
  },
  inputWithout: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#dedce4',
    fontSize: 18,
    width: '100%',
    color: colors.black,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 2.5,
  },
});

export default Select;
