// configureStore.js

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { migrations } from "./redux/migrations";
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  version: 25,
  storage,
  debug: true,
  blacklist: ['form'],
  migrate: createMigrate(migrations, { debug: true }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(thunk),
  );
  let persistor = persistStore(store)

  return { store, persistor }
}
