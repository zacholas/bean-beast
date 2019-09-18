import _ from 'lodash';
import * as types from '../constants/types';
import { Picker } from "react-native";

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentlyEditingBean: null,
  beans: {},
  modalData: {},
};

const sampleBeanStructure = {
  name: 'Breakfast Blend',
  cafe: 'cafe-234nb3b292923j3j',
  roast_date: '1/2/3',
  roast_level_advanced_mode: false, // true, false
  roast_level: 4,
  tasting_notes: 'Mixed bellyy nakha',
  comments: 'Yommm',
  bean_image: 'img src',
  bean_type: 'single_origin', // false, 'single_origin', 'blend',
  bean_details: [
    {
      blend_percent: 100, // percentage 0-100 (perhaps store as float 0 - 1; idk)
      country: 'Ethiopia',
      region: 'Yirga Chefe',
      details: 'Zachs Estate',
      species: 'arabica', // 'arabica', 'robusta', 'other'
      species_other: 'weird ass species',
      bean_process: 'fully washed', // natural, semi washed, fully washed, honey, etc
      varietal: 'idk',
      altitude: 12435 // or maybe it'd be '12345 masl', idk yet. the 7g is listed as '1300 - 1600 masl' so probably open text is best
    }
  ]
};

/*
Bean Fields:
✓ - Roaster / Cafe
✓ - Roast Date
- Picture of bean bag
✓ - Roast Level
✓ - Tasting Notes
✓ - Buy again
✓ - Comments
- Roast name (autofilled by origin + roast level if not edited)
 */

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BEAN_CREATE:
      return {
        ...state,
        loading: false,
        error: null,
        currentlyEditingBean: null,
        modalData: {},
      };
    case types.BEAN_CREATING:
      const beanBlendComponentsCreate = _.map(action.payload.data.beanBlendComponents, (option, i ) => {
        if(option.roast_level_advanced_mode === true && option.basic_roast_level){
          return _.omit(option, 'basic_roast_level');
        }
        else if(option.roast_level_advanced_mode === false && option.roast_level){
          return _.omit(option, 'roast_level');
        }
        return option;
      });
      return { ...state,
        loading: true,
        error: '',
        beans: {
          ...state.beans,
          [action.payload.id]: {
            created: action.payload.created,
            modified: action.payload.modified,
            id: action.payload.id,
            bean_image: action.payload.data.bean_image,
            bean_type: action.payload.data.bean_type,
            beanBlendComponents: action.payload.data.bean_type === 'blend' ? beanBlendComponentsCreate : [beanBlendComponentsCreate[0]],
            name: action.payload.data.name,
            cafe: action.payload.data.cafe,
            roast_date: action.payload.data.roast_date,
            tasting_notes: action.payload.data.tasting_notes,
            comments: action.payload.data.comments,
          },
        },
      };
    case types.BEAN_UPDATING:
      const beanBlendComponentsUpdate = _.map(action.payload.data.beanBlendComponents, (option, i ) => {
        if(option.roast_level_advanced_mode === true && option.basic_roast_level){
          return _.omit(option, 'basic_roast_level');
        }
        else if(option.roast_level_advanced_mode === false && option.roast_level){
          return _.omit(option, 'roast_level');
        }
        return option;
      });
      return { ...state,
        loading: true,
        error: '',
        beans: {
          ...state.beans,
          [action.payload.data.id]: {
            ...state.beans[action.payload.data.id],
            modified: action.payload.modified,
            bean_image: action.payload.data.bean_image,
            bean_type: action.payload.data.bean_type,
            beanBlendComponents: action.payload.data.bean_type === 'blend' ? beanBlendComponentsUpdate : [beanBlendComponentsUpdate[0]],
            name: action.payload.data.name,
            cafe: action.payload.data.cafe,
            roast_date: action.payload.data.roast_date,
            tasting_notes: action.payload.data.tasting_notes,
            comments: action.payload.data.comments,
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
        currentlyEditingBean: action.payload,
        modalData: {},
      };
    case types.CAFE_CREATING_BEAN_MODAL:
      return { ...state,
        modalData: {
         cafe: action.payload.id
        }
      };
    case types.ROAST_LEVEL_CREATING_BEAN_MODAL:
      return { ...state,
        modalData: {
          roastLevel: action.payload.id,
          fieldPrefix: action.payload.data.fieldPrefix ? action.payload.data.fieldPrefix : false
        }
      };
    case types.BEAN_PROCESS_CREATING_BEAN_MODAL:
      return { ...state,
        modalData: {
          beanProcess: action.payload.id,
          fieldPrefix: action.payload.data.fieldPrefix ? action.payload.data.fieldPrefix : false
        }
      };
    case types.ORIGIN_CREATING_BEAN_MODAL:
      return { ...state,
        modalData: {
          origin: action.payload.id,
          fieldPrefix: action.payload.data.fieldPrefix ? action.payload.data.fieldPrefix : false
        }
      };
    case types.COFFEE_SPECIES_CREATING_BEAN_MODAL:
      return { ...state,
        modalData: {
          coffeeSpecies: action.payload.id,
          fieldPrefix: action.payload.data.fieldPrefix ? action.payload.data.fieldPrefix : false
        }
      };
    case types.BEAN_CLEAR_MODAL_DATA:
      return { ...state,
        modalData: {}
      };
    case types.BEAN_CREATE_SUCCESS:
    case types.BEAN_UPDATE_SUCCESS:
    case types.BEAN_DELETE_SUCCESS:
      return { ...state,
        loading: false,
        currentlyEditingBean: null,
        modalData: {},
      };
    case types.BEAN_CREATE_FAIL:
    case types.BEAN_UPDATE_FAIL:
    case types.BEAN_DELETE_FAIL:
      return { ...state,
        loading: false,
        error: action.payload
      };
    case types.BEAN_RATE:
      return { ...state,
        loading: false,
        error: '',
        beans: {
          ...state.beans,
          [action.payload.id]: {
            ...state.beans[action.payload.id],
            rating: action.payload.rating,
            buy_again: action.payload.buy_again,
            rating_comments: action.payload.rating_comments
          }
        }

      };
    default:
      return state;
  }
};
