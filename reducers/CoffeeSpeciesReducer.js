import * as types from '../constants/types';
import _ from "lodash";

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingCoffeeSpecies: null,
  modalData: {},
  coffeeSpecies: {
    default_arabica: {
      id: 'default_arabica',
      name: 'Arabica',
      order: 10,
    },
    default_robusta: {
      id: 'default_robusta',
      name: 'Robusta',
      order: 20,
    }
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.COFFEE_SPECIES_CREATE:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingCoffeeSpecies: null
      };
    case types.COFFEE_SPECIES_CREATING:
    case types.COFFEE_SPECIES_CREATING_BEAN_MODAL:
      return { ...state,
        loading: true,
        error: '',
        coffeeSpecies: {
          ...state.coffeeSpecies,
          [action.payload.id]: {
            created: action.payload.created,
            modified: action.payload.modified,
            id: action.payload.id,
            name: action.payload.data.name,
            order: action.payload.data.order
          },
        },
      };
    case types.COFFEE_SPECIES_UPDATING:
      return { ...state,
        loading: true,
        error: '',
        coffeeSpecies: {
          ...state.coffeeSpecies,
          [action.payload.data.id]: {
            ...state.coffeeSpecies[action.payload.data.id],
            modified: action.payload.modified,
            name: action.payload.data.name,
            order: action.payload.data.order
          }
        }
      };
    case types.COFFEE_SPECIES_DELETING:
      const newCoffeeSpecies = _.omit(state.coffeeSpecies, action.payload);
      return { ...state,
        loading: true,
        error: '',
        coffeeSpecies: newCoffeeSpecies
      };
    case types.COFFEE_SPECIES_EDIT:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingCoffeeSpecies: action.payload
      };
    case types.COFFEE_SPECIES_CREATE_SUCCESS:
    case types.COFFEE_SPECIES_UPDATE_SUCCESS:
    case types.COFFEE_SPECIES_DELETE_SUCCESS:
      return { ...state,
        loading: false,
        currentlyEditingCoffeeSpecies: null
      };
    case types.COFFEE_SPECIES_CREATE_FAIL:
    case types.COFFEE_SPECIES_UPDATE_FAIL:
    case types.COFFEE_SPECIES_DELETE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload
      };
    case types.IMPORT_EXPORTED_DATA:
      return {
        ...state,
        ...action.payload.coffeeSpecies
      };
    default:
      return state;
  }
}
