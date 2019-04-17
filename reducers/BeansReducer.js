import * as types from '../constants/Types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  beans: null,
  bean: {
    source: null,
    roastDate: null,
  },
  fakeCounter: 0
};

/*
Bean Fields:
- Roaster / Cafe
- Roast Date
- Roast Level
- Origin Region
- Origin Details (farm/estate/plantation/whatever)
- Process
- Varietal
- Altitude
- Tasting Notes
- Buy again
- Comments
- Roast name
 */

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BEAN_INCREMENT:
      console.log('incrementing bean to be ', state.fakeCounter + 1);
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
      console.log('reducer default');
      return state;
  }
};
