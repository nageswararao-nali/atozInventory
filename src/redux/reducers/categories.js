import { GET_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: true,
  categories: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORIES:
      return { ...state, isLoading: true };
    case `${GET_CATEGORIES}_${SUCCESS}`:
    console.log("payload")
    console.log(payload)
      return {
        ...state,
        isLoading: false,
        categories: payload.results,
      };
    case `${GET_CATEGORIES}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case ADD_CATEGORY:
      return { ...state, isLoading: true };

    case `${ADD_CATEGORY}_${SUCCESS}`:
    console.log("items payload after add category")
    console.log(payload)
      const prevState = {...state}
      // console.log(prevState)
      if(payload.id) {
        prevState['categories'].unshift(payload) 
        prevState['error'] = null
      } else {
        prevState['error'] = 'problem in adding category'
      }
      prevState['isLoading'] = false
      return prevState;

    case `${ADD_CATEGORY}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case UPDATE_CATEGORY:
      return { ...state, isLoading: true };

    case `${UPDATE_CATEGORY}_${SUCCESS}`:
    return { ...state, isLoading: false };

    case `${UPDATE_CATEGORY}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    default:
      return state;
  }
};
