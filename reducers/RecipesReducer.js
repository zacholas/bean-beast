import _ from 'lodash';
import * as types from '../constants/types';

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingRecipe: null,
  recipes: {},
  // modalData: {},
};

/*
const sampleRecipesStructure = {
  recipes: {
    'recipe-234nb3b292923j3j': {
      id: 'recipe-234nb3b292923j3j',
      created: action.payload.created,
      modified: action.payload.modified,
      brew_method: 'brewMethod-fksdfkskdjfkdsjkfjei', // or something like 'default_espresso'
      brew_method_equipment: '',
      grind: 'B23 or something thats not necessarily an int',
      grinder: 'equipment-ksjsjdsjdjs',
      dose: 15.43,
      temperature: 88.32, // Probably always store temp in C and convert to their preference
      photos: [
        //* For MVP I can support just one photo and not deal with galleries til later.
        // (Or maybe even 0 photos if I want)
        {
          order: 0,
          file: 'localpath://tofile',
        }
      ],
      overall_rating: 7,
      notes_for_next_time: 'Careful not to drop the aeropress on Karma',
      rating_information: {
        //* Note: Not sure yet how I want to structure this.
        //  The way it's laid out below is referencing the IDs of items in the ratings table.
        //  TODO if I'm going to take this approach, it might make sense to have the
        //     "overall bean rating" to pull from this same approach.
        //     10/20 -- But also maybe not, since I will have overall rating for mvp but maybe not the others.
        'default_overall_rating': {
          id: 'default_overall_rating',
          value: 7
        },
        'default_acidity': {
          id: 'default_acidity',
          value: 76
        },
        'default_balance': {
          id: 'default_balance',
          value: 81
        }
      },
      favorite_information: {
        is_favorite: true,
        favorited_on: '1/2/3 10:20',
        notes: 'This one is really good for americanos',
        nickname: 'Not yet sure if I want a nickname AND notes...',
      },
      recipe_steps: [
        {
          field_id: 'default_pre_infusion',
          order: 10,
          values: {
            length: 272741, // Time duration in seconds
            pressure: 2.5 // 2.5 bar; not sure that I need any other value units than bar for this.
          },
          tutorial_options: {
            // Skip this for MVP; simply a prototype for later. If any of these
            // are left blank / not existant in here, just inherit from the settings
            // on this individual recipe criteria
            auto_progress: false,
            notes: 'Make sure not to pour too quickly.'
          }
        },
        {
          field_id: 'default_',
          order: 20,
          values: {

          }
        },
        {
          field_id: 'default_',
          order: 30,
          values: {

          }
        }
      ]
    }
  }
};
*/

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECIPE_CREATE:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingRecipe: null
      };
    case types.RECIPE_CREATING:
      return { ...state,
        loading: true,
        error: '',
        recipes: {
          ...state.recipes,
          [action.payload.id]: {
            created: action.payload.created,
            modified: action.payload.modified,
            id: action.payload.id,
            bean_id: action.payload.data.bean_id,
            brew_method: action.payload.data.brew_method, // brew method ID
            brew_method_equipment: action.payload.data.brew_method_equipment, // ID of the piece of equipment
            grind: action.payload.data.grind, // String
            grinder: action.payload.data.grinder, // ID of the piece of equipment
            dose: action.payload.data.dose, // Grams to hundredths
            temperature: action.payload.data.temperature, // Store in deg C to hundredths
            temperatureMeasurement: action.payload.data.temperatureMeasurement,
            notes_for_next_time: action.payload.data.notes_for_next_time,
            nickname: action.payload.data.nickname,
            recipe_notes: action.payload.data.recipe_notes,
            recipe_objectives: action.payload.data.recipe_objectives,
            favorite_information: action.payload.data.favorite_information,
            recipe_steps: action.payload.data.recipe_steps,
            overall_rating: action.payload.data.overall_rating,
          },
        },
      };

    case types.RECIPE_UPDATING:
      return { ...state,
        loading: true,
        error: '',
        recipes: {
          ...state.recipes,
          [action.payload.data.id]: {
            ...state.recipes[action.payload.data.id],
            modified: action.payload.modified,
            bean_id: action.payload.data.bean_id,
            brew_method: action.payload.data.brew_method, // brew method ID
            brew_method_equipment: action.payload.data.brew_method_equipment, // ID of the piece of equipment
            grind: action.payload.data.grind, // String
            grinder: action.payload.data.grinder, // ID of the piece of equipment
            dose: action.payload.data.dose, // Grams to hundredths
            temperature: action.payload.data.temperature, // Store in deg C to hundredths
            temperatureMeasurement: action.payload.data.temperatureMeasurement,
            notes_for_next_time: action.payload.data.notes_for_next_time,
            nickname: action.payload.data.nickname,
            recipe_notes: action.payload.data.recipe_notes,
            recipe_objectives: action.payload.data.recipe_objectives,
            favorite_information: action.payload.data.favorite_information,
            recipe_steps: action.payload.data.recipe_steps,
            overall_rating: action.payload.data.overall_rating,
          }
        }
      };
    case types.RECIPE_CLONING:
      const newNickname = state.recipes[action.payload.cloning_id].nickname ? `${state.recipes[action.payload.cloning_id].nickname} (Copy)` : undefined;
      return { ...state,
        loading: true,
        error: '',
        recipes: {
          ...state.recipes,
          [action.payload.id]: {
            ...state.recipes[action.payload.cloning_id],
            id: action.payload.id,
            nickname: newNickname,
            created: action.payload.created,
            modified: action.payload.modified,
          }
        }
      };
    case types.RECIPE_TOGGLE_FAVORITE:
      const currentFavStatus = _.size(state.recipes) && _.size(state.recipes[action.payload.id]) && _.size(state.recipes[action.payload.id].favorite_information) && state.recipes[action.payload.id].favorite_information.is_favorite ? state.recipes[action.payload.id].favorite_information.is_favorite : false;
      return { ...state,
        loading: false,
        error: '',
        recipes: {
          ...state.recipes,
          [action.payload.id]: {
            ...state.recipes[action.payload.id],
            favorite_information: {
              ...state.recipes[action.payload.id].favorite_information,
              is_favorite: !currentFavStatus,
              favorited_on: action.payload.modified,
            }
          }
        }
      };

    case types.RECIPE_DELETING:
      const newRecipes = _.omit(state.recipes, action.payload);
      return { ...state,
        loading: true,
        error: '',
        recipes: newRecipes
      };
    case types.RECIPE_EDIT:
      return { ...state,
        loading: false,
        error: null,
        currentlyEditingRecipe: action.payload,
      };
    case types.RECIPE_CREATE_SUCCESS:
    case types.RECIPE_UPDATE_SUCCESS:
    case types.RECIPE_DELETE_SUCCESS:
    case types.RECIPE_CLONE_SUCCESS:
      return { ...state,
        loading: false,
        currentlyEditingRecipe: null
      };
    case types.RECIPE_CREATE_FAIL:
    case types.RECIPE_UPDATE_FAIL:
    case types.RECIPE_DELETE_FAIL:
    case types.RECIPE_CLONE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
