/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { getReviews } from '../../APIs/reviewsAPI';

export const fetchReviews = createAsyncThunk(
  'reviews/getReviews',
  async ({ drinkId }, { getState, requestId }) => {
    const { activeDrinkMap } = getState().reviews;
    if (get(activeDrinkMap, drinkId) !== requestId) {
      return [];
    }
    const response = await getReviews({ drinkId });
    return response.reviews;
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: {},
    loading: 'idle',
    activeDrinkMap: {},
    error: null,
  },
  reducers: {
    addReview: {
      reducer: (state, { payload }) => {
        state.reviews[payload.id] = payload;
      },
    },
  },

  extraReducers: {
    [fetchReviews.pending]: (state, action) => {
      state.activeDrinkMap[action.meta.arg.drinkId] = action.meta.requestId;
      state.loading = 'pending';
    },
    [fetchReviews.fulfilled]: (state, action) => {
      action.payload.forEach((review) => {
        state.reviews[review.id] = review;
      });
      const newActiveDrinkMap = { ...state.activeDrinkMap };
      delete newActiveDrinkMap[action.meta.arg.drinkId];
      state.activeDrinkMap = newActiveDrinkMap;
      state.loading = Object.keys(newActiveDrinkMap).length
        ? 'pending'
        : 'idle';
    },
    [fetchReviews.rejected]: (state, action) => {
      state.error = action.error;
      const newActiveDrinkMap = { ...state.activeDrinkMap };
      delete newActiveDrinkMap[action.meta.arg.drinkId];
      state.activeDrinkMap = newActiveDrinkMap;
      state.loading = Object.keys(newActiveDrinkMap).length
        ? 'pending'
        : 'idle';
    },
  },
});

export const { addReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;
