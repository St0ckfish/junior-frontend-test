import type { RootState } from '../../app/store';

export const selectTheme = (state: RootState) => state.preferences.theme;
export const selectIsDarkMode = (state: RootState) => state.preferences.theme === 'dark';
