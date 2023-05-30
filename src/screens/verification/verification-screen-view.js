import React from 'react';
import {View, KeyboardAvoidingView, Platform, Text} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import RNStyles from '@tapston/react-native-styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../components';

import {colors, screenHeight} from '../../styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const VerificationScreenView = ({
  loadingButton,
  phone,
  code,
  setCode,
  disableButton,
  handleCheckCode,
  setFilled,
  filled,
  showTimer,
  timer,
  resendCode,
}) => {
  const insets = useSafeAreaInsets();
  const styles = getStyles(insets);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      style={[styles.container, styles.paddingHorizontal]}>
      <View>
        <Text style={styles.title}>Введите код</Text>
        <Text style={styles.text}>
          СМС-код отправлен {'\n'}Ваш номер {phone}
        </Text>
        <View style={styles.codeInput}>
          <SmoothPinCodeInput
            cellStyle={{
              borderBottomWidth: 2,
              borderColor: colors.darkGray,
            }}
            cellStyleFocused={{
              borderColor: colors.primary,
            }}
            value={code ? code.toString() : ''}
            onFulfill={() => setFilled(true)}
            onBackspace={() => setFilled(false)}
            onTextChange={text => setCode(text)}
          />
        </View>
        <Button
          style={{marginTop: 48}}
          loading={loadingButton}
          value="Войти"
          disabled={!filled && !disableButton}
          onPress={handleCheckCode}
        />
      </View>
      {showTimer ? (
        <View style={styles.resend}>
          <Text style={styles.resendTitle}>Код успешно отправлен</Text>
          <Text style={styles.resendButton}>{timer}</Text>
        </View>
      ) : (
        <View style={styles.resend}>
          <Text style={styles.resendTitle}>Не получили код?</Text>
          <TouchableOpacity onPress={resendCode}>
            <Text style={styles.resendButton}>Отправить повторно</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const getStyles = insets => {
  return RNStyles.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    paddingHorizontal: {
      paddingHorizontal: 16,
    },
    codeInput: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 32,
      marginBottom: 32,
      marginTop: 32,
      fontWeight: 'bold',
    },
    otherTypeLoginText: {
      marginTop: 36,
      color: colors.turquoise,
      fontSize: 14,
      textAlign: 'center',
    },
    text: {
      color: colors.darkGrey,
      textAlign: 'center',
      fontSize: 18,
      lineHeight: 24,
      marginTop: 12,
      marginBottom: 48,
    },
    block: {
      marginTop: `${screenHeight * 0.05}`,
    },
    input: {
      // fontSize: 22,
      fontWeight: '600',
    },
    modalWinPadding: {
      paddingBottom: insets.bottom,
    },
    button: {
      width: '100%',
      marginTop: 36,
      flexDirection: 'row',
    },
    resend: {
      marginTop: 42,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    resendTitle: {
      fontSize: 18,
      color: colors.darkGray,
    },
    resendButton: {
      fontSize: 22,
      marginTop: 18,
      color: colors.primary,
    },
  });
};

export default VerificationScreenView;
