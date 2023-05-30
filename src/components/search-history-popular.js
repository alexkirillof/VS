import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import RNStyles from '@tapston/react-native-styles';

import {colors} from '../styles';
import {apiGetPublic, apiDeletePublic} from '../core/api';
import HeaderSearchResultItem from './header-search-result-item';
import ListItem from './list-item';
import EmptySearch from './empty-search';
import {TOUCHABLE_OPACITY_VALUE} from '../core/configs';

/**
 * Component description
 * @prop {type} name - description of the prop
 */
const SearchHistoryPopular = ({
  selection,
  inputValue = '',
  data = [],
  historyQueries = [],
  popularQueries = [],
  onRequestClose,
  navigation,
  searchCity,
  activeCity,
  isLastPage = true,
}) => {
  const [historyData, setHistoryData] = useState(historyQueries);
  const [last, setLast] = useState(isLastPage);
  const [page, setPage] = useState(1);

  const clearHistory = () => {
    apiDeletePublic('/v2/user/clear-search-history');
    setHistoryData([]);
  };

  const clearHistoryItem = item => {
    setHistoryData(historyData.filter(el => el !== item));
    apiDeletePublic(`/v2/user/search-history/${item}`).then(() => {
      if (historyData.length < 12 && last === false) {
        apiGetPublic('/v2/user/search-history', {
          pageNumber: page + 1,
        }).then(res => {
          setHistoryData([...historyData, ...res.result.searchHistory]);
          setLast(res.result.isLast);
          setPage(page + 1);
        });
      }
    });
  };

  const SearchResultItem = ({el, index, last}) => (
    <HeaderSearchResultItem
      last={last}
      key={index}
      element={el}
      activeCity={activeCity}
      inputValue={inputValue}
      selection={() => {
        if (selection && typeof selection === 'function') {
          selection({
            label: el,
          });
        }
      }}
    />
  );

  const renderHistoryResult = () => {
    if (inputValue === '') {
      Keyboard.dismiss();
      return (
        historyData.length > 0 && (
          <View style={styles.contentHistory}>
            <View style={styles.historyResultHeader}>
              <Text style={styles.title}>История</Text>
              <TouchableOpacity
                activeOpacity={TOUCHABLE_OPACITY_VALUE}
                onPress={() => {
                  clearHistory();
                }}>
                <Text style={styles.clear}>Очистить</Text>
              </TouchableOpacity>
            </View>
            {historyData.map((el, index) => {
              if (index < 10) {
                return (
                  <ListItem
                    key={index}
                    name={el}
                    lastItem={
                      historyData.length > 10
                        ? index === 9
                        : index === historyData.length - 1
                    }
                    // onPressDelete={() => {
                    //   clearHistoryItem(el);
                    // }}
                    onPress={() => {
                      if (selection && typeof selection === 'function') {
                        selection({
                          label: el,
                        });
                      }
                    }}
                  />
                );
              }
            })}
          </View>
        )
      );
    }
  };
  const renderSearchResult = () => {
    Keyboard.dismiss();
    if (inputValue === '') {
      return (
        popularQueries.length > 0 && (
          <View style={styles.content}>
            <Text style={styles.title}>Популярные</Text>
            {popularQueries.map((el, index) => (
              <SearchResultItem
                el={el}
                index={index}
                key={index}
                last={index === popularQueries.length - 1}
              />
            ))}
          </View>
        )
      );
    }
    return (
      data.length > 0 && (
        <View style={styles.content}>
          {data.map((el, index) => (
            <SearchResultItem
              key={index}
              el={el}
              index={index}
              last={index === data.length - 1}
            />
          ))}
        </View>
      )
    );
  };

  if (inputValue !== '' && data.length === 0) {
    Keyboard.dismiss();
    return (
      <View style={styles.emptySearch}>
        <EmptySearch
          onPress={() => {
            onRequestClose ? onRequestClose() : null;
            navigation.navigate('HomeScreen');
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.wrapper}>
      <ScrollView
        overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
        contentContainerStyle={styles.scrollWrapper}
        style={styles.scrollWrapper}>
        {searchCity ? null : renderHistoryResult()}
        {renderSearchResult()}
      </ScrollView>
    </View>
  );
};

const styles = RNStyles.create({
  input: {
    flex: 10,
  },
  emptySearch: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.white,
  },
  header: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    flex: 2,
  },
  closeButtonText: {
    color: colors.text.black,
  },
  wrapper: {
    flex: 1,
  },
  scrollWrapper: {
    paddingBottom: 50,
  },
  content: {
    backgroundColor: colors.background.white,
    paddingLeft: 32,
    elevation: 4,
    shadowColor: colors.text.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 6,
    marginVertical: 20,
    marginHorizontal: 16,
    paddingBottom: 12,
  },
  contentHistory: {
    backgroundColor: colors.background.white,
    elevation: 4,
    shadowColor: colors.text.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 6,
    marginTop: 20,
    marginHorizontal: 16,
    paddingBottom: 16,
  },
  historyResultHeader: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: 'rgba(0,0,0, 0.5)',
    textTransform: 'uppercase',
    paddingTop: 16,
    lineHeight: 18,
  },
  clear: {
    fontSize: 14,
    color: 'rgba(0,0,0, 0.5)',
    textTransform: 'uppercase',
    paddingTop: 16,
    lineHeight: 16,
  },
});

export default SearchHistoryPopular;
