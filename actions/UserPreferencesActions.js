import * as types from "../constants/types";
import { throwError } from "../helpers";
import { showMessage } from "react-native-flash-message";

export const saveUserPreferences = (values) => {
  return (dispatch) => {
    _savingUserPreferences(dispatch, values)
      .then(() => {
        dispatch({
          type: types.USER_PREFERENCES_SAVE_SUCCESS,
        });
        // values.navigation.goBack();
        showMessage({
          message: "Success!",
          description: "Your preferences have been updated.",
          type: "success",
          autoHide: 1000,
          icon: 'auto'
        });
      })
      .catch(error => {
        dispatch({
          type: types.USER_PREFERENCES_SAVE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/UserPreferencesActions.js', 'saveUserPreferences');
        // values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error updating your preferences.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _savingUserPreferences = (dispatch, values) => new Promise((resolve, reject) => {
  dispatch({
    type: types.USER_PREFERENCES_SAVING,
    payload: {
      updated: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});
