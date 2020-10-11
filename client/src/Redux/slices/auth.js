/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUserAPI } from '../../APIs/authAPI';

export const fetchCurrentUser = createAsyncThunk(
  'users/getCurrentUser',
  async (_, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().auth;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return null;
    }

    const response = await getCurrentUserAPI();
    return response.user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    loading: 'idle',
    authToken: undefined,
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    addReview: {
      reducer: (state, { payload }) => {
        state.currentUser.reviews.push(payload.id);
      },
    },
  },
  extraReducers: {
    [fetchCurrentUser.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.currentUser = action.payload;
        state.currentRequestId = undefined;
      }
    },
    [fetchCurrentUser.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const { addReview } = authSlice.actions;

export default authSlice.reducer;
