import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BeansReducer from './BeansReducer';

export default combineReducers({
  form: formReducer,
  beans: BeansReducer,
});
