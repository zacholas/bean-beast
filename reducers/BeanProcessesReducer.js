import * as types from '../constants/types';
import _ from "lodash";

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingBeanProcess: null,
  modalData: {},
  beanProcesses: {
    default_natural: {
      id: 'default_natural',
      name: 'Natural / Dry Process',
      order: 10,
    },
    default_washed: {
      id: 'default_washed',
      name: 'Washed / Wet Process',
      order: 20,
    },
    default_honey: {
      id: 'default_honey',
      name: 'Honey Process',
      order: 30
    }
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BEAN_PROCESS_CREATE:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingBeanProcess: null
      };
    case types.BEAN_PROCESS_CREATING:
    case types.BEAN_PROCESS_CREATING_BEAN_MODAL:
      return { ...state,
        loading: true,
        error: '',
        beanProcesses: {
          ...state.beanProcesses,
          [action.payload.id]: {
            created: action.payload.created,
            modified: action.payload.modified,
            id: action.payload.id,
            name: action.payload.data.name,
            order: action.payload.data.order
          },
        },
      };
    case types.BEAN_PROCESS_UPDATING:
      return { ...state,
        loading: true,
        error: '',
        beanProcesses: {
          ...state.beanProcesses,
          [action.payload.data.id]: {
            ...state.beanProcesses[action.payload.data.id],
            modified: action.payload.modified,
            name: action.payload.data.name,
            order: action.payload.data.order
          }
        }
      };
    case types.BEAN_PROCESS_DELETING:
      const newBeanProcesses = _.omit(state.beanProcesses, action.payload);
      return { ...state,
        loading: true,
        error: '',
        beanProcesses: newBeanProcesses
      };
    case types.BEAN_PROCESS_EDIT:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingBeanProcess: action.payload
      };
    case types.BEAN_PROCESS_CREATE_SUCCESS:
    case types.BEAN_PROCESS_UPDATE_SUCCESS:
    case types.BEAN_PROCESS_DELETE_SUCCESS:
      return { ...state,
        loading: false,
        currentlyEditingBeanProcess: null
      };
    case types.BEAN_PROCESS_CREATE_FAIL:
    case types.BEAN_PROCESS_UPDATE_FAIL:
    case types.BEAN_PROCESS_DELETE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload
      };
    case types.IMPORT_EXPORTED_DATA:
      return {
        ...state,
        ...action.payload.beanProcesses
      };
    default:
      return state;
  }
}
