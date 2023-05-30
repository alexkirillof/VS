import React from 'react';
import {View, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import {colors} from '../styles';
import HeaderDropdown from './header-dropdown';
import {declOfNum} from '../core/functions/semantics';

/**
 * Component description
 * @prop {number} countSearchItem - кол-во товаров
 * @prop {function} setSelectedFilter - функция возвращающая выбранный фиьтр
 * @prop {object} selectedFilter - активный фильтр
 * @prop {boolean} searchScreen - скрин поиска или нет
 */
const DropdownFilter = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.foundStaff}>
        {props.searchScreen
          ? `${declOfNum(props.countSearchItem || '...', [
              'Найден',
              'Найдено',
              'Найдено',
            ])} ${props.countSearchItem || '...'} ${declOfNum(
              props.countSearchItem || '...',
              ['товар', 'товара', 'товаров'],
            )}`
          : `${props.countSearchItem || '...'} ${declOfNum(
              props.countSearchItem || '...',
              ['товар', 'товара', 'товаров'],
            )}`}
      </Text>
      <HeaderDropdown
        type="small"
        fontSize="adaptive"
        widthAndroid={150}
        initialItem={props.selectedFilter}
        selection={filter => {
          if (filter.value !== props.selectedFilter) {
            props.setSelectedFilter(filter);
          }
        }}
        options={[
          {label: 'По алфавиту (А-Я)', value: 'abc'},
          {label: 'По алфавиту (Я-А)', value: 'zyx'},
          {label: 'По популярности', value: 'popular'},
          {label: 'По рейтингу', value: 'rate'},
          {label: 'По возрастанию цены', value: 'price-up'},
          {label: 'По убыванию цены', value: 'price-down'},
        ]}
      />
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  foundStaff: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.black,
  },
});

export default DropdownFilter;
