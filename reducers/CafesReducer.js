import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';

const INITIAL_STATE = {
  loading: false,
  redirect: false,
  error: '',
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
    case types.CAFE_CREATING:
      return { ...state,
        loading: true,
        redirect: false,
        error: '',
        cafes: {
          ...state.cafes,
          [action.payload.id]: {
            created: action.payload.created,
            modified: action.payload.modified,
            id: action.payload.id,
            ...action.payload.data,
          },
        },
      };
    case types.CAFE_CREATE_SUCCESS:
      return { ...state,
        loading: false,
        redirect: {
          routeName: navRoutes.VIEW_CAFE,
          params: {
            id: action.payload
          }
        },
      };
    case types.CAFE_CREATE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
