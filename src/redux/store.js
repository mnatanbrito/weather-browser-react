import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { isDevelopment } from '../env';

import rootReducer from './reducer';

const middlewares = [...getDefaultMiddleware()];

if (isDevelopment()) {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});

if (isDevelopment() && module.hot) {
  module.hot.accept('./reducer', () => {
    const newRootReducer = require('./reducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
