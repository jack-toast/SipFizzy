import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';

import auth from './slices/auth';
import drinks from './slices/drinks';
import reviewDialog from './slices/reviewDialogSlice';
import reviews from './slices/reviews';
import theme from './slices/themeSlice';

// configure middleware
const logger = createLogger({
  duration: true,
  collapsed: true,
});

const rootReducer = combineReducers({
  auth,
  drinks,
  reviewDialog,
  reviews,
  theme,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === 'development') getDefaultMiddleware().concat(logger);
    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
