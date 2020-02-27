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
