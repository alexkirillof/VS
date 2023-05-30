import React from 'react';
import {AppRegistry, Text, TextInput, Pressable, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import RNStyles from '@tapston/react-native-styles';
import {initialAnimation} from '@tapston/react-native-animation';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Provider} from 'react-redux';
import AppMiddleware from './src/AppMiddleware';
import {OfflineModal} from './src/components';
import {name as appName} from './app.json';

if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

initialAnimation();

Sentry.init({
  dsn: 'https://d758066e018f414cb2194e09a3293b4e@o4504989145169920.ingest.sentry.io/4504989343547392',
  tracesSampleRate: 1.0,
  attachStacktrace: true,
  enableNative: false,
  debug: false,
  environment: __DEV__ ? 'DEV' : 'PROD',
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
});

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <StatusBar barStyle="dark-content" backgroundColor="#eaeaea" />
            <AppMiddleware routingInstrumentation={routingInstrumentation} />
            <OfflineModal />
            {__DEV__ && (
              <Pressable
                onPress={() => {
                  persistor.purge();
                  console.warn('Redux has been clear, reload pls Cmd + R');
                }}
                style={styles.clearRedux}
              />
            )}
          </PersistGate>
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = RNStyles.create({
  container: {
    flex: 1,
  },
  clearRedux: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 20,
    zIndex: 99,
  },
});

AppRegistry.registerComponent(appName, () => Sentry.wrap(App));
