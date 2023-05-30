import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNStyles from '@tapston/react-native-styles';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

import {colors, fonts, screenWidth} from '../styles';

const DatePicker = ({
  onConfirm = () => {},
  setRef = null,
  image = null,
  editable = true,
  title = '',
  format = 'DD.MM.YYYY',
  date = null,
  initialDate = '01.01.2002',
}) => {
  const [pickerMode, setPickerMode] = useState(false);

  return (
    <View style={styles.container}>
      {title ? <Text style={[styles.title]}>{title}</Text> : null}
      <TouchableOpacity
        onPress={() => setPickerMode(!pickerMode)}
        style={styles.inputContainer}>
        <View style={styles.inputWithout}>
          {image ? (
            <FastImage source={image} resizeMode="contain" style={styles.img} />
          ) : null}

          <Text style={styles.selectedDate}>
            {date
              ? moment(date, format).format(format)
              : moment(initialDate).format(format)}
          </Text>
          <DateTimePickerModal
            isVisible={pickerMode}
            mode="date"
            display={'spinner'}
            date={
              date
                ? moment(date, format).toDate()
                : moment(initialDate, format).toDate()
            }
            headerTextIOS={'Выберите дату'}
            confirmTextIOS={'Сохранить'}
            cancelTextIOS={'Отменить'}
            onConfirm={date => {
              onConfirm(moment(date).format(format));
              setPickerMode(!pickerMode);
            }}
            onCancel={() => setPickerMode(!pickerMode)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    flexDirection: 'column',
    marginVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputWith: {
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
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#dedce4',
    padding: 18,
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
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 2.5,
  },
  selectedDate: {
    fontSize: 18,
    fontFamily: fonts.primaryRegular,
    color: colors.text.black,
  },
});

export default DatePicker;
