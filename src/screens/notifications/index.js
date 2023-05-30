import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { animateLayout } from '@tapston/react-native-animation';

import { setNotifications } from '../../store/reducers/user';
import { apiPostPublic } from '../../core/api';
import { PreloaderFullscreen } from '../../components';

import NotificationsView from './notifications-view';

const NotificationsContainer = ({ navigation }) => {
  const { sessid, hash } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const [notificationsCount, setNotificationsCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCheckAllModal, setOpenCheckAllModal] = useState(false);

  const getNotifications = () => {
    setLoading(true);
    try {
      apiPostPublic('/user/notifications', {
        sessid: sessid,
        hash: hash,
        data: {
          filter: 'all',
          pageSize: 300,
          pageNum: 1,
        },
      }).then(res => {
        if (res.type !== 'ERROR') {
          setNotificationsCount(res.data.items);
          dispatch(setNotifications(res.data.quantity.not_viewed));
        } else {
          Alert.alert(res.data.message, res.data.description);
        }
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      Alert.alert(err);
    }
  };

  const setViewed = id => {
    apiPostPublic(`/user/notifications/view/${id}`, {
      sessid: sessid,
      hash: hash,
    }).then(() => {
      getNotifications();
    });
  };

  const checkAllNotifications = () => {
    setLoading(true);
    apiPostPublic('/user/notifications/viewall', {
      sessid: sessid,
      hash: hash,
    }).then(() => {
      setOpenCheckAllModal(false);
      getNotifications();
    });
  };

  useEffect(() => {
    animateLayout();
    navigation.setParams({
      checkAllNotifications: () => {
        setOpenCheckAllModal(true);
      },
    });

    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <NotificationsView
      setViewed={setViewed}
      checkAllNotifications={checkAllNotifications}
      openCheckAllModal={openCheckAllModal}
      setOpenCheckAllModal={setOpenCheckAllModal}
      loading={loading}
      navigation={navigation}
      notifications={notificationsCount}
    />
  );
};

export default NotificationsContainer;
