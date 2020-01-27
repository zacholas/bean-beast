import * as types from "../constants/types";

export const importReduxStateData = (reduxState) => {
  return {
    type: types.IMPORT_EXPORTED_DATA,
    payload: reduxState
  };
};
