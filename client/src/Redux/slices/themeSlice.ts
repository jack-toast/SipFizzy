import { createSlice } from '@reduxjs/toolkit';

export const initialThemeState = {
  useDark: false,
};
const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.useDark = !state.useDark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
