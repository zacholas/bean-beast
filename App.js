import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { connectActionSheet, ActionSheetProvider } from '@expo/react-native-action-sheet'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import AppNavigator from './navigation/AppNavigator';
import * as configuredStore from './configureStore';
import { throwError } from "./helpers";

Sentry.init({
  dsn: 'https://6f35c3cf2cc44de3af3a3622a1637054@sentry.io/1443579',
  debug: true,
  enableInExpoDevelopment: true
});
Sentry.setRelease(Constants.manifest.revisionId);

const { store, persistor } = configuredStore.default();
// persistor.purge(); //* Wipe all persisted redux state data

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppLoading
              startAsync={this._loadResourcesAsync}
              onError={this._handleLoadingError}
              onFinish={this._handleFinishLoading}
            />
          </PersistGate>
        </Provider>
      );
    }
    else {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
              <FlashMessage position="top" />
            </View>
          </PersistGate>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Ionicons.font, // Tab bar icons
        'avenir-next-400': require('./assets/fonts/AvenirNextLTPro-Regular.otf'),
        'avenir-next-600': require('./assets/fonts/AvenirNextLTPro-Demi.otf'),
        'galano-grotesque-700': require('./assets/fonts/GalanoGrotesque-Bold.otf'),
        'galano-grotesque-800': require('./assets/fonts/GalanoGrotesque-ExtraBold.otf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    throwError(error, 'App.js', '_handleLoadingError');
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const ConnectedApp = connectActionSheet(App); //* Connect the action sheet (the little popout CRUD menu thing)

export default class AppContainer extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <AppearanceProvider>
          <ConnectedApp />
        </AppearanceProvider>
      </ActionSheetProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
