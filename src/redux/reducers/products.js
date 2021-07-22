import { GET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: true,
  products: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS:
      return { ...state, isLoading: true };
    case `${GET_PRODUCTS}_${SUCCESS}`:
      // console.log("product payload")
      // console.log(payload)
      return {
        ...state,
        isLoading: false,
        products: payload.results,
      };
    case `${GET_PRODUCTS}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case ADD_PRODUCT:
      return { ...state, isLoading: true };

    case `${ADD_PRODUCT}_${SUCCESS}`:
      // console.log("product payload")
      // console.log(payload)
      const prevState = {...state}
      // console.log(prevState)
      if(payload.id) {
        prevState['products'].unshift(payload) 
        prevState['error'] = null
      } else {
        prevState['error'] = 'problem in adding product'
      }
      prevState['isLoading'] = false
      return prevState;

    case `${ADD_PRODUCT}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case UPDATE_PRODUCT:
      return { ...state, isLoading: true };

    case `${UPDATE_PRODUCT}_${SUCCESS}`:
    // console.log("items payload after add item")
    // console.log(payload)
      let productsData = state.products.filter((product) => {
        if(product.id == payload.id) {
          Object.assign(product, payload)
        }
        return product
      })
      return {
        ...state,
        isLoading: false,
        products: productsData,
      };

    case `${UPDATE_PRODUCT}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case DELETE_PRODUCT:
      return { ...state, isLoading: true };

    case `${DELETE_PRODUCT}_${SUCCESS}`:
    console.log("delete products payload after add product")
    console.log(payload)
      let products = state.products.filter((product) => {
        if(product.id != payload) {
          return product
        }
      })
      return {
        ...state,
        isLoading: false,
        products: products,
      };

    case `${DELETE_PRODUCT}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    default:
      return state;
  }
};
