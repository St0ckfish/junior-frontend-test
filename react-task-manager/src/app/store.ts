import { configureStore } from '@reduxjs/toolkit';

import { preferencesReducer } from '../features/preferences/preferencesSlice';
import { saveTheme } from '../features/preferences/preferencesStorage';
import { tasksReducer } from '../features/tasks/tasksSlice';
import { saveTasks } from '../features/tasks/tasksStorage';

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    tasks: tasksReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  saveTasks(state.tasks.items);
  saveTheme(state.preferences.theme);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
