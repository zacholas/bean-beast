import { showMessage, hideMessage } from "react-native-flash-message";
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';
import { throwError, generateRandomID } from "../helpers";
// import { NavigationActions, StackActions } from "react-navigation";

export const saveRoastLevel = (values) => {
  if(values.type === 'create'){
    return _createRoastLevel(values);
  }
  else if(values.type === 'edit'){
    return _updateRoastLevel(values);
  }
};

const _createRoastLevel = (values) => {
  const id = generateRandomID('roastLevel');
  return (dispatch) => {
    _creatingRoastLevel(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.ROAST_LEVEL_CREATE_SUCCESS,
          payload: id,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.ROAST_LEVEL_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/RoastLevelActions.js', '_createRoastLevel');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error creating the roastLevel.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _creatingRoastLevel = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.ROAST_LEVEL_CREATING,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _updateRoastLevel = (values) => {
  return (dispatch) => {
    _updatingRoastLevel(dispatch, values)
      .then(() => {
        dispatch({
          type: types.ROAST_LEVEL_UPDATE_SUCCESS,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.ROAST_LEVEL_UPDATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/RoastLevelActions.js', '_updateRoastLevel');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error updating the roastLevel.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _updatingRoastLevel = (dispatch, values) => new Promise((resolve, reject) => {
  dispatch({
    type: types.ROAST_LEVEL_UPDATING,
    payload: {
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

//* I got this working by calling `navigation.dispatch(resetAction)` in the deleteRoastLevel function below, but I don't currently need it.
// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({
//       routeName: 'Main',
//       action: NavigationActions.navigate({ routeName: navRoutes.ROAST_LEVEL_LIST }),
//     }),
//   ],
// });

export const deleteRoastLevel = (id, navigation) => {
  return (dispatch) => {
    _deletingRoastLevel(dispatch, id)
      .then(() => {
        dispatch({
          type: types.ROAST_LEVEL_DELETE_SUCCESS,
        });
        navigation.navigate({
          routeName: navRoutes.ROAST_LEVEL_LIST
        });
      })
      .catch(error => {
        dispatch({
          type: types.ROAST_LEVEL_DELETE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/RoastLevelActions.js', 'deleteRoastLevel');
        navigation.navigate({
          routeName: navRoutes.ROAST_LEVEL_LIST
        });
        showMessage({
          message: "Error",
          description: "There was an error deleting the roastLevel.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _deletingRoastLevel = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.ROAST_LEVEL_DELETING,
    payload: id
  });
  resolve();
});

export const createRoastLevel = () => {
  return {
    type: types.ROAST_LEVEL_CREATE
  };
};

export const editRoastLevel = (roastLevelData) => {
  return {
    type: types.ROAST_LEVEL_EDIT,
    payload: roastLevelData
  };
};
