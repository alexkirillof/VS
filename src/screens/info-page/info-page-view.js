import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';
import RNStyles from '@tapston/react-native-styles';
import {colors} from '../../styles';

const InfoPageView = props => {
  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: 'black',
      fontSize: 16,
    },
    a: {
      color: 'green',
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
          styles={{paddingHorizontal: 16}}
          contentWidth={width}
          source={{html: props.data}}
          tagsStyles={tagsStyles}
        />
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

export default InfoPageView;
