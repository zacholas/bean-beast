import _ from 'lodash';
import * as types from '../constants/types';

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
  roast_level: 4,
  tasting_notes: 'Mixed bellyy nakha',
  comments: 'Yommm',
  bean_image: 'imgsrc',
  bean_type: 'single_origin', // false, 'single_origin', 'blend',
  bean_details: [
    {
      blend_ratio: 100, // percentage 0-100 (perhaps store as float 0 - 1; idk)
      country: 'Ethiopia',
      region: 'Yirga Chefe',
      details: 'Zachs Estate',
      species: 'arabica', // 'arabica', 'robusta', 'other'
      species_other: 'weird ass species',
      processing_method: 'fully washed', // natural, semi washed, fully washed, honey, other
      processing_method_other: 'only like a third washed',
      varietal: 'idk',
      altitude: 12435 // or maybe it'd be '12345 masl', idk yet. the 7g is listed as '1300 - 1600 masl' so probably open text is best
    }
  ]
};

/*
Bean Fields:
*** @todo need some way to account for blend components --- maybe allow someone to select single origin or blend and show certain fields based on that.
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
            cafe: action.payload.data.cafe,
            roast_date: action.payload.data.roast_date,
            roast_level: action.payload.data.roast_level,
            tasting_notes: action.payload.data.tasting_notes,
            comments: action.payload.data.comments,
            bean_image: action.payload.data.bean_image,
            origin: action.payload.data.origin
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
            cafe: action.payload.data.cafe,
            roast_date: action.payload.data.roast_date,
            roast_level: action.payload.data.roast_level,
            tasting_notes: action.payload.data.tasting_notes,
            comments: action.payload.data.comments,
            bean_image: action.payload.data.bean_image,
            origin: action.payload.data.origin,
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
    case types.ORIGIN_CREATING_BEAN_MODAL:
      return { ...state,
        modalData: {
          origin: action.payload.id
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
