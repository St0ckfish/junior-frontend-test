import { createSlice } from '@reduxjs/toolkit';

import { loadTheme } from './preferencesStorage';
import type { PreferencesState } from './preferencesTypes';

const initialState: PreferencesState = {
  theme: loadTheme(),
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { toggleTheme } = preferencesSlice.actions;
export const preferencesReducer = preferencesSlice.reducer;
