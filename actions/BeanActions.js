import * as types from '../constants/Types';

export const demoBeanIncrement = () => {
  console.log('bean increment');
  return {
    type: types.BEAN_INCREMENT,
  };
};
