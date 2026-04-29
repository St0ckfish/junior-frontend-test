import type { ThemeMode } from './preferencesTypes';

const THEME_STORAGE_KEY = 'react-task-manager:theme';

const isBrowser = typeof window !== 'undefined';

export const loadTheme = (): ThemeMode => {
  if (!isBrowser) {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light';
};

export const saveTheme = (theme: ThemeMode) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
};
