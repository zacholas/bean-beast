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