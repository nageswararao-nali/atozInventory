import { GET_ROUTE, START_ROUTE, END_ROUTE, SUCCESS, FAIL } from '@redux/action-types';

export const getRoute = (deliveryDate, routeId) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  console.log("get route call")
  return dispatch({
    type: GET_ROUTE,
    payload: {
      request: {
        url: '/v1/driver/routes',
        method: 'POST',
        data: {delivery_date: deliveryDate, id: routeId},
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${GET_ROUTE}_${SUCCESS}`,
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
              type: `${GET_ROUTE}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_ROUTE}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}
export const startRoute = (id) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  console.log("route id ...", id)
  return dispatch({
    type: START_ROUTE,
    payload: {
      request: {
        url: '/v1/route/startdelivery',
        method: 'POST',
        data: {route_id: id},
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${START_ROUTE}_${SUCCESS}`,
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
              type: `${START_ROUTE}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${START_ROUTE}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}
export const endRoute = (id) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  return dispatch({
    type: END_ROUTE,
    payload: {
      request: {
        url: '/v1/route/enddelivery',
        method: 'POST',
        data: {route_id: id},
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${END_ROUTE}_${SUCCESS}`,
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
              type: `${END_ROUTE}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${END_ROUTE}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}
  
