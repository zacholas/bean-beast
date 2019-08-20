import _ from 'lodash';
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingOrigin: null,
  origins: {
    default_brazil: {
      id: 'default_brazil',
      name: 'Brazil',
      order: 10,
    },
    default_burundi: {
      id: 'default_burundi',
      name: 'Burundi',
      order: 20,
    },
    default_colombia: {
      id: 'default_colombia',
      name: 'Colombia',
      order: 30,
    },
    default_el_salvador: {
      id: 'default_el_salvador',
      name: 'El Salvador',
      order: 40,
    },
    default_ethiopia: {
      id: 'default_ethiopia',
      name: 'Ethiopia',
      order: 50,
    },
    default_guatemala: {
      id: 'default_guatemala',
      name: 'Guatemala',
      order: 60,
    },
    default_honduras: {
      id: 'default_honduras',
      name: 'Honduras',
      order: 70,
    },
    default_indonesia: {
      id: 'default_indonesia',
      name: 'Indonesia',
      order: 80,
    },
    default_kenya: {
      id: 'default_kenya',
      name: 'Kenya',
      order: 90,
    },
    default_mexico: {
      id: 'default_mexico',
      name: 'Mexico',
      order: 100,
    },
    default_nicaragua: {
      id: 'default_nicaragua',
      name: 'Nicaragua',
      order: 110,
    },
    default_peru: {
      id: 'default_peru',
      name: 'Peru',
      order: 120,
    },
    default_rwanda: {
      id: 'default_rwanda',
      name: 'Rwanda',
      order: 130,
    },
  }
};

/*
BeanDetails Fields:
- ID
- BeanDetails Country -- picker with add custom, e.g. Ethiopia


Things I have moved:
- BeanDetails Region -- e.g. Yirgacheffe -- Not sure on this one. Perhaps an associative picker, where if they've picked ethiopia, they'd see the ethiopian regions. But IDK, that seems tricky.
- BeanDetails Details (farm/estate/plantation/whatever)
- Species *TODO -- have this as a radio/selector of (arabica, robusta, other)
- Process -- natural, semi washed, fully washed, honey, allow custom *todo


Things I haven't done yet:
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
            name: action.payload.data.name,
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
            name: action.payload.data.name,
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
