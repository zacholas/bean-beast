import { showMessage, hideMessage } from "react-native-flash-message";
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';
import { throwError, generateRandomID } from "../helpers";
// import { NavigationActions, StackActions } from "react-navigation";

export const saveOrigin = (values) => {
  if(values.type === 'create'){
    return _createOrigin(values);
  }
  else if(values.type === 'edit'){
    return _updateOrigin(values);
  }
  else if(values.type === 'beanCreateModal'){
    return _beanModalCreateOrigin(values);
  }
};

const _createOrigin = (values) => {
  const id = generateRandomID('origin');
  return (dispatch) => {
    _creatingOrigin(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.ORIGIN_CREATE_SUCCESS,
          payload: id,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.ORIGIN_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/OriginActions.js', '_createOrigin');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error creating the origin.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _creatingOrigin = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.ORIGIN_CREATING,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _beanModalCreateOrigin = (values) => {
  const id = generateRandomID('origin');
  return (dispatch) => {
    _beanModalCreatingOrigin(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.ORIGIN_CREATE_SUCCESS,
          payload: id,
        });
        // values.navigation.goBack();
        values.modal.hide();
      })
      .catch(error => {
        dispatch({
          type: types.ORIGIN_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/OriginActions.js', '_beanModalCreateOrigin');
        // values.navigation.goBack();
        values.modal.hide();
        showMessage({
          message: "Error",
          description: "There was an error creating the origin.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _beanModalCreatingOrigin = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.ORIGIN_CREATING_BEAN_MODAL,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _updateOrigin = (values) => {
  return (dispatch) => {
    _updatingOrigin(dispatch, values)
      .then(() => {
        dispatch({
          type: types.ORIGIN_UPDATE_SUCCESS,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.ORIGIN_UPDATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/OriginActions.js', '_updateOrigin');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error updating the origin.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _updatingOrigin = (dispatch, values) => new Promise((resolve, reject) => {
  dispatch({
    type: types.ORIGIN_UPDATING,
    payload: {
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

export const deleteOrigin = (id, navigation) => {
  return (dispatch) => {
    _deletingOrigin(dispatch, id)
      .then(() => {
        dispatch({
          type: types.ORIGIN_DELETE_SUCCESS,
        });
        navigation.navigate({
          routeName: navRoutes.ORIGIN_LIST
        });
      })
      .catch(error => {
        dispatch({
          type: types.ORIGIN_DELETE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/OriginActions.js', 'deleteOrigin');
        navigation.navigate({
          routeName: navRoutes.ORIGIN_LIST
        });
        showMessage({
          message: "Error",
          description: "There was an error deleting the origin.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _deletingOrigin = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.ORIGIN_DELETING,
    payload: id
  });
  resolve();
});

export const createOrigin = () => {
  return {
    type: types.ORIGIN_CREATE
  };
};

export const editOrigin = (originData) => {
  return {
    type: types.ORIGIN_EDIT,
    payload: originData
  };
};
