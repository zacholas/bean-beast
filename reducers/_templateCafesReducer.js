import _ from 'lodash';
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingCafe: null,
  cafes: {}
};

/*
Cafe Fields:
- ID
- Name
- Google place id if linked to google place (IDK about api cost tho)
- Address
- Phone Number
- Website
- Location Notes
- Notes about seating, power outlets, barista's name, etc.
 */

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CAFE_CREATE:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingCafe: null
      };
    case types.CAFE_CREATING:
    case types.CAFE_CREATING_BEAN_MODAL:
      return { ...state,
        loading: true,
        error: '',
        cafes: {
          ...state.cafes,
          [action.payload.id]: {
            created: action.payload.created,
            modified: action.payload.modified,
            id: action.payload.id,
            name: action.payload.data.name,
          },
        },
      };
    case types.CAFE_UPDATING:
      return { ...state,
        loading: true,
        error: '',
        cafes: {
          ...state.cafes,
          [action.payload.data.id]: {
            ...state.cafes[action.payload.data.id],
            modified: action.payload.modified,
            name: action.payload.data.name,
          }
        }
      };
    case types.CAFE_DELETING:
      const newCafes = _.omit(state.cafes, action.payload);
      return { ...state,
        loading: true,
        error: '',
        cafes: newCafes
      };
    case types.CAFE_EDIT:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingCafe: action.payload
      };
    case types.CAFE_CREATE_SUCCESS:
    case types.CAFE_UPDATE_SUCCESS:
    case types.CAFE_DELETE_SUCCESS:
      return { ...state,
        loading: false,
        currentlyEditingCafe: null
      };
    case types.CAFE_CREATE_FAIL:
    case types.CAFE_UPDATE_FAIL:
    case types.CAFE_DELETE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
