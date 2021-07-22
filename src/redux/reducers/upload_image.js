import { UPLOAD_IMAGE, CLEAR_PRODUCT, SUCCESS, FAIL } from '@redux/action-types';

const initialState = {
  isLoading: true,
  producticonimage: '',
  productdisplayimage: '',
  productmainimage: '',
  categoryimage: '',
  subcategoryimage: '',
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPLOAD_IMAGE:
      return { ...state, isLoading: true };
    case `${UPLOAD_IMAGE}_${SUCCESS}`:
      // console.log("images upload api", payload)
      const prevState = {...state}
      let images = prevState
      images[payload.imageType] = payload.imageUrl
      images['isLoading'] = false
      // console.log(images)
      return images;
    case `${UPLOAD_IMAGE}_${FAIL}`:
      // console.log("routes error payload ", payload)
      return { ...state, isLoading: false, error: payload };
    case `${CLEAR_PRODUCT}`:
      // console.log("clearing images ", payload)
      return {...state, initialState,
        producticonimage: '',
        productdisplayimage: '',
        productmainimage: '',
        categoryimage: '',
        subcategoryimage: '',
        error: null,
        isLoading: false}
    default:
      return state;
  }
};
