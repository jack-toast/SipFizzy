/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { getDrinksOptId } from '../../APIs/drinksAPI';
import { Drink } from '../../MyTypes/drink';
import { RootState } from '../store';

export const fetchDrinksOptId = createAsyncThunk<
  Drink[],
  {
    drinkId?: string;
  },
  {
    state: RootState;
  }
>('drinks/fetchDrinksOptId', async (apiArgs = {}, thunkApi) => {
  const { getState, requestId } = thunkApi;
  const {
    drinks: { currentRequestId, loading },
  } = getState();
  if (loading !== 'pending' || requestId !== currentRequestId) {
    return [];
  }
  const drinkId = get(apiArgs, 'drinkId');
  const response = await getDrinksOptId({ drinkId });
  return response.drinks as Drink[];
});

type DrinksSliceState = {
  drinks: {
    [key: string]: Drink;
  };
  loading: 'idle' | 'pending';
  drinkOrder: string[];
  currentRequestId: string | undefined;
  error: any; // JY TODO - This is gross
};
const initialState: DrinksSliceState = {
  drinks: {},
  loading: 'idle',
  drinkOrder: [],
  currentRequestId: undefined,
  error: null,
};
const drinksSlice = createSlice({
  name: 'drinks',
  initialState: initialState,
  reducers: {
    addDrink: (state, { payload }) => {
      state.drinks[payload.id] = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinksOptId.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchDrinksOptId.fulfilled, (state, action) => {
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
      })
      .addCase(fetchDrinksOptId.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { addDrink } = drinksSlice.actions;

export default drinksSlice.reducer;
