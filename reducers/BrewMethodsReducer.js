// import _ from 'lodash';
import * as types from '../constants/types';


const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingBrewMethod: null,
  modalData: {},
  brewMethods: {
    default_espresso: {
      id: 'default_espresso',
      name: 'Espresso',
      order: 0,
    },
    default_pour_over: {
      id: 'default_pour_over',
      name: 'Pour Over',
      description: 'v60, Chemex, Kalita Wave, etc.',
      order: 10,
    },
    default_aeropress: {
      id: 'default_aeropress',
      name: 'Aeropress',
      order: 20,
    },
    default_cold_brew: {
      id: 'default_cold_brew',
      name: 'Cold Brew',
      order: 30,
    },
  },
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.IMPORT_EXPORTED_DATA:
      return {
        ...state,
        ...action.payload.brewMethods
      };
    default:
      return state;
  }
};

// export default (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case types.BREW_METHOD_CREATE:
//       return { ...state,
//         loading: false,
//         error: null,
//         currentlyEditingBrewMethod: null
//       };
//     case types.BREW_METHOD_CREATING:
//     case types.BREW_METHOD_CREATING_BEAN_MODAL:
//       return { ...state,
//         loading: true,
//         error: '',
//         brewMethods: {
//           ...state.brewMethods,
//           [action.payload.id]: {
//             created: action.payload.created,
//             modified: action.payload.modified,
//             id: action.payload.id,
//             name: action.payload.data.name,
//           },
//         },
//       };
//     case types.BREW_METHOD_UPDATING:
//       return { ...state,
//         loading: true,
//         error: '',
//         brewMethods: {
//           ...state.brewMethods,
//           [action.payload.data.id]: {
//             ...state.brewMethods[action.payload.data.id],
//             modified: action.payload.modified,
//             name: action.payload.data.name,
//           }
//         }
//       };
//     case types.BREW_METHOD_DELETING:
//       const newBrewMethods = _.omit(state.brewMethods, action.payload);
//       return { ...state,
//         loading: true,
//         error: '',
//         brewMethods: newBrewMethods
//       };
//     case types.BREW_METHOD_EDIT:
//       return { ...state,
//         loading: false,
//         error: null,
//         currentlyEditingBrewMethod: action.payload
//       };
//     case types.BREW_METHOD_CREATE_SUCCESS:
//     case types.BREW_METHOD_UPDATE_SUCCESS:
//     case types.BREW_METHOD_DELETE_SUCCESS:
//       return { ...state,
//         loading: false,
//         currentlyEditingBrewMethod: null
//       };
//     case types.BREW_METHOD_CREATE_FAIL:
//     case types.BREW_METHOD_UPDATE_FAIL:
//     case types.BREW_METHOD_DELETE_FAIL:
//       return { ...state,
//         loading: false,
//         error: action.payload
//       };
//     default:
//       return state;
//   }
// };

