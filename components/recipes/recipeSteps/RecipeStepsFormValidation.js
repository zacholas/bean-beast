import {recipeSteps_default_wait_length, notRequired, required} from "../../../helpers";

export const recipe_steps_validation = {
  default_wait: {
    length: (value) => {
      if (!value || value < 1) {
        return 'You need to enter a wait time.';
      }
      if (isNaN(value)) {
        return 'Wait time needs to be a number.';
      }
      return undefined;
    },
    notes: (value) => {
      return undefined;
    }
  },
  default_taint: {
    notes: (value) => {
      if(!value){
        return 'You need to describe the way in which you will defile the coffee.';
      }
      return undefined;
    }
  }
};