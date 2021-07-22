import { GET_ROUTES, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: true,
  routes: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ROUTES:
      return { ...state, isLoading: true };
    case `${GET_ROUTES}_${SUCCESS}`:
      console.log("routes list from api", payload)
      return {
        ...state,
        isLoading: false,
        routes: payload.data
      };
    case `${GET_ROUTES}_${FAIL}`:
      console.log("routes error payload ", payload)
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
