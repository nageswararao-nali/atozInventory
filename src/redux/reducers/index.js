import { combineReducers } from 'redux';

import homeReducer from '@reducers/home';
import routesReducer from '@reducers/routes';
import routeDetailsReducer from '@reducers/route_details';
import orderReducer from '@reducers/order';
import routeReducer from '@reducers/route';
import categoriesReducer from '@reducers/categories';
import subCategoriesReducer from '@reducers/subcategories';
import itemsReducer from '@reducers/items';
import productsReducer from '@reducers/products';
import uploadImageReducer from '@reducers/upload_image';
import usersReducer from '@reducers/users';
// import productReducer from '@reducers/product';

export default combineReducers({
  homeReducer,
  routesReducer,
  categoriesReducer,
  productsReducer,
  routeDetailsReducer,
  routeReducer,
  orderReducer,
  subCategoriesReducer,
  itemsReducer,
  uploadImageReducer,
  usersReducer
  // productReducer
});
