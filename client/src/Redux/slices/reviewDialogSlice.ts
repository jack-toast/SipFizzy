import { createReviewAPI } from '../../APIs/reviewsAPI';
import { addReview } from './reviews';
import { addReview as userAddReview } from './auth';
import { fetchDrinksOptId } from './drinks';

/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NewReview, Review } from '../../MyTypes/review';
import { AppDispatch, RootState } from '../store';
import { has } from 'lodash';

export const createReview = createAsyncThunk<
  Review,
  NewReview,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('reviewDialog/createReview', async (newReview, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const {
    reviewDialog: { drinkId },
  } = getState();
  const { currentUser } = getState().auth;
  if (!currentUser || !has(currentUser, 'username')) throw new Error('Must be signed in');

  const resp = await createReviewAPI({
    ...newReview,
    username: currentUser.username,
    drinkId,
  });
  // add the new review!
  // should actually fetch that drink's data so that...
  // ... the avg score, qualities, numReviews, etc. get updated
  dispatch(fetchDrinksOptId({ drinkId: resp.review.drinkId }));
  dispatch(addReview(resp.review));
  dispatch(userAddReview(resp.review));
  return resp.review as Review;
});

type ReviewDialogSliceState = {
  currentRequestId: string;
  dialogOpen: boolean;
  drinkId: string;
  error: any;
  loading: 'idle' | 'pending';
  reviewId: string;
};
const initialState: ReviewDialogSliceState = {
  currentRequestId: '',
  dialogOpen: false,
  drinkId: '',
  error: null,
  loading: 'idle',
  reviewId: '',
};

const reviewDialogSlice = createSlice({
  name: 'reviewDialog',
  initialState: initialState,
  reducers: {
    openReviewDialog: (state, { payload }) => {
      state.drinkId = payload;
      state.dialogOpen = true;
    },
    closeReviewDialog: (state) => {
      state.dialogOpen = false;
      state.reviewId = '';
    },
    openReviewEditorDialog: (state, { payload }) => {
      const { drinkId, reviewId } = payload;
      state.drinkId = drinkId;
      state.reviewId = reviewId;
      state.dialogOpen = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(createReview.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = '';
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = '';
        }
      });
  },
});

export const {
  openReviewDialog,
  closeReviewDialog,
  openReviewEditorDialog,
} = reviewDialogSlice.actions;

export default reviewDialogSlice.reducer;
