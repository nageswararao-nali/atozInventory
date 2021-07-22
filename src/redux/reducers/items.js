import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: true,
  items: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ITEMS:
      return { ...state, isLoading: true };
    case `${GET_ITEMS}_${SUCCESS}`:
    // console.log("items payload")
    // console.log(payload)
      return {
        ...state,
        isLoading: false,
        items: payload.results,
      };
    case `${GET_ITEMS}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case ADD_ITEM:
      return { ...state, isLoading: true };
    case `${ADD_ITEM}_${SUCCESS}`:
    // console.log("items payload after add item")
    // console.log(payload)
      const prevState = {...state}
      // console.log(prevState)
      if(payload.id) {
        prevState['items'].unshift(payload) 
        prevState['error'] = null
      } else {
        prevState['error'] = 'problem in adding item'
      }
      prevState['isLoading'] = false
      return prevState;

    case `${ADD_ITEM}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case UPDATE_ITEM:
      return { ...state, isLoading: true };

    case `${UPDATE_ITEM}_${SUCCESS}`:
    // console.log("items payload after add item")
    // console.log(payload)
      let itemsData = state.items.filter((item) => {
        if(item.id == payload.id) {
          Object.assign(item, payload)
        }
        return item
      })
      return {
        ...state,
        isLoading: false,
        items: itemsData,
      };

    case `${UPDATE_ITEM}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };

    case DELETE_ITEM:
      return { ...state, isLoading: true };

    case `${DELETE_ITEM}_${SUCCESS}`:
    console.log("delete items payload after add item")
    console.log(payload)
      let items = state.items.filter((item) => {
        if(item.id != payload) {
          return item
        }
      })
      return {
        ...state,
        isLoading: false,
        items: items,
      };

    case `${DELETE_ITEM}_${FAIL}`:
      return { ...state, isLoading: false, error: payload };


    default:
      return state;
  }
};
