import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, SUCCESS, FAIL } from '@redux/action-types';

export const getItems = (params) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  // console.log(token, "token")
  return dispatch({
    type: GET_ITEMS,
    payload: {
      request: {
        url: '/v1/item',
        method: 'GET',
        headers,
        params
      },
      options: {
        onSuccess: ({ response }) => {
          // console.log(response)
          const {
            data: { data: items },
          } = response;
          dispatch({
            type: `${GET_ITEMS}_${SUCCESS}`,
            payload: items,
          });
          return Promise.resolve(items);
        },
        onError: (exception) => {
          console.log(exception.error)
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${GET_ITEMS}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_ITEMS}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};

export const addItem = (itemData) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  // console.log(token, "add item token")
  return dispatch({
    type: ADD_ITEM,
    payload: {
      request: {
        url: '/v1/item',
        method: 'POST',
        data: itemData,
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${ADD_ITEM}_${SUCCESS}`,
            payload: data,
          });
          return Promise.resolve(data);
        },
        onError: (exception) => {
          console.log(exception.error)
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${ADD_ITEM}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${ADD_ITEM}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};

export const updateItem = (itemId, itemData) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  // console.log(token, "add item token")
  return dispatch({
    type: UPDATE_ITEM,
    payload: {
      request: {
        url: '/v1/item/'+itemId,
        method: 'PATCH',
        data: itemData,
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${UPDATE_ITEM}_${SUCCESS}`,
            payload: data,
          });
          return Promise.resolve(data);
        },
        onError: (exception) => {
          console.log(exception.error)
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${UPDATE_ITEM}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${UPDATE_ITEM}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};

export const deleteItem = (itemId) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  // console.log(token, "add item token")
  return dispatch({
    type: DELETE_ITEM,
    payload: {
      request: {
        url: '/v1/item/'+itemId,
        method: 'DELETE',
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${DELETE_ITEM}_${SUCCESS}`,
            payload: itemId,
          });
          return Promise.resolve(data);
        },
        onError: (exception) => {
          console.log(exception.error)
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${DELETE_ITEM}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${DELETE_ITEM}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};
