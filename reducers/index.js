import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BeansReducer from './BeansReducer';
import CafesReducer from './CafesReducer';
import UserPreferencesReducer from './UserPreferencesReducer';

export default combineReducers({
  form: formReducer,
  beans: BeansReducer,
  cafes: CafesReducer,
  userPreferences: UserPreferencesReducer,
});
