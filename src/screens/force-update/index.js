import React, {useState, useEffect} from 'react';
import {Linking, Platform} from 'react-native';
import {APPSTORE_LINK, PLAYSTORE_LINK} from '../../core/configs';
import {PreloaderFullscreen} from '../../components';
import ForceUpdateView from './force-update-view';

const ForceUpdateContainer = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  const handleUrlUpdate = () => {
    const link = Platform.OS === 'ios' ? APPSTORE_LINK : PLAYSTORE_LINK;
    Linking.openURL(link);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <PreloaderFullscreen />;
  }

  return (
    <ForceUpdateView
      navigation={navigation}
      handleUrlUpdate={handleUrlUpdate}
    />
  );
};

export default ForceUpdateContainer;
