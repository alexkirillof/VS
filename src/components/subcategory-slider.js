import React, {useState, useEffect, useRef} from 'react';
import {FlatList, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {b} from '../styles';
import Button from './button';

/**
 * Component description
 * @prop {function} setActiveCategory - срабатывает при смене категории
 * @prop {object} activeCategory - активная категория
 * @prop {array} subCategories - массив категорий
 */
const SubcategorySlider = props => {
  const ref = useRef(null);
  return (
    <FlatList
      ref={ref}
      style={styles.common}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      horizontal={true}
      data={props.subCategories}
      keyExtractor={item => `${item.ID}`}
      renderItem={({item, index}) => (
        <View
          style={
            index === 0
              ? styles.firstItem
              : index === props.subCategories.length - 1
              ? styles.lastItem
              : styles.item
          }>
          <Button
            onPress={() => {
              ref.current.scrollToItem({
                animated: true,
                item: item,
                viewPosition: 0.5,
              });
              props.setActiveCategory(item);
            }}
            active={item.ID === props.activeCategory.ID}
            type="grayContainer"
            text={item.name}
            id={item.ID}
            key={item.ID}
          />
        </View>
      )}
    />
  );
};

const styles = EStyleSheet.create({
  firstItem: {
    marginLeft: b(16),
  },
  lastItem: {
    marginRight: b(16),
  },
  item: {
    marginRight: b(0),
    marginLeft: b(0),
  },
});

export default SubcategorySlider;
