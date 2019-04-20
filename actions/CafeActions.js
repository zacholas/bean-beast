import * as types from '../constants/types';
import * as navRoutes from '../constants/NavRoutes';

export const saveCafe = (values) => {
  if(values.type === 'create'){
    return _createCafe(values);
  }
  else if(values.type === 'update'){
    return _updateCafe(values);
  }
};

const _createCafe = (values) => {
  const id = 'cafe-' + new Date().getTime() + Math.floor(Math.random() * (9999 - 1));
  return (dispatch) => {
    _creatingCafe(dispatch, values, id)
      .then(() => {
        dispatch({
          type: types.CAFE_CREATE_SUCCESS,
          payload: id,
        });
        values.navigation.goBack();
      });
  };
};


//* TODO catch error
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

export const deleteCafe = (id, navigation) => {
  return (dispatch) => {
    _deletingCafe(dispatch, id)
      .then(() => {
        dispatch({
          type: types.CAFE_DELETE_SUCCESS,
        });
        navigation.popToTop();
        // navigation.navigate({
        //   routeName: navRoutes.CAFE_LIST
        // });
        // console.log('delete cafe navigation', navigation);
        // navigation.reset({
        //   routeName: navRoutes.CAFE_LIST
        // });
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
