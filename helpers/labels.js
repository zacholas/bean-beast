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
