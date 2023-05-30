import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Input, Button} from '../../components';

import {colors, screenHeight, fontWeight, fonts} from '../../styles';

const AuthScreenView = ({
  navigation,
  loading,
  phoneNumber,
  setPhoneNumber,
  handleSendCode,
}) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      style={styles.container}>
      <ScrollView style={styles.paddingHorizontal} indicatorStyle="black">
        <View style={styles.block}>
          <Text style={styles.text}>
            Введите номер телефона {'\n'} для авторизации
          </Text>
          <Input
            title="Номер телефона"
            value={phoneNumber}
            keyboardType="number-pad"
            placeholder={'+7 (999) 999 99 99'}
            mask={'custom'}
            options={{
              mask: '+7 (999) 999 99 99',
            }}
            image={false}
            onChangeText={text => setPhoneNumber(text)}
          />
          <Button
            loading={loading}
            value="Войти"
            disabled={phoneNumber.length <= 0 || loading}
            onPress={handleSendCode}
            styles={{marginTop: 20, width: '100%'}}
          />
        </View>
        <View style={styles.button}>
          <Text style={styles.regTitle}>Еще не зарегистрировались?</Text>
          <Pressable
            style={styles.registrationButton}
            onPress={() =>
              navigation.navigate('Registration', {
                phoneNumber: phoneNumber,
              })
            }>
            <Text style={styles.registrationTitle}>Зарегистрироваться</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AuthScreenView.propTypes = {};
AuthScreenView.defaultProps = {};

const getStyles = insets => {
  return RNStyles.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    paddingHorizontal: {
      paddingHorizontal: 16,
      flex: 1,
    },
    title: {
      alignSelf: 'center',
      fontSize: 32,
      marginBottom: 32,
      marginTop: 32,
      fontWeight: fontWeight.bold,
    },
    buttonMargin: {
      marginBottom: 40,
    },
    otherTypeLoginText: {
      marginTop: 36,
      color: colors.turquoise,
      fontSize: 14,
      textAlign: 'center',
    },
    text: {
      fontFamily: fonts.primaryRegular,
      color: colors.darkGrey,
      textAlign: 'center',
      fontSize: 22,
      lineHeight: 26,
      marginTop: 12,
      marginBottom: 48,
    },
    block: {
      marginTop: `${screenHeight * 0.05}`,
    },
    input: {
      fontWeight: 'bold',
    },
    modalWinPadding: {
      paddingBottom: insets.bottom,
    },
    regTitle: {
      fontFamily: fonts.heading,
      fontWeight: 'bold',
      paddingBottom: 16,
      fontSize: 18,
    },
    button: {
      color: colors.black,
      width: '100%',
      textAlign: 'center',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginTop: 60,
    },
    registrationButton: {
      borderColor: colors.primary,
      paddingVertical: 8,
      borderWidth: 1,
      borderRadius: 8,
      width: '100%',
    },
    registrationTitle: {
      fontFamily: fonts.heading,
      fontWeight: '900',
      textAlign: 'center',
      color: colors.primary,
      fontSize: 22,
      lineHeight: 26,
    },
  });
};

export default AuthScreenView;
