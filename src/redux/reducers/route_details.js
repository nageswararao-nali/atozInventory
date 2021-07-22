import { GET_ROUTE_DETAILS, GET_ROUTE_SUMMARY, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: true,
  routeData: {},
  routeSummary: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ROUTE_DETAILS:
      return { ...state, isLoading: true };
    case `${GET_ROUTE_DETAILS}_${SUCCESS}`:
      console.log("route order details ", payload)
      if(payload.results.length) {
        return {
          ...state,
          isLoading: false,
          routeData: payload.results
        };
      } else {
        return {
          ...state,
          isLoading: false,
          routeData: {},
          error: 'Data not found'
        };
      }
      
    case `${GET_ROUTE_DETAILS}_${FAIL}`:
      return { ...state, isLoading: false, routeData: {}, error: payload };

    case GET_ROUTE_SUMMARY:
      return { ...state, isLoading: true };
    case `${GET_ROUTE_SUMMARY}_${SUCCESS}`:
      console.log("summary payload", payload)
      return {
        ...state,
        isLoading: false,
        routeSummary: payload.summary
      };
    case `${GET_ROUTE_SUMMARY}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
