/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUserAPI } from '../../APIs/authAPI';
import { CurrentUser } from '../../MyTypes/user';
import { RootState } from '../store';

export const fetchCurrentUser = createAsyncThunk<CurrentUser, undefined, { state: RootState }>(
  'users/getCurrentUser',
  async (_, thunkApi) => {
    const { getState, requestId } = thunkApi;
    const { currentRequestId, loading } = getState().auth;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return null;
    }

    const response = await getCurrentUserAPI();
    return response.user;
  },
);

type AuthSliceState = {
  currentUser: CurrentUser | null;
  loading: 'idle' | 'pending';
  currentRequestId: string;
  error: any;
};
const initialState: AuthSliceState = {
  currentUser: null,
  loading: 'idle',
  currentRequestId: '',
  error: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    addReview: (state, { payload }) => {
      if (state.currentUser) state.currentUser.reviews.push(payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentUser = action.payload;
          state.currentRequestId = '';
        }
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = '';
        }
      });
  },
});

export const { addReview } = authSlice.actions;

export default authSlice.reducer;
