import { createReviewAPI, updateReviewAPI } from '../../APIs/reviewsAPI';
import { addReview } from './reviews';
import { fetchDrinksOptId } from './drinks';
import { createSlice, createAsyncThunk, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import { NewReview, Review, ReviewUpdate } from '../../MyTypes/review';
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
  dispatch(fetchDrinksOptId({ drinkId: resp.review.drinkId }));
  dispatch(addReview(resp.review));
  return resp.review as Review;
});

export const updateReview = createAsyncThunk<
  Review,
  ReviewUpdate,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('reviewDialog/updateReview', async (reviewUpdate, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const {
    reviewDialog: { reviewId },
  } = getState();
  if (!reviewId) throw new Error('Need reviewId to update a review');
  const resp = await updateReviewAPI(reviewUpdate, reviewId);
  dispatch(fetchDrinksOptId({ drinkId: resp.review.drinkId }));
  dispatch(addReview(resp.review));
  return resp.review as Review;
});

const isFromSlice = (action: AnyAction): boolean => {
  if (action.type.includes('reviewDialog/')) console.log('action.type', action.type);
  return action.type.includes('reviewDialog/');
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

const isPendingAction = (action: AnyAction): action is PendingAction =>
  isFromSlice(action) && action.type.endsWith('/pending');

const isFulfilledAction = (action: AnyAction): action is FulfilledAction =>
  isFromSlice(action) && action.type.endsWith('/fulfilled');

const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  isFromSlice(action) && action.type.endsWith('/rejected');

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
      .addMatcher(isPendingAction, (state, action) => {
        console.log('pending action', action);
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addMatcher(isFulfilledAction, (state, action) => {
        console.log('fulfilled action', action);
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = '';
        }
      })
      .addMatcher(isRejectedAction, (state, action) => {
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
