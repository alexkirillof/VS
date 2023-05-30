import React from 'react';
import {ScrollView, View, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';
import RNStyles from '@tapston/react-native-styles';
import {colors} from '../../styles';

const NewsPageView = props => {
  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: colors.black,
      backgroundColor: colors.white,
      fontSize: 16,
    },
    a: {
      color: colors.primary,
    },
    b: {
      fontWeight: 'bold',
    },
    strong: {
      fontWeight: 'bold',
    },
  };

  const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.common}>
      <ScrollView contentContainerStyle={styles.main}>
        <RenderHtml
          defaultTextProps={{selectable: true}}
          contentWidth={width}
          source={{html: props.data.detail_text}}
          tagsStyles={tagsStyles}
        />
        <View style={styles.gap} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = RNStyles.create({
  common: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  main: {
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  gap: {
    height: 48,
  },
});

export default NewsPageView;
