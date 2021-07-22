import { GET_ORDERS, PROCESS_ORDER, GET_ORDER, CLOSE_ORDER, SUCCESS, FAIL } from '@redux/action-types';

export const getOrders = () => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  return dispatch({
    type: GET_ORDERS,
    payload: {
      request: {
        url: '/v1/order?status=active',
        method: 'GET',
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${GET_ORDERS}_${SUCCESS}`,
            payload: data.data,
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
              type: `${GET_ORDERS}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_ORDERS}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}
export const getOrder = () => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  return dispatch({
    type: GET_ORDER,
    payload: {
      request: {
        url: '/v1/driver/routes',
        method: 'POST',
        data: {delivery_date: '2021-01-10'},
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${GET_ORDER}_${SUCCESS}`,
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
              type: `${GET_ORDER}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_ORDER}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}
export const rejectOrder = (orderId) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  return dispatch({
    type: CLOSE_ORDER,
    payload: {
      request: {
        url: '/v1/order/'+orderId,
        method: 'DELETE',
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${CLOSE_ORDER}_${SUCCESS}`,
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
              type: `${CLOSE_ORDER}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${CLOSE_ORDER}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}

  
export const processOrder = (orderId) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  return dispatch({
    type: PROCESS_ORDER,
    payload: {
      request: {
        url: '/v1/order/processOrder/'+orderId,
        method: 'GET',
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${PROCESS_ORDER}_${SUCCESS}`,
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
              type: `${PROCESS_ORDER}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${PROCESS_ORDER}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}