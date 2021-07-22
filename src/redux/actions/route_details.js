import { GET_ROUTE_DETAILS, GET_ROUTE_SUMMARY, SUCCESS, FAIL } from '@redux/action-types';

export const getRouteDetailsData = (id) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  console.log("route id is ...", id)
  return dispatch({
    type: GET_ROUTE_DETAILS,
    payload: {
      request: {
        url: '/v1/driver/route/orders',
        method: 'POST',
        data: {'route_id': id},
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${GET_ROUTE_DETAILS}_${SUCCESS}`,
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
              type: `${GET_ROUTE_DETAILS}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          } else if(exception) {
            console.error(exception);
            dispatch({
              type: `${GET_ROUTE_DETAILS}_${FAIL}`,
              payload: exception,
            });
          }

          
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}

export const getRouteSummary = (id) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  console.log("route id is ...", id)
  return dispatch({
    type: GET_ROUTE_SUMMARY,
    payload: {
      request: {
        url: '/v1/driver/route/summary',
        method: 'POST',
        data: {'route_id': id},
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${GET_ROUTE_SUMMARY}_${SUCCESS}`,
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
              type: `${GET_ROUTE_SUMMARY}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          } else if(exception) {
            console.error(exception);
            dispatch({
              type: `${GET_ROUTE_SUMMARY}_${FAIL}`,
              payload: exception,
            });
          }

          
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}

  
