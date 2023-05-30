import React from 'react';
import {View, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {colors, fontWeight} from '../styles';
import ListItem from './list-item';

/**
 * Component description
 * @prop {type} name - description of the prop
 */
const HomeCategories = ({navigation, categoryList = [], favorites}) => {
  return (
    <View style={styles.common}>
      <ListItem
        key={-2}
        position={0}
        arrow={false}
        icon={'heart'}
        fill="#FFF"
        stroke={favorites.length > 0 ? colors.primary : '#363434'}
        name={`Избранное  (${favorites?.length})`}
        primary={favorites.length > 0}
        onPress={() => {
          navigation.navigate('FavoritesStack');
        }}
      />

      {categoryList.map((el, index) => {
        return (
          <ListItem
            key={el.id}
            position={index + 1}
            name={el.name}
            icon={el.icon}
            arrow={false}
            onPress={() => {
              navigation.navigate('CategoryStack', {
                screen: 'ProductList',
                params: {
                  categoryId: el.id,
                  categoryName: el.name,
                },
              });
            }}
          />
        );
      })}
    </View>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textMain: {
    fontSize: 22,
    lineHeight: 24,
    color: colors.black,
    fontWeight: fontWeight.bold,
    '@media (max-height: 568)': {
      fontSize: 16,
    },
  },
  headerBlock: {
    marginTop: 24,
    marginBottom: 20,
    paddingBottom: 4,
    borderBottomWidth: 4,
    borderBottomColor: colors.primary,
  },
});

export default HomeCategories;
