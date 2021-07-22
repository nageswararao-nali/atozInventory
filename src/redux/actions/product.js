import { ADD_PRODUCT, CLEAR_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SUCCESS, FAIL } from '@redux/action-types';

export const addProduct = (productData) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  console.log(productData)
  return dispatch({
    type: ADD_PRODUCT,
    payload: {
      request: {
        url: '/v1/product',
        method: 'POST',
        data: productData,
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${ADD_PRODUCT}_${SUCCESS}`,
            payload: data,
          });
          return Promise.resolve(data);
        },
        onError: (exception) => {
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${ADD_PRODUCT}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${ADD_PRODUCT}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}

export const updateProduct = (productId, productData) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  console.log(productData)
  return dispatch({
    type: UPDATE_PRODUCT,
    payload: {
      request: {
        url: '/v1/product/'+productId,
        method: 'PATCH',
        data: productData,
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${UPDATE_PRODUCT}_${SUCCESS}`,
            payload: data,
          });
          return Promise.resolve(data);
        },
        onError: (exception) => {
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${UPDATE_PRODUCT}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${UPDATE_PRODUCT}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}

export const deleteProduct = (productId) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  return dispatch({
    type: DELETE_PRODUCT,
    payload: {
      request: {
        url: '/v1/product/'+productId,
        method: 'DELETE',
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${DELETE_PRODUCT}_${SUCCESS}`,
            payload: productId,
          });
          return Promise.resolve(data);
        },
        onError: (exception) => {
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${DELETE_PRODUCT}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${DELETE_PRODUCT}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}

export const clearProduct = () => (dispatch) => {
  dispatch({
    type: `${CLEAR_PRODUCT}`,
    payload: {},
  });
  return Promise.resolve({});
}

  
