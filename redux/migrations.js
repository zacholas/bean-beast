/** Note to self:
 *  I don't think I can safely import the INITIAL_VALUES from my reducers to use here, because if someone is, say, on
 *  version one and they fast forward to version 6 of the app, it will presumably run through each of the migrations,
 *  and if it's checking for a value on the initital values var that's not actually there, it will presumably throw and
 *  error. So it's probably safest to manually set the initial value both here and on the reducer page.
 */

import _ from 'lodash';
import { required } from "../helpers";

export const migrations = {
  0: (state) => {
    return {
      ...state,
      userPreferences: {
        ...state.userPreferences,
        global: {
          temperatureMeasurement: state.userPreferences.temperatureMeasurement,
        },
        beanEntry: {
          roastLevelAdvancedMode: false
        },
      }
    }
  },
  1: (state) => {
    return {
      ...state,
      userPreferences: {
        loading: false,
        error: '',
        global: {
          temperatureMeasurement: state.userPreferences.temperatureMeasurement,
        },
        beanEntry: {
          roastLevelAdvancedMode: false
        },
      }
    }
  },
  2: (state) => {
    return {
      ...state,
      userPreferences: {
        loading: false,
        error: '',
        global: {
          ztest: 'yes'
          // temperatureMeasurement: state.userPreferences.temperatureMeasurement,
        },
        beanEntry: {
          roastLevelAdvancedMode: false
        },
      }
    }
  },
  3: (state) => {
    return {
      ...state,
      userPreferences: {
        loading: false,
        error: '',
        global: {
          ztest: undefined
          // temperatureMeasurement: state.userPreferences.temperatureMeasurement,
        },
        beanEntry: {
          ...state.userPreferences.beanEntry,
          ztest: state.userPreferences.global.ztest
        },
      }
    }
  },
  4: (state) => {
    return {
      ...state,
      userPreferences: {
        loading: false,
        error: '',
        global: {
          ztest: undefined,
          temperatureMeasurement: state.userPreferences.beanEntry.ztest,
        },
        beanEntry: {
          ztest: undefined
        },
      }
    }
  },
  5: (state) => {
    return {
      ...state,
      userPreferences: {
        loading: false,
        error: '',
        global: {
          temperatureMeasurement: 'c',
        },
        beanEntry: {
          roastLevelAdvancedMode: false
        },
      }
    }
  },
  6: (state) => {
    return {
      ...state,
      userPreferences: {
        ...state.userPreferences,
        global: {
          ...state.userPreferences.global,
          lovesnadia: true
        },
      }
    }
  },
  7: (state) => {
    return {
      ...state,
      userPreferences: {
        ...state.userPreferences,
        global: {
          ...state.userPreferences.global,
          lovesnadia: undefined,
          inRelationshipWithNadia: state.userPreferences.global.lovesnadia
        },
      }
    }
  },
  8: (state) => {
    return {
      ...state,
      userPreferences: {
        ...state.userPreferences,
        global: {
          ...state.userPreferences.global,
          otherThing: state.userPreferences.global.inRelationshipWithNadia
        },
      }
    }
  },
  9: (state) => {
    return {
      ...state,
      userPreferences: {
        ...state.userPreferences,
        global: {
          ...state.userPreferences.global,
          otherThing: undefined,
          inRelationshipWithNadia: undefined
        },
      },
      origins: {
        ...state.origins,
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
      }
    }
  },

  //* 8/22/19 Remove Peru from the default origins list.
  10: (state) => {
    const newOrigins = _.omit(state.origins, 'default_peru');
    return {
      ...state,
      origins: newOrigins
    }
  },
  // Oops, messed up...
  11: (state) => {
    const newOrigins = _.omit(state.origins.origins, 'default_peru');
    return {
      ...state,
      origins: {
        ...state.origins,
        origins: newOrigins
      }
    }
  },
  12: (state) => {
    return {
      ...state,
      recipeSteps: {
        ...state.recipeSteps,
        recipeSteps: {
          ...state.recipeSteps.recipeSteps,
          default_wait: {
            ...state.recipeSteps.recipeSteps.default_wait,
            description: 'wait dawg',
          }
        }
      }
    }
  },
  13: (state) => {
    return state;
  },
  14: (state) => {
    return {
      ...state,
      recipeSteps: {
        ...state.recipeSteps,
        recipeSteps: {
          ...state.recipeSteps.recipeSteps,
          default_wait: {
            ...state.recipeSteps.recipeSteps.default_wait,
            description: null,
          },
          default_taint: {
            ...state.recipeSteps.recipeSteps.default_taint,
            description: 'Add travesties like milk, sugar, etc. (#nojudgement)',
          }
        }
      }
    }
  },
  15: (state) => {
    return {
      ...state,
      recipeSteps: {
        ...state.recipeSteps,
        recipeSteps: {
          ...state.recipeSteps.recipeSteps,
          default_wait: {
            ...state.recipeSteps.recipeSteps.default_wait,
            validation: {
              length: [ required ]
            }
          },
        }
      }
    }
  },
  16: (state) => {
    return {
      ...state,
      recipeSteps: {
        ...state.recipeSteps,
        recipeSteps: {
          ...state.recipeSteps.recipeSteps,
          default_wait: {
            ...state.recipeSteps.recipeSteps.default_wait,
            validation: undefined
          },
        }
      }
    }
  },
  17: (state) => {
    return {
      ...state,
      userPreferences: {
        ...state.userPreferences,
        global_temperatureMeasurement: state.userPreferences.global.temperatureMeasurement,
        bean_roastLevelAdvancedMode: state.userPreferences.beanEntry.roastLevelAdvancedMode,
        global: undefined,
        beanEntry: undefined
      }
    }
  },
  18: (state) => {
    return state;
  },
  19: (state) => {
    return state;
  },
  20: (state) => {
    return state;
  },
  21: (state) => {
    return state;
  },
  22: (state) => {
    return state;
  },
  23: (state) => {
    return {
      ...state,
      brewMethods: {
        ...state.brewMethods,
        brewMethods: {
          ...state.brewMethods.brewMethods,
          default_french_press: {
            id: 'default_french_press',
            name: 'French Press',
            order: 40,
          },
          default_other: {
            id: 'default_other',
            name: 'Other',
            order: 50,
          },
        }
      }
    }
  },
  24: state => {
    const newRecipes = _.filter(state.recipes.recipes, recipe => {
      if(!recipe.temperatureMeasurement){
        recipe.temperatureMeasurement = 'c';
      }

      return recipe;
    });
    return {
      ...state,
      recipes: {
        ...state.recipes,
        recipes: newRecipes
      }
    }
  },
  25: state => {
    let newRecipes = {};
    _.forEach(state.recipes.recipes, recipe => {
      newRecipes[recipe.id] = recipe
    });

    return {
      ...state,
      recipes: {
        ...state.recipes,
        recipes: newRecipes
      }
    }
  },
  26: state => {
    let newBeans = {};
    _.forEach(state.beans.beans, bean => {
      if(typeof bean.roast_date_active === "undefined"){
        bean.roast_date_active = true;
      }

      newBeans[bean.id] = bean
    });


    return {
      ...state,
      beans: {
        ...state.beans,
        beans: newBeans
      }
    }
  },
};
