import { GET_PRODUCTS, SUCCESS, FAIL } from '@redux/action-types';

export const getProducts = (params) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  return dispatch({
    type: GET_PRODUCTS,
    payload: {
      request: {
        url: '/v1/product/inventory',
        method: 'GET',
        params,
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          const {
            data: { data: products },
          } = response;
          dispatch({
            type: `${GET_PRODUCTS}_${SUCCESS}`,
            payload: products,
          });
          return Promise.resolve(products);
        },
        onError: (exception) => {
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${GET_PRODUCTS}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_PRODUCTS}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};
