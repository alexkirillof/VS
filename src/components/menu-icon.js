import React from 'react';
import {View, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {useSelector} from 'react-redux';
import Icon from './icon';

import {colors} from '../styles';

/**
 * bottom menu icon
 * @prop {string} route - route name
 * @prop {string} color - icon color
 */
const MenuIcon = props => {
  const {basketLength} = useSelector(state => state.cart);

  const icon = () => {
    switch (props.route) {
      case 'Home':
        if (props.color === colors.text.primary) {
          return <Icon name="home" />;
        }
        return <Icon name="home" />;
      case 'Search':
        if (props.color === colors.text.primary) {
          return <Icon name="search" />;
        }
        return <Icon name="search" />;
      case 'Basket':
        return (
          <View style={styles.cart}>
            <Icon
              name={'cart'}
              fill={props.focused ? props.color : colors.darkGray}
            />
            {basketLength > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {basketLength > 99 ? '99+' : basketLength}
                </Text>
              </View>
            ) : null}
          </View>
        );
      case 'Profile':
        if (props.color === colors.text.primary) {
          return <Icon name="userActive" />;
        }
        return <Icon name="user" />;
      default:
        return <Icon name="home" fill={props.color} />;
    }
  };
  return icon();
};

const styles = RNStyles.create({
  cart: {
    position: 'relative',
  },
  badge: {
    square: 20,
    backgroundColor: colors.secondary,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    top: -3,
    right: -10,
  },
  badgeText: {
    color: colors.text.white,
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default MenuIcon;
