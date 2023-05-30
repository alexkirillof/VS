import React, {useState, useEffect} from 'react';

import HistorySearchView from './history-search-view';
import {apiGetPublic} from '../../core/api';
import {PreloaderFullscreen} from '../../components';

const HistorySearchContainer = props => {
  const [last, setLast] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetPublic('/v2/user/search-history', {pageNumber: 1}).then(res => {
      setHistoryData(res.result.searchHistory);
      setLast(res.result.isLast);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <PreloaderFullscreen />;
  }
  return (
    <HistorySearchView
      last={last}
      historyData={historyData}
      navigation={props.navigation}
    />
  );
};

export default HistorySearchContainer;
