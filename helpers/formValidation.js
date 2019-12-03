export const required     = value => (value || typeof value === 'number' ? undefined : 'This field is required.');
export const futureDate   = value => (value > new Date ? undefined : 'The date must be in the future.');
export const pastDate     = value => (value < new Date ? undefined : 'The date must be in the past.');
export const alwaysError  = value => ('there was an error because there always is with this one.');
export const isNumber     = value => (!isNaN(value) ||  typeof value === 'undefined' ? undefined : 'This field needs to be a number.');
export const notRequired  = value => (undefined);

// export const required = (value, customErrorMsg = null) => {
//   if(value || typeof value === 'number'){
//     return undefined;
//   }
//   return customErrorMsg ? customErrorMsg : 'This field is required.';
// };

//* Recipes Validation
export const recipeSteps_default_wait_length = (value) => {
  if(!value || value < 1){
    return 'You need to enter a wait time.';
  }
  if(isNaN(value)){
    return 'Wait time needs to be a number.';
  }
  return undefined;
  // if(value > 0){
  //   return undefined;
  // }
  // return customErrorMsg ? customErrorMsg : 'This field is required.';
};
