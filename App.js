import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage, SafeAreaView } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { connectActionSheet, ActionSheetProvider } from '@expo/react-native-action-sheet'
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Sentry from 'sentry-expo';
// import { SentrySeverity, SentryLog } from 'react-native-sentry';
import { PersistGate } from 'redux-persist/integration/react'
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import AppNavigator from './navigation/AppNavigator';
import * as configuredStore from './configureStore';
// import * as types from './constants/types';
// import reducers from './reducers';

Sentry.init({
  dsn: 'https://6f35c3cf2cc44de3af3a3622a1637054@sentry.io/1443579',
  // enableInExpoDevelopment: true,
  debug: true
});

const { store, persistor } = configuredStore.default();
// persistor.purge();

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    // console.log('app props', this.props);
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
    } else {
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
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // 'avenir-next-300': require('./assets/fonts/AvenirNextLTPro-Light.otf'),
        'avenir-next-400': require('./assets/fonts/AvenirNextLTPro-Regular.otf'),
        'avenir-next-600': require('./assets/fonts/AvenirNextLTPro-Demi.otf'),
        'galano-grotesque-700': require('./assets/fonts/GalanoGrotesque-Bold.otf'),
        'galano-grotesque-800': require('./assets/fonts/GalanoGrotesque-ExtraBold.otf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const ConnectedApp = connectActionSheet(App);

export default class AppContainer extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <ConnectedApp />
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
