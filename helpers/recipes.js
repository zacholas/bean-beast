import _ from 'lodash';
import { isDefined, isNumeric, roundToOne, roundToTwo, roundToWholeNumber } from "./generic";

export const recipeStepFieldDefaultValues = (field_id) => {
  switch (field_id) {
    // case 'default_primary_infusion':
    //   return {
    //     pressure: 1
    //   };
    default:
      return {};
  }
};

export const temperatureConvertFtoC = (temperature) => {
  return (temperature - 32) * (5/9);
};

export const getDaysOffRoast = bean => {
  if(!bean.roast_date || bean.roast_date_active === false){
    return false;
  }
  const date1 = new Date(bean.roast_date);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let output = `${diffDays} Days off roast`;

  if(diffDays === 1){
    output `${diffDays} Day off roast`;
  }

  return {
    diffDays,
    output
  }
};

export const getTotalLiquid = recipe => {
  if(_.size(recipe)){
    if(isDefined(recipe.yield) && isNumeric(recipe.yield) && recipe.yield !== ''){
      return Number(recipe.yield);
    }
    if(recipe.recipe_steps){
      let totalWeight = 0;
      _.forEach(recipe.recipe_steps, step => {
        if(_.size(step) && _.size(step.values) && isDefined(step.values.water_amount) && !isNaN(step.values.water_amount)){
          totalWeight += Number(step.values.water_amount);
        }
      });
      return Number(totalWeight);
    }
  }

  return false;
};

export const getBrewRatio = recipe => {
  if(_.size(recipe) && isDefined(recipe.dose) && !isNaN(recipe.dose)){
    const liquidGrams = getTotalLiquid(recipe);
    if(liquidGrams){
      if(Number(liquidGrams) === 0 || Number(recipe.dose) === 0){
        return false;
      }
      const upperRatio = Number(liquidGrams) / Number(recipe.dose);
      // const upperRatioDisplay = upperRatio > 5 ? roundToWholeNumber(upperRatio) : roundToOne(upperRatio); // Maybe have a user preference for whether or not they want the decimals
      const upperRatioDisplay = roundToOne(upperRatio);
      return `1 : ${upperRatioDisplay}`;
    }
  }
  return false;
};
