export const generateRandomID = (prefix = false, suffix = false, separator = '-') => {
  const rand = new Date().getTime() + '' + Math.floor(Math.random() * (99999999999 - 1));
  let id = '';
  id += prefix ? prefix + separator : '';
  id += rand;
  id += suffix ? separator + suffix : '';

  return id;
};
