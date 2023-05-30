import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {Input, Button, DatePicker} from '../../components';

import {colors} from '../../styles';
import {Linking} from 'react-native';

const RegistrationScreenView = ({
  loading,
  phoneNumber,
  name,
  lastname,
  email,
  pickerMode,
  birthDay,
  setPhoneNumber,
  setName,
  setPickerMode,
  setEmail,
  setBirthDay,
  handleRegistrationCode,
  phoneInput,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      style={styles.container}>
      <ScrollView style={styles.paddingHorizontal}>
        <Input
          enablesReturnKeyAutomatically={true}
          returnKeyType={'next'}
          title="Номер телефона"
          placeholder="+7 (999) 999-99-99"
          keyboardType="number-pad"
          setRef={ref => (phoneInput = ref)}
          mask={'custom'}
          options={{
            mask: '+7 (999) 999 99 99',
            getRawValue: function (value, settings) {
              return value.replace('+7', '8').replace(/\s|\(|\)/g, '');
            },
          }}
          value={phoneNumber}
          image={false}
          onChangeText={text => {
            setPhoneNumber(text);
          }}
        />
        <Input
          enablesReturnKeyAutomatically={true}
          returnKeyType={'next'}
          title="Имя Фамилия"
          placeholder="Имя Фамилия"
          value={name}
          image={false}
          onChangeText={text => setName(text)}
        />
        <DatePicker
          title="Дата рождения"
          date={birthDay}
          onConfirm={date => setBirthDay(date)}
        />
        <Input
          enablesReturnKeyAutomatically={true}
          returnKeyType={'next'}
          title="Email"
          placeholder="email@example.ru"
          value={email}
          image={false}
          onChangeText={text => setEmail(text)}
        />
        <View style={styles.privacy}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://vinsklad.ru/upload/soglasie_na_obrabotku_dannykh.pdf',
              )
            }>
            <Text style={styles.privacyText}>
              Нажимая на кнопку, я принимаю условия{'\n'}
              <Text style={styles.hightlighted}>
                правил пользования торговой площадкой
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          style={styles.button}
          loading={loading}
          value="Зарегистрироваться"
          disabled={!name && !lastname && !phoneNumber && !email && !birthDay}
          onPress={handleRegistrationCode}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
  4;
};

const styles = RNStyles.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  paddingHorizontal: {
    paddingHorizontal: 8,
    flex: 1,
  },
  button: {
    marginVertical: 24,
  },
  privacy: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyText: {
    color: colors.lightGray,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 22,
  },
  hightlighted: {
    color: colors.primary,
  },
});

export default RegistrationScreenView;
