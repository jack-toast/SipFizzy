import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import drinks from './slices/drinks';
import auth from './slices/auth';

const reducer = combineReducers({
  drinks,
  auth,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
