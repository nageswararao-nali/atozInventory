import { GET_ORDERS, PROCESS_ORDER, GET_ORDER, CLOSE_ORDER, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: false,
  orderInfo: {},
  orders: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ORDER:
      return { ...state, isLoading: true };
    case `${GET_ORDER}_${SUCCESS}`:
      console.log("order deatils payload", payload)
      return {
        ...state,
        isLoading: false,
        routes: payload.data
      };
    case `${GET_ORDER}_${FAIL}`:
      console.log("order error payload ", payload)
      return { ...state, isLoading: false, error: payload };
    
    case CLOSE_ORDER:
      return { ...state, isLoading: true };
    case `${CLOSE_ORDER}_${SUCCESS}`:
      console.log("close order payload", payload)
      return {
        ...state,
        isLoading: false
      };
    case `${CLOSE_ORDER}_${FAIL}`:
      console.log("order error payload ", payload)
      return { ...state, isLoading: false, error: payload };

    case PROCESS_ORDER:
      return { ...state, isLoading: true };
    case `${PROCESS_ORDER}_${SUCCESS}`:
      console.log("close order payload", payload)
      return {
        ...state,
        isLoading: false
      };
    case `${PROCESS_ORDER}_${FAIL}`:
      console.log("order error payload ", payload)
      return { ...state, isLoading: false, error: payload };


    case GET_ORDERS:
      return { ...state, isLoading: true };
    case `${GET_ORDERS}_${SUCCESS}`:
      console.log("order list ..............", payload)
      if(payload.results) {
        console.log("in order list iffffffffff")
        console.log(payload.results)
        return {
          ...state,
          isLoading: false,
          orders: payload.results
        };  
      } else {
        return {
          ...state,
          isLoading: false,
          orders: []
        };
      }
      
    case `${GET_ORDERS}_${FAIL}`:
      console.log("order error payload ", payload)
      return { ...state, isLoading: false, error: payload };

    default:
      return state;
  }
};
