import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import * as NotificationsService from '../../core/utils/notifications';
import LaunchFirstView from './launch-first-view';

const LaunchFirstContainer = ({navigation}) => {
  const {startCount, updateStatus} = useSelector(state => state.app);

  const initNotifications = () => {
    NotificationsService.config(navigation);
  };

  useEffect(() => {
    initNotifications();

    const screenName = updateStatus
      ? 'ForceUpdate'
      : startCount < 1
      ? 'SelectCity'
      : 'MainStack';

    setTimeout(() => {
      navigation.navigate(screenName);
    }, 3500);
  }, []);

  return <LaunchFirstView navigation={navigation} />;
};

export default LaunchFirstContainer;
