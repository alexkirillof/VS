import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {apiPostPublic, apiPutPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

import NoticeView from './notice-view';

const NoticeContainer = () => {
  const {sessid, hash} = useSelector(state => state.user);

  const [notifications, setNotification] = useState(null);
  const [emailNotifications, setEmailNotification] = useState(false);
  const [phoneNotifications, setPhoneNotification] = useState(false);
  const [pushNotifications, setPushNotification] = useState(false);
  const [loading, setLoading] = useState(true);

  const getNotifications = () => {
    setLoading(true);
    apiPostPublic('/user/subscribe', {
      sessid: sessid,
      hash: hash,
      data: {},
    }).then(res => {
      if (res.type !== 'ERROR') {
        setNotification(res.data);
        res.data.map(item => {
          if (item.code === 'email') {
            setEmailNotification(item.selected);
          } else if (item.code === 'phone') {
            setPhoneNotification(item.selected);
          } else {
            setPushNotification(item.selected);
          }
        });
        setLoading(false);
      }
      setLoading(false);
    });
  };

  const putNotifications = (value, code) => {
    setLoading(true);
    apiPutPublic('/user/subscribe', {
      sessid: sessid,
      data: {
        email: code === 'email' ? value : emailNotifications,
        phone: code === 'phone' ? value : phoneNotifications,
        push: code === 'push' ? value : pushNotifications,
      },
    }).then(res => {
      if (res) {
        setLoading(false);
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <NoticeView
      notifications={notifications}
      emailNotifications={emailNotifications}
      phoneNotifications={phoneNotifications}
      pushNotifications={pushNotifications}
      setNotification={putNotifications}
    />
  );
};

export default NoticeContainer;
