import { UPLOAD_IMAGE, SUCCESS, FAIL } from '@redux/action-types';

export const uploadImage = (data) => (dispatch, getState) => {
  let headers = {};
  const token = getState()?.homeReducer?.accessToken;
  if (token) {
    headers = { 
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
     };
  }
  // console.log("get route call")
  return dispatch({
    type: UPLOAD_IMAGE,
    payload: {
      request: {
        url: '/v1/image',
        method: 'POST',
        data: data,
        headers
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${UPLOAD_IMAGE}_${SUCCESS}`,
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
              type: `${UPLOAD_IMAGE}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${UPLOAD_IMAGE}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}
