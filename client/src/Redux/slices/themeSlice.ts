import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    useDark: true,
  },
  reducers: {
    toggleTheme: (state) => {
      state.useDark = !state.useDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
