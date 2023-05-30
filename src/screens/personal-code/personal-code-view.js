import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Icon} from '../../components';
import {colors, screenWidth} from '../../styles';
import RNStyles from '@tapston/react-native-styles';

const PersonalCodeView = props => {
  return (
    <ScrollView style={styles.common} indicatorStyle="black">
      <Text style={styles.title}>Ваш персональный промокод</Text>
      <TouchableOpacity onPress={() => props.onShare(props.code)}>
        <Text style={styles.code}>{props.code}</Text>
      </TouchableOpacity>
      <View style={styles.codeList}>
        <Text style={styles.title}>Вам доступны промокоды</Text>
        {props.codesList && props.codesList.length > 0 ? (
          props.codesList.map(item => (
            <View key={item.code} style={styles.personalCodeItem}>
              <TouchableOpacity
                style={styles.copy}
                onPress={() => props.onShare(item.code)}>
                <Icon name="copy" fill={colors.primary} />
              </TouchableOpacity>
              <View style={styles.personalCodeText}>
                <Text style={styles.personalCode}>{item.code}</Text>
                <Text style={styles.personalCodeDate}>
                  {item.active_from} - {item.active_to}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.text}>
            Приглашайте друзей, и здесь появятся промокоды
          </Text>
        )}
      </View>
      <Text style={styles.title}>Партнерская программа Винный склад</Text>
      <Text style={styles.text}>
        Дарим вознаграждение за дружбу! Дарите и получайте скидки за
        рекомендации нашего магазина.
      </Text>
      <Text style={styles.text}>
        Скидка другу 25% на первый заказ на любую сумму по вашему персональному
        промокоду, скидка вам 10% за каждого нового покупателя
        интернет-магазина, кто воспользовался вашим персональным промокодом.
      </Text>
    </ScrollView>
  );
};

const styles = RNStyles.create({
  common: {
    width: `${screenWidth}`,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 24,
  },
  code: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.primary,
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
  },
  descriptionContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  codeList: {
    width: `${screenWidth}`,
  },
  personalCodeItem: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 12,
  },
  personalCodeText: {
    flexDirection: 'column',
  },
  personalCode: {
    color: colors.primary,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  personalCodeDate: {
    fontSize: 12,
    color: colors.darkGray,
  },
  copy: {
    width: 32,
    height: 32,
    marginRight: 16,
    justifyContent: 'flex-start',
  },
});

export default PersonalCodeView;
