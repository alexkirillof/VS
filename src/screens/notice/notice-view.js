import React from 'react';
import {View, Text, ScrollView, Platform} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import FastImage from 'react-native-fast-image';
import {ProfileCategories} from '../../components';

import {colors, screenWidth, ImagesDefault} from '../../styles';

const NoticeView = props => {
  console.log('cc', props.notifications);
  return (
    <View style={styles.container}>
      <ScrollView
        overScrollMode={Platform.OS === 'android' ? 'never' : 'always'}
        showsVerticalScrollIndicator={false}>
        <FastImage
          source={ImagesDefault.notice}
          style={styles.image}
          resizeMode={'contain'}
        />
        {props.notifications.map(item => {
          if (item.code === 'email') {
            return (
              <ProfileCategories
                onPressSwitcher={value =>
                  props.setNotification(value, item.code)
                }
                text={item.name}
                switcher
                switcherValue={props.emailNotifications}
              />
            );
          } else if (item.code === 'phone') {
            return (
              <ProfileCategories
                text={item.name}
                onPressSwitcher={value =>
                  props.setNotification(value, item.code)
                }
                switcher
                switcherValue={props.phoneNotifications}
              />
            );
          } else if (item.code === 'push') {
            return (
              <ProfileCategories
                text={item.name}
                onPressSwitcher={value =>
                  props.setNotification(value, item.code)
                }
                switcher
                switcherValue={props.pushNotifications}
              />
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

const styles = RNStyles.create({
  container: {
    backgroundColor: colors.white,
    height: '100%',
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 12,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  image: {
    height: `${screenWidth / 1.5}`,
    width: '100%',
    marginTop: 96,
    marginBottom: 24,
  },
});

export default NoticeView;
