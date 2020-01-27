import * as types from '../constants/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  global_temperatureMeasurement: 'c',
  bean_roastLevelAdvancedMode: false
};

// loading: false,
//   error: '',
//   global: {
//   temperatureMeasurement: 'c',
// },
// beanEntry: {
//   roastLevelAdvancedMode: false
// },

//* Other things to perhaps add here: roast level style (custom input vs

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_PREFERENCES_SAVING:
      // console.log('saving user preferences with', action.payload);
      return {
        ...state,
        ...action.payload.data,
        updated: action.payload.updated,
        // global: {
        //   ...state.global
        // },
        // beanEntry: {
        //   ...state.beanEntry
        // }
      };
    case types.IMPORT_EXPORTED_DATA:
      return {
        ...state,
        ...action.payload.userPreferences
      };
    default:
      return state;
  }
};
