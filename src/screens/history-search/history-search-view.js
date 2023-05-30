import React from 'react';
import {SearchHistoryPopular} from '../../components';

const HistorySearchView = props => {
  return (
    <SearchHistoryPopular
      isLastPage={props.last}
      historyQueries={props.historyData}
      selection={({value, label}) => {
        props.navigation.navigate('SearchScreen', {searchText: label});
      }}
    />
  );
};

export default HistorySearchView;
