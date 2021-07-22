import { GET_USERS, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: true,
  users: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, isLoading: true };
    case `${GET_USERS}_${SUCCESS}`:
    console.log("users payload ...")
    console.log(payload)
      return {
        ...state,
        isLoading: false,
        users: payload.results,
      };
    case `${GET_USERS}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    
    default:
      return state;
  }
};
