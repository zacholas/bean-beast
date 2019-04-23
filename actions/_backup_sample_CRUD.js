/*********
 *
 *
 *
 *
 *
 * All you have to do to get a full crud working here is replace "cafe" with "bean" or whatever, and match the case,
 * and that seems to be it.
 *
 * Would potentially be good to make some kind of reusable class or something, IDK. Just wanted to keep this as a backup
 * before the code gets too complicated in case I decide to go down that path eventually.
 *
 *
 *
 */

import { showMessage, hideMessage } from "react-native-flash-message";
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';
import { throwError, generateRandomID } from "../helpers";
// import { NavigationActions, StackActions } from "react-navigation";

export const saveCafe = (values) => {
  if(values.type === 'create'){
    return _createCafe(values);
  }
  else if(values.type === 'edit'){
    return _updateCafe(values);
  }
};

const _createCafe = (values) => {
  const id = generateRandomID('cafe');
  return (dispatch) => {
    _creatingCafe(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.CAFE_CREATE_SUCCESS,
          payload: id,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.CAFE_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/CafeActions.js', '_createCafe');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error creating the cafe.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _creatingCafe = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.CAFE_CREATING,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _updateCafe = (values) => {
  return (dispatch) => {
    _updatingCafe(dispatch, values)
      .then(() => {
        dispatch({
          type: types.CAFE_UPDATE_SUCCESS,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.CAFE_UPDATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/CafeActions.js', '_updateCafe');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error updating the cafe.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _updatingCafe = (dispatch, values) => new Promise((resolve, reject) => {
  dispatch({
    type: types.CAFE_UPDATING,
    payload: {
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

//* I got this working by calling `navigation.dispatch(resetAction)` in the deleteCafe function below, but I don't currently need it.
// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({
//       routeName: 'Main',
//       action: NavigationActions.navigate({ routeName: navRoutes.CAFE_LIST }),
//     }),
//   ],
// });

export const deleteCafe = (id, navigation) => {
  return (dispatch) => {
    _deletingCafe(dispatch, id)
      .then(() => {
        dispatch({
          type: types.CAFE_DELETE_SUCCESS,
        });
        navigation.navigate({
          routeName: navRoutes.CAFE_LIST
        });
      })
      .catch(error => {
        dispatch({
          type: types.CAFE_DELETE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/CafeActions.js', 'deleteCafe');
        navigation.navigate({
          routeName: navRoutes.CAFE_LIST
        });
        showMessage({
          message: "Error",
          description: "There was an error deleting the cafe.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _deletingCafe = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.CAFE_DELETING,
    payload: id
  });
  resolve();
});

export const createCafe = () => {
  return {
    type: types.CAFE_CREATE
  };
};

export const editCafe = (cafeData) => {
  return {
    type: types.CAFE_EDIT,
    payload: cafeData
  };
};
