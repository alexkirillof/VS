import React from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import {ListItem, DropDownContent} from '../../components';

import {colors, fontWeight} from '../../styles';

const SelectCityView = props => {
  return (
    <SafeAreaView style={styles.common}>
      <ScrollView>
        {Object.values(props.regions).map((item, index) => {
          console.log('%c%s', 'color: magenta;', item.name);
          return (
            <DropDownContent
              key={index}
              descriptionName={item.name}
              children={item?.cities?.map(city => (
                <ListItem
                  key={city.id}
                  name={city.name}
                  onPress={() => props.handleShops(city)}
                />
              ))}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = RNStyles.create({
  common: {
    height: '100%',
    backgroundColor: colors.white,
    paddingBottom: 48,
  },
  listItem: {
    color: colors.grayPrice,
    backgroundColor: colors.grayShadow,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: fontWeight.bold,
    marginHorizontal: -8,
    padding: 8,
  },
});

export default SelectCityView;
