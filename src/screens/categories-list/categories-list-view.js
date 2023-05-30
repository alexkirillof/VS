import React from 'react';
import {ScrollView, View, Platform} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import {colors} from '../../styles';
import {CategoryItem} from '../../components';

/**
 * Страница CategoriesListView -> список категорий товаров
 * @prop {Object} navigation - react navigation
 * @prop {boolean} loading - статус загрузки
 * @prop {Array} data - данные категорий товаров
 * @prop {string} error - текст ошибки
 */
const CategoriesListView = props => {
  return (
    <ScrollView
      overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
      style={styles.wrapper}>
      <View style={styles.container}>
        {props.data.map(item => (
          <View style={styles.itemWrapper} key={item.id}>
            <CategoryItem
              name={item.name}
              onPress={() => {
                !item.child || item.child === 0
                  ? props.navigation.navigate('ProductList', {
                      categoryId: item.id,
                      categoryName: item.name,
                    })
                  : props.navigation.navigate('SubCategories', {
                      parentId: item.id,
                      categoryName: item.name,
                    });
              }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = RNStyles.create({
  wrapper: {
    backgroundColor: colors.white,
  },
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemWrapper: {
    width: '100%',
  },
});

export default CategoriesListView;
