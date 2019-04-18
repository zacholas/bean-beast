import * as types from '../constants/types';

export const demoBeanIncrement = () => {
  console.log('bean increment');
  return {
    type: types.BEAN_INCREMENT,
  };
};
