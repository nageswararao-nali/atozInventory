import { GET_ROUTE, START_ROUTE, END_ROUTE, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: true,
  routeInfo: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ROUTE:
      return { ...state, isLoading: true };
    case `${GET_ROUTE}_${SUCCESS}`:
      console.log("route response", payload)
      if(payload.data.length) {
        return {
          ...state,
          isLoading: false,
          routeInfo: payload.data[0]
        };
      } else {
        return {
          ...state,
          isLoading: false,
          routeInfo: {},
          error: 'Route info not found!'
        };
      }
      
    case `${GET_ROUTE}_${FAIL}`:
      console.log("route error payload ", payload)
      return { ...state, isLoading: false, routeInfo: {}, error: payload };
    case START_ROUTE:
      return { ...state, isLoading: true };
    case `${START_ROUTE}_${SUCCESS}`:
      console.log("start payload", payload)
      return {
        ...state,
        isLoading: false,
        // routeInfo: payload.data
      };
    case `${START_ROUTE}_${FAIL}`:
      console.log("route start error payload ", payload)
      return { ...state, isLoading: false, error: payload };
    case END_ROUTE:
      return { ...state, isLoading: true };
    case `${END_ROUTE}_${SUCCESS}`:
      console.log("payload", payload)
      return {
        ...state,
        isLoading: false,
        // routes: payload.data
      };
    case `${END_ROUTE}_${FAIL}`:
      console.log("route end error payload ", payload)
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
