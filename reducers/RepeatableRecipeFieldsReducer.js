// import _ from 'lodash';
import * as types from '../constants/types';

//* Repeatable Recipe Fields Reducer (Previously called Recipe Criteria Reducer)
/*
const sampleRepeatableRecipeFieldsStructure = {
  repeatableRecipeFields: {
    //* Fields that are applicable for all brew methods
    default_wait: {
      id: 'default_wait',
      name: 'Wait',
      order: 20,
      applicableForAllBrewMethods: true,
      applicableBrewMethodsDefault: [],
      applicableBrewMethodsUser: [], //* This would also be unused for MVP, but good to have here maybe? Or at least here in notion.
    },
    default_taint: {
      id: 'default_taint',
      name: 'Taint the Coffee',
      order: 100,
      applicableForAllBrewMethods: true,
      applicableBrewMethodsDefault: [],
      applicableBrewMethodsUser: [],
    },

    //* Applicable only for espresso
    default_pre_infusion: {
      id: 'default_pre_infusion',
      name: 'Pre-Infusion',
      order: 10,
      applicableForAllBrewMethods: false,
      applicableBrewMethodsDefault: [
        'default_espresso'
      ],
      applicableBrewMethodsUser: [],
    },
    default_primary_infusion: {
      id: 'default_primary_infusion',
      name: 'Primary Infusion / Shot Time',
      order: 11,
      applicableForAllBrewMethods: false,
      applicableBrewMethodsDefault: [
        'default_espresso'
      ],
      applicableBrewMethodsUser: [],
    },

    //* Other fields
    default_bloom: {
      id: 'default_bloom',
      name: 'Bloom',
      order: 40,
      applicableForAllBrewMethods: false,
      applicableBrewMethodsDefault: [
        'default_pour_over',
        'default_aeropress'
      ],
      applicableBrewMethodsUser: [],
    },
    default_pour: {
      id: 'default_pour',
      name: 'Pour',
      order: 50,
      applicableForAllBrewMethods: false,
      applicableBrewMethodsDefault: [
        'default_pour_over',
        'default_aeropress',
        'default_cold_brew'
      ],
      applicableBrewMethodsUser: [
        'brewMethod-skksksjjf4h',
      ],
    },

    //* Skip for MVP
    'repeatableRecipeField-ejn2nj2j2j2': {
      id: 'repeatableRecipeField-ejn2nj2j2j2',
      created: action.payload.created,
      modified: action.payload.modified,
      order: 60,
      name: 'Pour UNDER!',
      applicableBrewMethodsUser: [
        'default_aeropress',
        'brewMethod-skksksjjf4h',
      ],
    }
  }
};
*/

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingBrewMethod: null,
  modalData: {},
  repeatableRecipeFields: {
    default_wait: {
      id: 'default_wait',
      name: 'Wait',
      order: 20,
      applicableForAllBrewMethods: true,
      applicableBrewMethodsDefault: [],
      // applicableBrewMethodsUser: [],
    },
    default_taint: {
      id: 'default_taint',
      name: 'Taint the Coffee',
      order: 100,
      applicableForAllBrewMethods: true,
      applicableBrewMethodsDefault: [],
      // applicableBrewMethodsUser: [],
    },

    //* Applicable only for espresso
    default_pre_infusion: {
      id: 'default_pre_infusion',
      name: 'Pre-Infusion',
      order: 10,
      applicableForAllBrewMethods: false,
      applicableBrewMethodsDefault: [
        'default_espresso'
      ],
      // applicableBrewMethodsUser: [],
    },
    default_primary_infusion: {
      id: 'default_primary_infusion',
      name: 'Primary Infusion / Shot Time',
      order: 11,
      applicableForAllBrewMethods: false,
      applicableBrewMethodsDefault: [
        'default_espresso'
      ],
      // applicableBrewMethodsUser: [],
    },

    //* Other fields
    default_bloom: {
      id: 'default_bloom',
      name: 'Bloom',
      order: 40,
      applicableForAllBrewMethods: false,
      applicableBrewMethodsDefault: [
        'default_pour_over',
        'default_aeropress'
      ],
      // applicableBrewMethodsUser: [],
    },
    default_pour: {
      id: 'default_pour',
      name: 'Pour',
      order: 50,
      applicableForAllBrewMethods: false,
      applicableBrewMethodsDefault: [
        'default_pour_over',
        'default_aeropress',
        'default_cold_brew'
      ],
      // applicableBrewMethodsUser: [],
    },
  },
};

export default (state = INITIAL_STATE, action) => {
  return state;
};
