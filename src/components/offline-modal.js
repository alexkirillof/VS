import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import RNStyles from '@tapston/react-native-styles';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import {colors} from '../styles';
import {changeInternetConnection} from '../store/reducers/app';

const OfflineModal = props => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      props.changeInternetConnection(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return !props.internetConnection ? (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.titleText}>Нет интернет соединения</Text>
          <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionText}>
              Проверьте свое интернет соединение. Сообщение пропадёт
              автоматически
            </Text>
          </View>
          {props.children}
        </View>
      </View>
    </View>
  ) : null;
};

const styles = RNStyles.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    opacity: 0.4,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  descriptionContainer: {
    padding: 35,
    backgroundColor: colors.background.white,
  },
  titleText: {
    color: colors.text.black,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  descriptionTextContainer: {
    paddingTop: 24,
  },
  descriptionText: {
    color: colors.text.gray,
    textAlign: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const mapStateToProps = state => ({
  internetConnection: state.app.internetConnection,
});
const mapDispatchToProps = dispatch => ({
  changeInternetConnection: status =>
    dispatch(changeInternetConnection(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OfflineModal);
