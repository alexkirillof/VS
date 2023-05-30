import React from 'react';

import SearchHeader from '../materials/images/icons/search-header.svg';
import EmptySearch from '../materials/images/icons/emptySearch.svg';
import CheckConnect from '../materials/images/icons/checkConnect.svg';
import BacketEmpty from '../materials/images/icons/backetEmpty.svg';
import Notification from '../materials/images/icons/notification.svg';
import LeftArrow from '../materials/images/icons/left-arrow.svg';
import GrayCloseCross from '../materials/images/icons/gray-close-crose.svg';
import BottomWhiteArrow from '../materials/images/icons/bottomWhiteArrow.svg';
import BottomArrowSmall from '../materials/images/icons/bottom-arrow-small.svg';
import BottomArrowBig from '../materials/images/icons/bottom-arrow-big.svg';
import SearchInputClose from '../materials/images/icons/search-input-close.svg';
import SearchInputIcon from '../materials/images/icons/search-input.svg';
import ZoomMap from '../materials/images/icons/zoom-map.svg';

import Adult from '../assets/icons/adult.svg';
import Filters from '../assets/icons/filters.svg';
import Card from '../assets/icons/discount-card.svg';
import Home from '../assets/icons/home.svg';
import Catalog from '../assets/icons/catalog.svg';
import Search from '../assets/icons/search.svg';
import Cart from '../assets/icons/cart.svg';
import Profile from '../assets/icons/profile.svg';
import CheckActive from '../assets/icons/check.svg';
import Sale from '../assets/icons/sale.svg';
import Favorite from '../assets/icons/star.svg';
import ArrowBack from '../assets/icons/arrow-back.svg';
import ArrowRight from '../assets/icons/arrow-right.svg';
import Plus from '../assets/icons/plus.svg';
import Minus from '../assets/icons/minus.svg';
import Trash from '../assets/icons/trash.svg';
import Cross from '../assets/icons/cross.svg';
import Success from '../assets/icons/success.svg';
import Copy from '../assets/icons/copy.svg';
import Delivery from '../assets/icons/delivery.svg';
import Point from '../assets/icons/point.svg';
import Time from '../assets/icons/time.svg';
import Gift from '../assets/icons/gift.svg';
import Heart from '../assets/icons/heart.svg';
import Orders from '../assets/icons/orders.svg';
import Subscribe from '../assets/icons/subscribe.svg';
import Telegram from '../assets/icons/telegram.svg';
import Vk from '../assets/icons/vk.svg';
import Exit from '../assets/icons/exit.svg';
import New from '../assets/icons/new.svg';
import Notifications from '../assets/icons/notifications.svg';
import CheckAll from '../assets/icons/checkAll.svg';
//
/**
 * Component Icon - отображает нужную иконку исходя из передающегося пропса
 * @prop {string} name - название иконки.
 * @prop {string} fill - название иконки.
 * @prop {string} stroke - название иконки.
 */
const Icon = props => {
  if (props.name) {
    switch (props.name) {
      case 'LogoStart':
        return <LogoStart />;
      case 'card':
        return <Card />;
      case 'zoomMap':
        return <ZoomMap />;
      case 'search-input-close':
        return <SearchInputClose />;
      case 'search-input-icon':
        return <SearchInputIcon />;
      case 'bottomWhiteArrow':
        return <BottomWhiteArrow />;
      case 'arrow-bottom-small':
        return <BottomArrowSmall />;
      case 'arrow-bottom-big':
        return <BottomArrowBig />;
      case 'notification':
        return <Notification />;
      case 'search-header':
        return <SearchHeader />;
      case 'gray-close-crose':
        return <GrayCloseCross />;
      case 'right-arrow':
        return <ArrowRight />;
      case 'left-arrow':
        return <LeftArrow />;
      case 'arrow-back':
        return <ArrowBack />;
      case 'backetEmpty':
        return <BacketEmpty />;
      case 'checkConnect':
        return <CheckConnect />;
      case 'emptySearch':
        return <EmptySearch />;
      case 'heart':
        return <Heart fill={props.fill} stroke={props.stroke} />;
      case 'trash':
        return <Trash fill={props.fill} />;
      case 'success':
        return <Success fill={props.fill} />;
      case 'home':
        return <Home fill={props.fill} />;
      case 'catalog':
        return <Catalog fill={props.fill} />;
      case 'search':
        return <Search fill={props.fill} />;
      case 'cart':
        return <Cart fill={props.fill} />;
      case 'sale':
        return <Sale fill={props.fill} />;
      case 'favorite':
        return <Favorite fill={props.fill} />;
      case 'user':
        return <Profile fill={props.fill} />;
      case 'check-active':
        return <CheckActive fill={props.fill} />;
      case 'plus':
        return <Plus />;
      case 'minus':
        return <Minus />;
      case 'filters':
        return <Filters fill={props.fill} />;
      case 'close':
        return <Cross />;
      case 'delivery':
        return <Delivery />;
      case 'adult':
        return <Adult fill={props.fill} />;
      case 'copy':
        return <Copy fill={props.fill} />;
      case 'point':
        return <Point fill={props.fill} />;
      case 'gift':
        return <Gift fill={props.fill} />;
      case 'orders':
        return <Orders fill={props.fill} />;
      case 'time':
        return <Time fill={props.fill} />;
      case 'subscribe':
        return <Subscribe fill={props.fill} />;
      case 'telegram':
        return <Telegram fill={props.fill} />;
      case 'vk':
        return <Vk fill={props.fill} />;
      case 'exit':
        return <Exit fill={props.fill} />;
      case 'new':
        return <New fill={props.fill} />;
      case 'notifications':
        return <Notifications fill={props.fill} />;
      case 'check-all':
        return <CheckAll fill={props.fill} />;
      default:
        return null;
    }
  } else {
    return null;
  }
};

export default Icon;
