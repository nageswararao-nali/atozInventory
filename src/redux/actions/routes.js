import { GET_ROUTES, SUCCESS, FAIL } from '@redux/action-types';

export const getRoutesData = (deliveryDate) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  const reqData = {delivery_date: deliveryDate};
  // console.log('routes req data ', reqData)
  return dispatch({
    type: GET_ROUTES,
    payload: {
      request: {
        url: '/v1/driver/routes',
        method: 'POST',
        data: reqData,
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          // console.log("routes response ")
          // console.log(response)
          const { data } = response;
          dispatch({
            type: `${GET_ROUTES}_${SUCCESS}`,
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
              type: `${GET_ROUTES}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_ROUTES}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}
  
