import { GET_SUB_CATEGORIES, UPDATE_SUB_CATEGORY, DELETE_SUB_CATEGORY, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: true,
  subCategories: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SUB_CATEGORIES:
      return { ...state, isLoading: true };
    case `${GET_SUB_CATEGORIES}_${SUCCESS}`:
    // console.log("subs payload")
    // console.log(payload)
      return {
        ...state,
        isLoading: false,
        subCategories: payload.results,
      };
    case `${GET_SUB_CATEGORIES}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case DELETE_SUB_CATEGORY:
      return { ...state, isLoading: true };
    case `${DELETE_SUB_CATEGORY}_${SUCCESS}`:
    // console.log("subs payload")
    // console.log(payload)
      let subCategories = state.subCategories.filter((subCategory) => {
        if(subCategory.id != payload) {
          return subCategory
        }
      })

      return {
        ...state,
        isLoading: false,
        subCategories: subCategories
      };
    case `${UPDATE_SUB_CATEGORY}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case `${UPDATE_SUB_CATEGORY}_${SUCCESS}`:
    // console.log("subs payload")
    // console.log(payload)
      let subCategoriesData = state.subCategories.filter((subCategory) => {
        if(subCategory.id == payload.id) {
          Object.assign(subCategory, payload)
        }
        return subCategory
      })

      return {
        ...state,
        isLoading: false,
        subCategories: subCategoriesData
      };
    case `${UPDATE_SUB_CATEGORY}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    default:
      return state;
  }
};
