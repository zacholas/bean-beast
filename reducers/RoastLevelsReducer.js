import * as types from '../constants/types';
import _ from "lodash";

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingRoastLevel: null,
  modalData: {},
  roastLevels: {
    default_filter: {
      id: 'default_filter',
      name: 'Filter Roast',
      order: 10,
    },
    default_espresso: {
      id: 'default_espresso',
      name: 'Espresso Roast',
      order: 20,
    },
    default_hybrid: {
      id: 'default_hybrid',
      name: 'Filter/Espresso Roast',
      order: 30,
    },
    default_cinnamon: {
      id: 'default_cinnamon',
      name: 'Cinnamon Roast',
      order: 40,
    },
    default_new_england: {
      id: 'default_new_england',
      name: 'New England Roast',
      order: 50,
    },
    default_half_city: {
      id: 'default_half_city',
      name: 'Half City Roast',
      order: 60,
    },
    default_light: {
      id: 'default_light',
      name: 'Light Roast',
      order: 70,
    },
    default_city: {
      id: 'default_city',
      name: 'City Roast',
      order: 80,
    },
    default_american: {
      id: 'default_american',
      name: 'American Roast',
      order: 90,
    },
    default_breakfast: {
      id: 'default_breakfast',
      name: 'Breakfast Roast',
      order: 100,
    },
    default_city_plus: {
      id: 'default_city_plus',
      name: 'City+ Roast',
      order: 110,
    },
    default_medium: {
      id: 'default_medium',
      name: 'Medium Roast',
      order: 120,
    },
    default_full_city: {
      id: 'default_full_city',
      name: 'Full City Roast',
      order: 130,
    },
    default_vienna: {
      id: 'default_vienna',
      name: 'Vienna Roast',
      order: 140,
    },
    default_french: {
      id: 'default_french',
      name: 'French Roast',
      order: 150,
    },
    default_italian: {
      id: 'default_italian',
      name: 'Italian Roast',
      order: 160,
    },
    default_dark: {
      id: 'default_dark',
      name: 'Dark Roast',
      order: 170,
    }
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ROAST_LEVEL_CREATE:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingRoastLevel: null
      };
    case types.ROAST_LEVEL_CREATING:
    case types.ROAST_LEVEL_CREATING_BEAN_MODAL:
      return { ...state,
        loading: true,
        error: '',
        roastLevels: {
          ...state.roastLevels,
          [action.payload.id]: {
            created: action.payload.created,
            modified: action.payload.modified,
            id: action.payload.id,
            name: action.payload.data.name,
            order: action.payload.data.order
          },
        },
      };
    case types.ROAST_LEVEL_UPDATING:
      return { ...state,
        loading: true,
        error: '',
        roastLevels: {
          ...state.roastLevels,
          [action.payload.data.id]: {
            ...state.roastLevels[action.payload.data.id],
            modified: action.payload.modified,
            name: action.payload.data.name,
            order: action.payload.data.order
          }
        }
      };
    case types.ROAST_LEVEL_DELETING:
      const newRoastLevels = _.omit(state.roastLevels, action.payload);
      return { ...state,
        loading: true,
        error: '',
        roastLevels: newRoastLevels
      };
    case types.ROAST_LEVEL_EDIT:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingRoastLevel: action.payload
      };
    case types.ROAST_LEVEL_CREATE_SUCCESS:
    case types.ROAST_LEVEL_UPDATE_SUCCESS:
    case types.ROAST_LEVEL_DELETE_SUCCESS:
      return { ...state,
        loading: false,
        currentlyEditingRoastLevel: null
      };
    case types.ROAST_LEVEL_CREATE_FAIL:
    case types.ROAST_LEVEL_UPDATE_FAIL:
    case types.ROAST_LEVEL_DELETE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
