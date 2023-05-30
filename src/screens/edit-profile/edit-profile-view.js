import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {Input, Button, DatePicker} from '../../components';

import {colors} from '../../styles';

const EditProfileView = ({
  loading,
  phoneNumber,
  userName,
  lastname,
  email,
  setPhoneNumber,
  setName,
  birthDay,
  setBirthDay,
  setEmail,
  handleRegistrationCode,
  phoneInput,
  deleteUserAccount,
}) => {
  const deleteUserAlert = () =>
    Alert.alert(
      'Вы точно хотите удалить аккаунт?',
      '',
      [
        {
          text: 'Нет',
          style: 'cancel',
        },
        {
          text: 'Да',
          onPress: deleteUserAccount,
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      style={styles.container}>
      <ScrollView
        style={styles.paddingHorizontal}
        showsVerticalScrollIndicator={false}>
        <Input
          title="Имя Фамилия"
          placeholder="Имя Фамилия"
          value={userName}
          image={false}
          onChangeText={text => setName(text)}
        />
        <Input
          editable={false}
          title="Номер телефона"
          placeholder="+7 (999) 999-99-99"
          keyboardType="number-pad"
          setRef={ref => (phoneInput = ref)}
          mask={'custom'}
          options={{
            mask: '+7 (999) 999 99 99',
            getRawValue: function (value) {
              return value.replace('+7', '8').replace(/\s|\(|\)/g, '');
            },
          }}
          value={phoneNumber}
          image={false}
          onChangeText={text => {
            setPhoneNumber(text);
          }}
        />
        <DatePicker
          title="Дата рождения"
          date={birthDay}
          onConfirm={date => setBirthDay(date)}
        />
        <Input
          title="Email"
          placeholder="email@vliga.com"
          value={email}
          image={false}
          onChangeText={text => setEmail(text)}
        />
        <View style={styles.button}>
          <Button
            loading={loading}
            value="Сохранить"
            disabled={
              userName === '' ||
              lastname === '' ||
              phoneNumber === '' ||
              email === ''
            }
            onPress={handleRegistrationCode}
          />
        </View>
        <View style={{paddingBottom: 80}} />
      </ScrollView>
      <TouchableOpacity
        onPress={deleteUserAlert}
        style={styles.deleteContainer}>
        <Text style={styles.deleteTextContainer}>Удалить аккаунт</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = RNStyles.create({
  container: {
    backgroundColor: colors.white,
    height: '100%',
    paddingHorizontal: 16,
  },
  deleteContainer: {
    marginBottom: 30,
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteTextContainer: {
    fontSize: 14,
    color: colors.red,
  },
});

export default EditProfileView;
