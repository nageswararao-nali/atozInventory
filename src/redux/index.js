import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import logger from 'redux-logger';

import rootReducer from '@reducers';
import { API_BASE_URL } from '@api';

const client = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log(API_BASE_URL)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middlewares = [thunk, axiosMiddleware(client)];

if (process.env.NODE_EN === __DEV__) {
  middlewares = [...middlewares, logger];
}

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);
