import * as types from '../constants/types';

const INITIAL_STATE = {
  loading: false,
  error: null,
  modalData: {},
  roastLevels: {
    default_filter: {
      name: 'Filter Roast',
      order: 10,
    },
    default_espresso: {
      name: 'Espresso Roast',
      order: 20,
    },
    default_hybrid: {
      name: 'Filter/Espresso Roast',
      order: 30,
    },
    default_cinnamon: {
      name: 'Cinnamon Roast',
      order: 40,
    },
    default_new_england: {
      name: 'New England Roast',
      order: 50,
    },
    default_half_city: {
      name: 'Half City Roast',
      order: 60,
    },
    default_light: {
      name: 'Light Roast',
      order: 70,
    },
    default_city: {
      name: 'City Roast',
      order: 80,
    },
    default_american: {
      name: 'American Roast',
      order: 90,
    },
    default_breakfast: {
      name: 'Breakfast Roast',
      order: 100,
    },
    default_medium: {
      name: 'Medium Roast',
      order: 110,
    },
    default_full_city: {
      name: 'Full City Roast',
      order: 120,
    },
    default_vienna: {
      name: 'Vienna Roast',
      order: 130,
    },
    default_french: {
      name: 'French Roast',
      order: 140,
    },
    default_italian: {
      name: 'Italian Roast',
      order: 150,
    },
    default_dark: {
      name: 'Dark Roast',
      order: 160,
    }
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
