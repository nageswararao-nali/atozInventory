import { GET_USERS, SUCCESS, FAIL } from '@redux/action-types';

export const getUsers = (params) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  // console.log(token, "token")
  return dispatch({
    type: GET_USERS,
    payload: {
      request: {
        url: '/v1/users',
        method: 'GET',
        headers,
        params
      },
      options: {
        onSuccess: ({ response }) => {
          // console.log(response)
          const { data } = response;
          dispatch({
            type: `${GET_USERS}_${SUCCESS}`,
            payload: data,
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
              type: `${GET_USERS}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_USERS}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};

