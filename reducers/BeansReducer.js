import _ from 'lodash';
import * as types from '../constants/types';

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingBean: null,
  beans: null,
};

/*
Bean Fields:
*** @todo need some way to account for blend components --- maybe allow someone to select single origin or blend and show certain fields based on that.
- Roaster / Bean
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
    case types.BEAN_CREATE:
      return {
        ...state,
        loading: false,
        error: null,
        currentlyEditingBean: null
      };
    case types.BEAN_CREATING:
      return { ...state,
        loading: true,
        error: '',
        beans: {
          ...state.beans,
          [action.payload.id]: {
            created: action.payload.created,
            modified: action.payload.modified,
            id: action.payload.id,
            name: action.payload.data.name,
          },
        },
      };
    case types.BEAN_UPDATING:
      return { ...state,
        loading: true,
        error: '',
        beans: {
          ...state.beans,
          [action.payload.data.id]: {
            ...state.beans[action.payload.data.id],
            modified: action.payload.modified,
            name: action.payload.data.name,
          }
        }
      };
    case types.BEAN_DELETING:
      const newBeans = _.omit(state.beans, action.payload);
      return { ...state,
        loading: true,
        error: '',
        beans: newBeans
      };
    case types.BEAN_EDIT:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingBean: action.payload
      };
    case types.BEAN_CREATE_SUCCESS:
    case types.BEAN_UPDATE_SUCCESS:
    case types.BEAN_DELETE_SUCCESS:
      return { ...state,
        loading: false,
        currentlyEditingBean: null
      };
    case types.BEAN_CREATE_FAIL:
    case types.BEAN_UPDATE_FAIL:
    case types.BEAN_DELETE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
