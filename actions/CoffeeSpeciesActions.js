import { showMessage, hideMessage } from "react-native-flash-message";
import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';
import { throwError, generateRandomID } from "../helpers";
// import { NavigationActions, StackActions } from "react-navigation";

export const createCoffeeSpecies = () => {
  return {
    type: types.COFFEE_SPECIES_CREATE
  };
};

export const editCoffeeSpecies = (coffeeSpeciesData) => {
  return {
    type: types.COFFEE_SPECIES_EDIT,
    payload: coffeeSpeciesData
  };
};

export const saveCoffeeSpecies = (values) => {
  if(values.type === 'create'){
    return _createCoffeeSpecies(values);
  }
  else if(values.type === 'edit'){
    return _updateCoffeeSpecies(values);
  }
  else if(values.type === 'beanCreateModal'){
    return _beanModalCreateCoffeeSpecies(values);
  }
};

const _createCoffeeSpecies = (values) => {
  const id = generateRandomID('coffeeSpecies');
  return (dispatch) => {
    _creatingCoffeeSpecies(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.COFFEE_SPECIES_CREATE_SUCCESS,
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
          type: types.COFFEE_SPECIES_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/CoffeeSpeciesActions.js', '_createCoffeeSpecies');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error creating the coffee species.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _creatingCoffeeSpecies = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.COFFEE_SPECIES_CREATING,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _beanModalCreateCoffeeSpecies = (values) => {
  const id = generateRandomID('coffeeSpecies');
  return (dispatch) => {
    _beanModalCreatingCoffeeSpecies(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.COFFEE_SPECIES_CREATE_SUCCESS,
          payload: id,
        });
        // values.navigation.goBack();
        values.modal.hide();
      })
      .catch(error => {
        dispatch({
          type: types.COFFEE_SPECIES_CREATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/CoffeeSpeciesActions.js', '_beanModalCreateCoffeeSpecies');
        // values.navigation.goBack();
        values.modal.hide();
        showMessage({
          message: "Error",
          description: "There was an error creating the coffee species.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _beanModalCreatingCoffeeSpecies = (dispatch, values, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.COFFEE_SPECIES_CREATING_BEAN_MODAL,
    payload: {
      id,
      created: new Date().getTime(),
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

const _updateCoffeeSpecies = (values) => {
  return (dispatch) => {
    _updatingCoffeeSpecies(dispatch, values)
      .then(() => {
        dispatch({
          type: types.COFFEE_SPECIES_UPDATE_SUCCESS,
        });
        values.navigation.goBack();
      })
      .catch(error => {
        dispatch({
          type: types.COFFEE_SPECIES_UPDATE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/CoffeeSpeciesActions.js', '_updateCoffeeSpecies');
        values.navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error updating the coffee species.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _updatingCoffeeSpecies = (dispatch, values) => new Promise((resolve, reject) => {
  dispatch({
    type: types.COFFEE_SPECIES_UPDATING,
    payload: {
      modified: new Date().getTime(),
      data: values,
    },
  });
  resolve();
});

//* I got this working by calling `navigation.dispatch(resetAction)` in the deleteCoffeeSpecies function below, but I don't currently need it.
// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({
//       routeName: 'Main',
//       action: NavigationActions.navigate({ routeName: navRoutes.COFFEE_SPECIESES_LIST }),
//     }),
//   ],
// });

export const deleteCoffeeSpecies = (id, navigation) => {
  return (dispatch) => {
    _deletingCoffeeSpecies(dispatch, id)
      .then(() => {
        dispatch({
          type: types.COFFEE_SPECIES_DELETE_SUCCESS,
        });
        navigation.navigate({
          routeName: navRoutes.COFFEE_SPECIESES_LIST
        });
      })
      .catch(error => {
        dispatch({
          type: types.COFFEE_SPECIES_DELETE_FAIL,
          payload: error,
        });
        throwError(error, '/actions/CoffeeSpeciesActions.js', 'deleteCoffeeSpecies');
        // navigation.navigate({
        //   routeName: navRoutes.COFFEE_SPECIESES_LIST
        // });
        navigation.goBack();
        showMessage({
          message: "Error",
          description: "There was an error deleting the coffee species.",
          type: "danger",
          autoHide: false,
          icon: 'auto'
        });
      });
  };
};

const _deletingCoffeeSpecies = (dispatch, id) => new Promise((resolve, reject) => {
  dispatch({
    type: types.COFFEE_SPECIES_DELETING,
    payload: id
  });
  resolve();
});
