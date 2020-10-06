/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDrinks } from '../../APIs/drinksAPI';

export const fetchDrinks = createAsyncThunk(
  'drinks/getDrinks',
  async (_, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().drinks;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return [];
    }

    const response = await getDrinks();
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
    activeDrinkId: null,
    modalOpen: false,
    error: null,
  },
  reducers: {
    addDrink: {
      reducer: (state, { payload }) => {
        state.drinks[payload.id] = payload;
      },
    },
    setActiveDrink: {
      reducer: (state, { payload }) => {
        state.activeDrinkId = payload;
        state.modalOpen = true;
      },
    },
  },

  extraReducers: {
    [fetchDrinks.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchDrinks.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        const newDrinkIds = [];
        action.payload.forEach((drink) => {
          state.drinks[drink.id] = drink;
          newDrinkIds.push(drink.id);
        });
        state.drinkOrder = newDrinkIds;
        state.currentRequestId = undefined;
      }
    },
    [fetchDrinks.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    },
  },
});

export const { addDrink, setActiveDrink } = drinksSlice.actions;

export default drinksSlice.reducer;
