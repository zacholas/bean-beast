import { showMessage, hideMessage } from "react-native-flash-message";
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';
import { throwError, generateRandomID } from "../helpers";
// import { NavigationActions, StackActions } from "react-navigation";

export const createBeanProcess = () => {
  return {
    type: types.BEAN_PROCESS_CREATE
  };
};

export const editBeanProcess = (beanProcessData) => {
  return {
    type: types.BEAN_PROCESS_EDIT,
    payload: beanProcessData
  };
};

export const saveBeanProcess = (values) => {
  if(values.type === 'create'){
    return _createBeanProcess(values);
  }
  else if(values.type === 'edit'){
    return _updateBeanProcess(values);
  }
  else if(values.type === 'beanCreateModal'){
    return _beanModalCreateBeanProcess(values);
  }
};

const _createBeanProcess = (values) => {
  const id = generateRandomID('beanProcess');
  return (dispatch) => {
    _creatingBeanProcess(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.BEAN_PROCESS_CREATE_SUCCESS,
          payload: id,
        });
        if(Object.keys(values.modal).length){
          values.modal.hide();
        }
        else {
          values.navigation.goBack();
        }
      })
      .catch(error => {
        dispatch({
          type: types.BEAN_PROCESS_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/BeanProcessActions.js', '_createBeanProcess');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error creating the bean processing method.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _creatingBeanProcess = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.BEAN_PROCESS_CREATING,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _beanModalCreateBeanProcess = (values) => {
  const id = generateRandomID('beanProcess');
  return (dispatch) => {
    _beanModalCreatingBeanProcess(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.BEAN_PROCESS_CREATE_SUCCESS,
          payload: id,
        });
        // values.navigation.goBack();
        values.modal.hide();
      })
      .catch(error => {
        dispatch({
          type: types.BEAN_PROCESS_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/BeanProcessActions.js', '_beanModalCreateBeanProcess');
        // values.navigation.goBack();
        values.modal.hide();
        showMessage({
          message: "Error",
          description: "There was an error creating the bean processing method.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _beanModalCreatingBeanProcess = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.BEAN_PROCESS_CREATING_BEAN_MODAL,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _updateBeanProcess = (values) => {
  return (dispatch) => {
    _updatingBeanProcess(dispatch, values)
      .then(() => {
        dispatch({
          type: types.BEAN_PROCESS_UPDATE_SUCCESS,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.BEAN_PROCESS_UPDATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/BeanProcessActions.js', '_updateBeanProcess');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error updating the bean processing method.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _updatingBeanProcess = (dispatch, values) => new Promise((resolve, reject) => {
  dispatch({
    type: types.BEAN_PROCESS_UPDATING,
    payload: {
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

//* I got this working by calling `navigation.dispatch(resetAction)` in the deleteBeanProcess function below, but I don't currently need it.
// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({
//       routeName: 'Main',
//       action: NavigationActions.navigate({ routeName: navRoutes.BEAN_PROCESSES_LIST }),
//     }),
//   ],
// });

export const deleteBeanProcess = (id, navigation) => {
  return (dispatch) => {
    _deletingBeanProcess(dispatch, id)
      .then(() => {
        dispatch({
          type: types.BEAN_PROCESS_DELETE_SUCCESS,
        });
        navigation.navigate({
          routeName: navRoutes.BEAN_PROCESSES_LIST
        });
      })
      .catch(error => {
        dispatch({
          type: types.BEAN_PROCESS_DELETE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/BeanProcessActions.js', 'deleteBeanProcess');
        // navigation.navigate({
        //   routeName: navRoutes.BEAN_PROCESSES_LIST
        // });
        navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error deleting the bean processing method.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _deletingBeanProcess = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.BEAN_PROCESS_DELETING,
    payload: id
  });
  resolve();
});
