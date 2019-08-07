import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BeansReducer from './BeansReducer';
import CafesReducer from './CafesReducer';
import UserPreferencesReducer from './UserPreferencesReducer';
import OriginsReducer from "./OriginsReducer";
import RoastLevelsReducer from './RoastLevelsReducer';
import BeanProcessesReducer from './BeanProcessesReducer';

export default combineReducers({
  form: formReducer,
  beans: BeansReducer,
  cafes: CafesReducer,
  origins: OriginsReducer,
  roastLevels: RoastLevelsReducer,
  beanProcesses: BeanProcessesReducer,
  userPreferences: UserPreferencesReducer,
});
