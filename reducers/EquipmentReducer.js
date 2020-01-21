import _ from "lodash";
import * as types from '../constants/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  currentlyEditingEquipment: null,
  equipmentTypes: {
    default_grinders: {
      id: 'default_grinders',
      name: 'Grinders',
      can_delete: false,
      order: 10,
    },
    default_brew_methods: {
      id: 'default_brew_methods',
      name: 'Brew Methods',
      can_delete: false,
      order: 20,
    },
    default_other: {
      id: 'default_other',
      name: 'Other / Accessories',
      can_delete: false,
      order: 30,
    }
  },
  equipment: {
    //* Grinders
    default_niche_zero: {
      type: 'default_grinders',
      id: 'default_niche_zero',
      name: 'Niche Zero',
      order: 10,
    },

    //* Brew Methods
    default_v60: {
      type: 'default_brew_methods',
      id: 'default_v60',
      name: 'V60',
      order: 10,
      brew_method: 'default_pour_over'
    },
    default_kalita_wave: {
      type: 'default_brew_methods',
      id: 'default_kalita_wave',
      name: 'Kalita Wave',
      order: 20,
      brew_method: 'default_pour_over'
    },
    default_chemex: {
      type: 'default_brew_methods',
      id: 'default_chemex',
      name: 'Chemex',
      order: 30,
      brew_method: 'default_pour_over'
    }
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.EQUIPMENT_CREATE:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingEquipment: null
      };
    case types.EQUIPMENT_CREATING:
    case types.EQUIPMENT_CREATING_MODAL:
      return { ...state,
        loading: true,
        error: '',
        equipment: {
          ...state.equipment,
          [action.payload.id]: {
            created: action.payload.created,
            modified: action.payload.modified,
            id: action.payload.id,
            name: action.payload.data.name,
            order: action.payload.data.order,
            type: action.payload.data.equipmentType,
          },
        },
      };
    case types.EQUIPMENT_UPDATING:
      return { ...state,
        loading: true,
        error: '',
        equipment: {
          ...state.equipment,
          [action.payload.data.id]: {
            ...state.equipment[action.payload.data.id],
            modified: action.payload.modified,
            name: action.payload.data.name,
            order: action.payload.data.order,
            type: action.payload.data.equipmentType,
          }
        }
      };
    case types.EQUIPMENT_DELETING:
      const newEquipment = _.omit(state.equipment, action.payload);
      return { ...state,
        loading: true,
        error: '',
        equipment: newEquipment
      };
    case types.EQUIPMENT_EDIT:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingEquipment: action.payload
      };
    case types.EQUIPMENT_CREATE_SUCCESS:
    case types.EQUIPMENT_UPDATE_SUCCESS:
    case types.EQUIPMENT_DELETE_SUCCESS:
      return { ...state,
        loading: false,
        currentlyEditingEquipment: null
      };
    case types.EQUIPMENT_CREATE_FAIL:
    case types.EQUIPMENT_UPDATE_FAIL:
    case types.EQUIPMENT_DELETE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

