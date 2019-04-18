import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BeansReducer from './BeansReducer';
import CafesReducer from './CafesReducer';

export default combineReducers({
  form: formReducer,
  beans: BeansReducer,
  cafes: CafesReducer,
});
