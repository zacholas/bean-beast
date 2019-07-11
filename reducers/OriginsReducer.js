import _ from 'lodash';
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingOrigin: null,
  origins: {}
};

/*
BeanDetails Fields:
- ID
- BeanDetails Country -- picker with add custom, e.g. Ethiopia
- BeanDetails Region -- e.g. Yirgacheffe -- Not sure on this one. Perhaps an associative picker, where if they've picked ethiopia, they'd see the ethiopian regions. But IDK, that seems tricky.
- BeanDetails Details (farm/estate/plantation/whatever)
- Species *TODO -- have this as a radio/selector of (arabica, robusta, other)
- Process -- natural, semi washed, fully washed, honey, allow custom *todo
- Varietal -- maybe just open text *todo
- Altitude -- slider or open text *todo
- Maybe Google place id if linked to google place (IDK about api cost tho)
 */

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ORIGIN_CREATE:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingOrigin: null
      };
    case types.ORIGIN_CREATING:
    case types.ORIGIN_CREATING_BEAN_MODAL:
      return { ...state,
        loading: true,
        error: '',
        origins: {
          ...state.origins,
          [action.payload.id]: {
            created: action.payload.created,
            modified: action.payload.modified,
            id: action.payload.id,
            country: action.payload.data.country,
            region: action.payload.data.region,
            details: action.payload.data.details,
            processing_method: action.payload.data.processing_method
          },
        },
      };
    case types.ORIGIN_UPDATING:
      return { ...state,
        loading: true,
        error: '',
        origins: {
          ...state.origins,
          [action.payload.data.id]: {
            ...state.origins[action.payload.data.id],
            modified: action.payload.modified,
            country: action.payload.data.country,
            region: action.payload.data.region,
            details: action.payload.data.details,
            processing_method: action.payload.data.processing_method
          }
        }
      };
    case types.ORIGIN_DELETING:
      const newOrigins = _.omit(state.origins, action.payload);
      return { ...state,
        loading: true,
        error: '',
        origins: newOrigins
      };
    case types.ORIGIN_EDIT:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingOrigin: action.payload
      };
    case types.ORIGIN_CREATE_SUCCESS:
    case types.ORIGIN_UPDATE_SUCCESS:
    case types.ORIGIN_DELETE_SUCCESS:
      return { ...state,
        loading: false,
        currentlyEditingOrigin: null
      };
    case types.ORIGIN_CREATE_FAIL:
    case types.ORIGIN_UPDATE_FAIL:
    case types.ORIGIN_DELETE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
