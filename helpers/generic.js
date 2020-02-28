export const isDefined = (val) => {
  return typeof val !== "undefined";
};

export const isNumeric = val => {
  return !isNaN(val);
};

export const roundToTwo = num => {
  return Math.round((num + Number.EPSILON) * 100) / 100
};

export const roundToOne = num => {
  return Math.round((num + Number.EPSILON) * 10) / 10
};

export const roundToWholeNumber = num => {
  return Math.round((num + Number.EPSILON));
};
