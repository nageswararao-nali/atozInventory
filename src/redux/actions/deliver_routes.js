import { GET_ROUTES, SUCCESS, FAIL } from '@redux/action-types';

export const getRoutes = (params) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  return dispatch({
    type: GET_ROUTES,
    payload: {
      request: {
        url: '/v1/publishedvariant/get',
        method: 'GET',
        params,
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          const {
            data: { results },
          } = response;
          dispatch({
            type: `${GET_ROUTES}_${SUCCESS}`,
            payload: results,
          });
          return Promise.resolve(results);
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
};
