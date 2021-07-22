import {
  AUTH,
  AUTH_LOGIN,
  AUTH_SEND_OTP,
  AUTH_VERIFY_OTP,
  AUTH_SET_PASSWORD,
  AUTH_REFRESH_TOKEN,
  SUCCESS,
  FAIL,
} from '@redux/action-types';

export const login = (payload) => (dispatch) => {
  console.log("am in actions")
  console.log(payload)
  return dispatch({
    type: AUTH_LOGIN,
    payload: {
      request: {
        url: '/v1/auth/login',
        method: 'POST',
        data: payload,
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${AUTH_LOGIN}_${SUCCESS}`,
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
              type: `${AUTH_LOGIN}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${AUTH_LOGIN}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });
}
  

export const sendOTP = (payload) => (dispatch) =>
  dispatch({
    type: AUTH_SEND_OTP,
    payload: {
      request: {
        url: '/v1/otp/generate',
        method: 'POST',
        data: payload,
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${AUTH_SEND_OTP}_${SUCCESS}`,
            payload: data,
          });
          return Promise.resolve(data);
        },
        onError: (exception) => {
          console.error("exception");
          console.error(exception);
          console.error(exception.action);
          console.error(exception.error);
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${AUTH_SEND_OTP}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${AUTH_SEND_OTP}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });

export const verifyOTP = (payload) => (dispatch) =>
  dispatch({
    type: AUTH_VERIFY_OTP,
    payload: {
      request: {
        url: '/v1/auth/login',
        method: 'POST',
        data: payload,
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${AUTH_VERIFY_OTP}_${SUCCESS}`,
            payload: data,
          });
          console.log("data", data)
          return Promise.resolve(data);
        },
        onError: (exception) => {
          console.log("exception")
          console.log(exception)
          if (exception.error.isAxiosError) {
            const {
              response: { data: xhrError },
            } = exception.error;
            console.error(xhrError);
            dispatch({
              type: `${AUTH_VERIFY_OTP}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${AUTH_VERIFY_OTP}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });

export const setPassword = (payload) => (dispatch) =>
  dispatch({
    type: AUTH_SET_PASSWORD,
    payload: {
      request: {
        url: '/v1/password/set',
        method: 'POST',
        data: payload,
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${AUTH_SET_PASSWORD}_${SUCCESS}`,
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
              type: `${AUTH_SET_PASSWORD}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${AUTH_SET_PASSWORD}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });

export const refreshToken = (payload) => (dispatch) =>
  dispatch({
    type: AUTH_REFRESH_TOKEN,
    payload: {
      request: {
        url: '/v1/token/refresh',
        method: 'POST',
        data: payload,
      },
      options: {
        onSuccess: ({ response }) => {
          const { data } = response;
          dispatch({
            type: `${AUTH_REFRESH_TOKEN}_${SUCCESS}`,
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
              type: `${AUTH_REFRESH_TOKEN}_${FAIL}`,
              payload: xhrError,
            });
            return Promise.reject(xhrError);
          }
          console.error(exception);
          dispatch({
            type: `${AUTH_REFRESH_TOKEN}_${FAIL}`,
            payload: exception,
          });
          return Promise.reject({ ...exception });
        },
      },
    },
  });

export const setToken = (accessToken, mobile) => (dispatch) =>
  dispatch({
    type: `${AUTH}_${SUCCESS}`,
    payload: { accessToken, mobile },
  });

export const removeToken = () => (dispatch) =>
  dispatch({
    type: `${AUTH}_${FAIL}`,
    payload: {  },
  });

