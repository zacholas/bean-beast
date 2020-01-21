import { showMessage, hideMessage } from "react-native-flash-message";
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';
import { throwError, generateRandomID } from "../helpers";
// import { NavigationActions, StackActions } from "react-navigation";

export const createEquipment = () => {
  return {
    type: types.EQUIPMENT_CREATE
  };
};

export const editEquipment = (equipmentData) => {
  return {
    type: types.EQUIPMENT_EDIT,
    payload: equipmentData
  };
};

//* 1-21-20 so far only the _modalCreateEquipment is in use.
export const saveEquipment = (values) => {
  console.log('saving equipment with values: ', values);
  if(values.type === 'create'){
    return _createEquipment(values);
  }
  else if(values.type === 'edit'){
    return _updateEquipment(values);
  }
  else if(values.type === 'createModal'){
    return _modalCreateEquipment(values);
  }
};

const _createEquipment = (values) => {
  const id = generateRandomID('equipment');
  return (dispatch) => {
    _creatingEquipment(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.EQUIPMENT_CREATE_SUCCESS,
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
          type: types.EQUIPMENT_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/EquipmentActions.js', '_createEquipment');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error creating the equipment.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _creatingEquipment = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.EQUIPMENT_CREATING,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _modalCreateEquipment = (values) => {
  const id = generateRandomID('equipment');
  return (dispatch) => {
    _modalCreatingEquipment(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.EQUIPMENT_CREATE_SUCCESS,
          payload: id,
        });
        // values.navigation.goBack();
        if(values.modal) {
          values.modal.hide();
        }
      })
      .catch(error => {
        dispatch({
          type: types.EQUIPMENT_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/EquipmentActions.js', '_modalCreateEquipment');
        // values.navigation.goBack();
        if(values.modal){
          values.modal.hide();
        }

        showMessage({
          message: "Error",
          description: "There was an error creating the equipment.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _modalCreatingEquipment = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.EQUIPMENT_CREATING_MODAL,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _updateEquipment = (values) => {
  return (dispatch) => {
    _updatingEquipment(dispatch, values)
      .then(() => {
        dispatch({
          type: types.EQUIPMENT_UPDATE_SUCCESS,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.EQUIPMENT_UPDATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/EquipmentActions.js', '_updateEquipment');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error updating the equipment.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _updatingEquipment = (dispatch, values) => new Promise((resolve, reject) => {
  dispatch({
    type: types.EQUIPMENT_UPDATING,
    payload: {
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

//* I got this working by calling `navigation.dispatch(resetAction)` in the deleteEquipment function below, but I don't currently need it.
// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({
//       routeName: 'Main',
//       action: NavigationActions.navigate({ routeName: navRoutes.EQUIPMENTES_LIST }),
//     }),
//   ],
// });

export const deleteEquipment = (id, navigation) => {
  return (dispatch) => {
    _deletingEquipment(dispatch, id)
      .then(() => {
        dispatch({
          type: types.EQUIPMENT_DELETE_SUCCESS,
        });
        navigation.navigate({
          routeName: navRoutes.EQUIPMENTES_LIST
        });
      })
      .catch(error => {
        dispatch({
          type: types.EQUIPMENT_DELETE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/EquipmentActions.js', 'deleteEquipment');
        // navigation.navigate({
        //   routeName: navRoutes.EQUIPMENTES_LIST
        // });
        navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error deleting the equipment.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _deletingEquipment = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.EQUIPMENT_DELETING,
    payload: id
  });
  resolve();
});
