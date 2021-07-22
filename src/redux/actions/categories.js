import { GET_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, SUCCESS, FAIL } from '@redux/action-types';

export const getCategories = () => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  console.log("in get categories token")
  return dispatch({
    type: GET_CATEGORIES,
    payload: {
      request: {
        url: '/v1/category?isCategory=true',
        method: 'GET',
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          // console.log(response)
          const {
            data: { data: categories },
          } = response;
          dispatch({
            type: `${GET_CATEGORIES}_${SUCCESS}`,
            payload: categories,
          });
          return Promise.resolve(categories);
        },
        onError: (exception) => {
          console.log(exception.error)
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${GET_CATEGORIES}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_CATEGORIES}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};

export const addCategory = (categoryData) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  console.log(token, "token")
  return dispatch({
    type: ADD_CATEGORY,
    payload: {
      request: {
        url: '/v1/category',
        method: 'POST',
        data: categoryData,
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${ADD_CATEGORY}_${SUCCESS}`,
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
              type: `${ADD_CATEGORY}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${ADD_CATEGORY}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};

export const updateCategory = (categoryId, categoryData) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  console.log(token, "token")
  return dispatch({
    type: UPDATE_CATEGORY,
    payload: {
      request: {
        url: '/v1/category/'+categoryId,
        method: 'PATCH',
        data: categoryData,
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${UPDATE_CATEGORY}_${SUCCESS}`,
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
              type: `${UPDATE_CATEGORY}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${UPDATE_CATEGORY}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};
