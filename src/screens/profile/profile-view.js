import React from 'react';
import {ScrollView, Platform, View, Text, Alert, Linking} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {ProfileCategories} from '../../components';
import {APP_VERSION} from '../../core/configs';
import {colors} from '../../styles';

const createLogoutAlert = signOut =>
  Alert.alert(
    'Вы точно хотите выйти?',
    '',
    [
      {
        text: 'Нет',
        style: 'cancel',
      },
      {
        text: 'Да',
        onPress: () => {
          signOut();
        },
        style: 'destructive',
      },
    ],
    {cancelable: false},
  );
const ProfileView = ({data, navigation, signOut, favorites, notifications}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
        contentContainerStyle={{paddingHorizontal: 8}}>
        <ProfileCategories
          text="Мой профиль"
          icon={'user'}
          onPress={() => navigation.navigate('EditProfile')}
        />
        <ProfileCategories
          text="Избранное"
          icon={'heart'}
          highlighted={favorites?.length > 0}
          onPress={() =>
            navigation.navigate('Favorite', {
              screen: 'Favorite',
              params: {
                fromScreen: 'profile',
              },
            })
          }
        />
        <ProfileCategories
          text="Мои заказы"
          icon={'orders'}
          onPress={() => navigation.navigate('OrdersHistoryStack')}
        />
        <ProfileCategories
          text="Карта лояльности"
          icon={'sale'}
          onPress={() => navigation.navigate('LoyaltyStack')}
        />
        <ProfileCategories
          text="Подписка на рассылки"
          icon={'subscribe'}
          onPress={() => navigation.navigate('Notice')}
        />
        <ProfileCategories
          text="Наш телеграм канал"
          icon={'telegram'}
          onPress={() => Linking.openURL('https://t.me/vinskladshop')}
        />
        <ProfileCategories
          text="Наша группа в ВК"
          icon={'vk'}
          onPress={() => Linking.openURL('https://vk.com/vinsklad')}
        />
        {/* <ProfileCategories
      text="Связаться с разработчиками"
      onPress={() => navigation.navigate('ContactDevelopers')}
    /> */}
        {/* {START_APP_COUNT > 5 && <ProfileCategories text="Оценить приложение" />} */}
        <ProfileCategories
          text="Выход"
          icon={'exit'}
          onPress={() => {
            createLogoutAlert(signOut);
          }}
        />
        <View style={styles.versionContainer}>
          <Text style={styles.textContainer}>Версия</Text>
          <Text style={styles.textContainer}>{APP_VERSION}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    height: '100%',
    backgroundColor: colors.white,
  },
  versionContainer: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    fontSize: 12,
    color: colors.darkGray,
  },
});

export default ProfileView;
