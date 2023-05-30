import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import RNStyles from '@tapston/react-native-styles';
import {Button, Icon} from '../../components';

import {colors, screenWidth} from '../../styles';

const FiltersView = ({
  filters,
  navigation,
  selected,
  setSelected,
  setFilter,
  setAllFilters,
  selectedFilters,
}) => {
  return (
    <SafeAreaView style={styles.common}>
      <ScrollView
        overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
        showsVerticalScrollIndicator={false}>
        <View style={styles.filtesList}>
          {filters.map(item => {
            return item.type !== 'N' ? (
              <TouchableOpacity
                key={item.code}
                style={styles.filterItem}
                onPress={() => {
                  navigation.navigate('Filters', {
                    code: item.code,
                    values: item.values,
                    selected: selected,
                    screenName: item.title,
                  });
                }}>
                <View style={styles.titleContainer}>
                  {selectedFilters.hasOwnProperty(item.code) &&
                  Object.values(selectedFilters[item.code]).length > 0 ? (
                    <View style={styles.filterSelectedContainer}>
                      <View style={styles.filterSelected} />
                    </View>
                  ) : null}
                  <Text style={styles.filterTitle}>{item.title}</Text>
                </View>
                <View style={styles.arrow}>
                  <Icon name="arrow-back" />
                </View>
              </TouchableOpacity>
            ) : (
              <View key={item.code} style={styles.containerItemPrice}>
                <TouchableOpacity style={styles.filterItemPrice}>
                  <Text style={styles.filterTitle}>{item.title}</Text>
                </TouchableOpacity>
                <View style={styles.sliderContainer}>
                  <MultiSlider
                    values={
                      selectedFilters.hasOwnProperty(item.code)
                        ? Object.values(selectedFilters[item.code])
                        : Object.values(item.values)
                    }
                    sliderLength={screenWidth - 65}
                    onValuesChange={values =>
                      setSelected({
                        [item.code]: {
                          from: values[0],
                          to: values[1],
                        },
                      })
                    }
                    onValuesChangeFinish={values =>
                      setFilter(item.code, values)
                    }
                    selectedStyle={{backgroundColor: colors.primary}}
                    markerStyle={styles.markerStyle}
                    min={item.values.MIN - 1}
                    max={item.values.MAX + 1}
                    step={1}
                  />
                </View>
                <View style={styles.priceLabels}>
                  <Text style={styles.label}>
                    {selected.hasOwnProperty(item.code)
                      ? selected[item.code].from
                      : selectedFilters.hasOwnProperty(item.code)
                      ? selectedFilters[item.code].from
                      : item.values.MIN}
                  </Text>
                  <Text style={styles.label}>
                    {selected.hasOwnProperty(item.code)
                      ? selected[item.code].to
                      : selectedFilters.hasOwnProperty(item.code)
                      ? selectedFilters[item.code].to
                      : item.values.MAX}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Button
        style={styles.button}
        value="Применить"
        onPress={() => {
          setAllFilters(selected);
        }}
      />
    </SafeAreaView>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
    padding: 16,
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtesList: {
    padding: 8,
  },
  filterItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 20,
    lineHeight: 24,
  },
  filterSelectedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterSelected: {
    square: 12,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    marginRight: 8,
  },
  containerItemPrice: {
    maxWidth: `${screenWidth}`,
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray,
  },
  filterItemPrice: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 16,
  },
  arrow: {
    transform: [{rotate: '180deg'}],
  },
  priceLabels: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    width: 110,
    fontSize: 18,
    padding: 8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.gray,
  },
  button: {
    marginHorizontal: 8,
  },
  markerStyle: {
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.grayShadow,
  },
});

export default FiltersView;
