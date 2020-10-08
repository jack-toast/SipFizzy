/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getReviews } from '../../APIs/reviewsAPI';

export const fetchReviews = createAsyncThunk(
  'reviews/getReviews',
  async (argsObj, { getState, requestId }) => {
    // See reviewsAPI.js for argsObj info
    const { currentRequestId, loading } = getState().reviews;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return [];
    }
    const response = await getReviews(argsObj);
    return response.reviews;
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: {},
    loading: 'idle',
    currentRequestId: undefined,
    // activeReviewId: null,
    // modalOpen: false,
    error: null,
  },
  reducers: {
    addReview: {
      reducer: (state, { payload }) => {
        state.reviews[payload.id] = payload;
      },
    },
    // setActiveReview: {
    //   reducer: (state, { payload }) => {
    //     state.activeReviewId = payload;
    //     state.modalOpen = true;
    //   },
    // },
  },

  extraReducers: {
    [fetchReviews.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchReviews.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        action.payload.forEach((review) => {
          state.reviews[review.id] = review;
        });
        state.currentRequestId = undefined;
      }
    },
    [fetchReviews.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const { addReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;
