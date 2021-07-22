import { GET_SUB_CATEGORIES, UPDATE_SUB_CATEGORY, DELETE_SUB_CATEGORY, SUCCESS, FAIL } from '@redux/action-types';

export const getSubCategories = (params) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  // console.log(token, "token")
  // console.log('/v1/category?isCategory=false', "url")
  return dispatch({
    type: GET_SUB_CATEGORIES,
    payload: {
      request: {
        url: '/v1/category',
        method: 'GET',
        params,
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          const {
            data: { data: subcategories },
          } = response;
          dispatch({
            type: `${GET_SUB_CATEGORIES}_${SUCCESS}`,
            payload: subcategories,
          });
          return Promise.resolve(subcategories);
        },
        onError: (exception) => {
          console.log(exception.error)
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${GET_SUB_CATEGORIES}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${GET_SUB_CATEGORIES}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};

export const updateSubCategory = (categoryId, categoryData) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  console.log(token, "token")
  return dispatch({
    type: UPDATE_SUB_CATEGORY,
    payload: {
      request: {
        url: '/v1/category/'+categoryId,
        method: 'PATCH',
        data: categoryData,
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          console.log(response)
          const { data } = response;
          console.log(data)
          dispatch({
            type: `${UPDATE_SUB_CATEGORY}_${SUCCESS}`,
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
              type: `${UPDATE_SUB_CATEGORY}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${UPDATE_SUB_CATEGORY}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};

export const deleteSubCategory = (categoryId) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }
  // console.log(token, "token")
  // console.log('/v1/category?isCategory=false', "url")
  return dispatch({
    type: DELETE_SUB_CATEGORY,
    payload: {
      request: {
        url: '/v1/category/'+categoryId,
        method: 'DELETE',
        headers,
      },
      options: {
        onSuccess: ({ response }) => {
          console.log(response)
          // const {
          //   data: { data: subcategories },
          // } = response;
          dispatch({
            type: `${DELETE_SUB_CATEGORY}_${SUCCESS}`,
            payload: categoryId,
          });
          return Promise.resolve(subcategories);
        },
        onError: (exception) => {
          console.log(exception.error)
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${DELETE_SUB_CATEGORY}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${DELETE_SUB_CATEGORY}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
};


