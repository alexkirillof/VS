import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNStyles from '@tapston/react-native-styles';
import {ScrollView} from 'react-native-gesture-handler';

import {ListItem} from '../../components';

import {colors, fontWeight} from '../../styles';

const LaunchSecondView = props => {
  if (props.loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.common}>
      <View style={styles.topSection}>
        <Text style={styles.screenTitle}>Выберите ваш город</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {props.regions.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => props.handleCities(item.id)}>
                <Text style={styles.listItem}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.content}>
        <ScrollView style={{flex: 1, width: '100%'}}>
          {props.cities.map(item => {
            return (
              <ListItem
                key={item.id}
                name={item.name}
                onPress={() => props.handleShops(item.id)}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
  },
  topSection: {
    flex: 0.22,
    paddingHorizontal: 16,
  },
  scrollList: {
    flex: 1,
  },
  listItem: {
    color: colors.text.black,
    fontSize: 20,
    fontWeight: fontWeight.bold,
    marginRight: 16,
  },
  content: {
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'flex-start',
    flex: 1,
  },
  screenTitle: {
    textAlign: 'left',
    width: '100%',
    paddingVertical: 22,
    marginBottom: 8,
    color: colors.text.black,
    fontSize: 26,
    fontWeight: fontWeight.bold,
  },
  description: {
    textAlign: 'center',
    width: '100%',
    paddingVertical: 38,
    paddingHorizontal: 20,
    color: colors.text.black,
    fontSize: 18,
    fontWeight: fontWeight.bold,
  },
  button: {
    color: colors.text.black,
    width: '100%',
    paddingBottom: 8,
  },
});

export default LaunchSecondView;
