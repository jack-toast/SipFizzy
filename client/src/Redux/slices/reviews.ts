/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { getReviews } from '../../APIs/reviewsAPI';
import { Drink } from '../../MyTypes/drink';
import { Review } from '../../MyTypes/review';
import { AppDispatch, RootState } from '../store';

export const fetchReviews = createAsyncThunk<
  Review[],
  {
    drinkId: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('reviews/getReviews', async (apiArgs, thunkApi) => {
  const { drinkId } = apiArgs;
  const { getState, requestId } = thunkApi;
  const {
    reviews: { activeDrinkMap },
  } = getState();
  if (get(activeDrinkMap, drinkId) !== requestId) {
    return [];
  }
  const response = await getReviews({ drinkId });
  return response.reviews as Review[];
});

type ReviewsSliceState = {
  reviews: {
    [key: string]: Review;
  };
  loading: 'idle' | 'pending';
  activeDrinkMap: {
    [key: string]: string;
  };
  error: any;
};

const initialState: ReviewsSliceState = {
  reviews: {},
  loading: 'idle',
  activeDrinkMap: {},
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review, string>) => {
      const { payload } = action;
      state.reviews[payload.id] = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state, action) => {
        state.activeDrinkMap[action.meta.arg.drinkId] = action.meta.requestId;
        state.loading = 'pending';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        action.payload.forEach((review) => {
          state.reviews[review.id] = review;
        });
        const newActiveDrinkMap = { ...state.activeDrinkMap };
        delete newActiveDrinkMap[action.meta.arg.drinkId];
        state.activeDrinkMap = newActiveDrinkMap;
        state.loading = Object.keys(newActiveDrinkMap).length ? 'pending' : 'idle';
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.error = action.error;
        const newActiveDrinkMap = { ...state.activeDrinkMap };
        delete newActiveDrinkMap[action.meta.arg.drinkId];
        state.activeDrinkMap = newActiveDrinkMap;
        state.loading = Object.keys(newActiveDrinkMap).length ? 'pending' : 'idle';
      });
  },
});

export const { addReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;
