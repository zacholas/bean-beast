import * as types from '../constants/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  cafes: {
    'cafe-1': {
      id: 'cafe-1',
      name: 'Combi Coffee'
    },
    'cafe-2': {
      id: 'cafe-2',
      name: 'C\'alma'
    }
  }

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
    case types.BEAN_INCREMENT:
      return { ...state,
        fakeCounter: state.fakeCounter + 1,
      };
    case types.BEAN_CREATE:
      return { ...state,
        loading: false,
        // beans: {
        //   ...state.beans,
        //   [action.payload.id]: {
        //     created: action.payload.created,
        //     modified: action.payload.modified,
        //     _key: action.payload.id,
        //     ...action.payload.data,
        //   },
        // },
      };
    default:
      return state;
  }
};
