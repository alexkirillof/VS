import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import {Button, Icon} from '../../components';
import {colors} from '../../styles';

const SelectedFilterView = ({
  type,
  checked,
  values,
  selected,
  setSelected,
  setLoadingPagination,
  loadingPagination,
  toFilter,
  setTypeFilters,
}) => {
  return (
    <SafeAreaView style={styles.common}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={100}
        onEndReached={() => {
          setLoadingPagination(false);
        }}
        ListFooterComponent={
          loadingPagination && (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          )
        }
        extraData={checked}
        data={values}
        keyExtractor={item => item.code}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.filterCodeItem}
              onPress={() => {
                toFilter(item.code);
                setSelected(old => ({
                  ...old,
                  [type]: [...old[type], item.code],
                }));
              }}>
              <View style={styles.titleContainer}>
                <Text style={styles.filterCodeTitle} numberOfLines={2}>
                  {item.value}
                </Text>
                <View style={styles.count}>
                  <Text>({item.count})</Text>
                </View>
              </View>
              <View style={styles.preArrow}>
                <Icon
                  name={'check-active'}
                  fill={
                    checked.find(val => val === item.code)
                      ? colors.primary
                      : colors.gray
                  }
                />
              </View>
            </TouchableOpacity>
          );
        }}
        horizontal={false}
      />
      <Button
        style={styles.button}
        disabled={checked.length <= 0}
        value="Применить"
        onPress={setTypeFilters}
      />
    </SafeAreaView>
  );
};

const styles = RNStyles.create({
  common: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filterTitle: {
    fontSize: 20,
    lineHeight: 24,
  },
  filterCodeItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    marginLeft: 8,
  },
  filterCodeTitle: {
    flexWrap: 'wrap',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'left',
  },
  arrow: {
    paddingHorizontal: 16,
  },
  preArrow: {
    borderColor: colors.gray,
    borderWidth: 1,
    marginVertical: 8,
  },
  containerLeftButton: {
    height: '100%',
    width: 40,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  button: {
    marginHorizontal: 8,
  },
});

export default SelectedFilterView;
