export const roastLevelDisplay = (roast_level) => {
  switch (roast_level) {
    case 1:
      return 'Light Roast';
    case 2:
      return 'Medium-Light Roast';
    case 3:
      return 'Medium Roast';
    case 4:
      return 'Medium-Dark Roast';
    case 5:
      return 'Dark Roast';
  }
};

// export const beanTitleDisplay = (origin, roast_level) => {
//   if(origin || roast_level){
//     let output = '';
//     output = origin && origin.country ? output.concat(origin.country + ' ') : output;
//     output = origin && origin.region ? output.concat(origin.region + ' ') : output;
//     output = roast_level ? output.concat(roastLevelDisplay(roast_level)) : output;
//
//     return output;
//   }
//
//   return 'Unnamed Bean';
// };
