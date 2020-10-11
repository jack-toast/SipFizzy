/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDrinksOptId } from '../../APIs/drinksAPI';

export const fetchDrinksOptId = createAsyncThunk(
  'drinks/fetchDrinksOptId',
  async ({ drinkId } = {}, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().drinks;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return [];
    }
    const response = await getDrinksOptId({ drinkId });
    return response.drinks;
  }
);

const drinksSlice = createSlice({
  name: 'drinks',
  initialState: {
    drinks: {},
    loading: 'idle',
    drinkOrder: [],
    currentRequestId: undefined,
    error: null,
  },
  reducers: {
    addDrink: {
      reducer: (state, { payload }) => {
        state.drinks[payload.id] = payload;
      },
    },
  },

  extraReducers: {
    [fetchDrinksOptId.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchDrinksOptId.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        const currentOrder = [...state.drinkOrder];
        action.payload.forEach((drink) => {
          state.drinks[drink.id] = drink;
          if (!currentOrder.includes(drink.id)) {
            state.drinkOrder.push(drink.id);
          }
        });
        state.currentRequestId = undefined;
      }
    },
    [fetchDrinksOptId.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const { addDrink } = drinksSlice.actions;

export default drinksSlice.reducer;
