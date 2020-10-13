import { createReviewAPI } from '../../APIs/reviewsAPI';
import { addReview } from './reviews';
import { addReview as userAddReview } from './auth';
import { fetchDrinksOptId } from './drinks';

/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createReview = createAsyncThunk(
  'reviewDialog/createReview',
  async ({ ...vals }, { getState, dispatch }) => {
    const { drinkId } = getState().reviewDialog;
    const {
      currentUser: { username },
    } = getState().auth;

    const resp = await createReviewAPI({
      ...vals,
      username,
      drinkId,
    });
    // add the new review!
    // should actually fetch that drink's data so that...
    // ... the avg score, qualities, numReviews, etc. get updated
    dispatch(fetchDrinksOptId({ drinkId: resp.review.drinkId }));
    dispatch(addReview(resp.review));
    dispatch(userAddReview(resp.review));
    return resp.review;
  },
);

const reviewDialogSlice = createSlice({
  name: 'reviewDialog',
  initialState: {
    currentRequestId: undefined,
    dialogOpen: false,
    drinkId: null,
    error: null,
    loading: 'idle',
    reviewId: null,
  },
  reducers: {
    openReviewDialog: {
      reducer: (state, { payload }) => {
        state.drinkId = payload;
        state.dialogOpen = true;
      },
    },
    closeReviewDialog: {
      reducer: (state) => {
        state.dialogOpen = false;
        state.reviewId = null;
      },
    },
    openReviewEditorDialog: {
      reducer: (state, { payload }) => {
        const { drinkId, reviewId } = payload;
        state.drinkId = drinkId;
        state.reviewId = reviewId;
        state.dialogOpen = true;
      },
    },
  },
  extraReducers: {
    [createReview.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [createReview.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.currentRequestId = undefined;
      }
    },
    [createReview.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const {
  openReviewDialog,
  closeReviewDialog,
  openReviewEditorDialog,
} = reviewDialogSlice.actions;

export default reviewDialogSlice.reducer;
