import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import auth from './slices/auth';
import drinks from './slices/drinks';
import reviewDialog from './slices/reviewDialog';
import reviews from './slices/reviews';
import theme from './slices/theme';

// configure middleware
const logger = createLogger({
  duration: true,
  collapsed: true,
});

const reducer = combineReducers({
  auth,
  drinks,
  reviewDialog,
  reviews,
  theme,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
