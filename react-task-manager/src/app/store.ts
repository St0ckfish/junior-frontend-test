import { configureStore } from '@reduxjs/toolkit';

import { tasksReducer } from '../features/tasks/tasksSlice';
import { saveTasks } from '../features/tasks/tasksStorage';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

store.subscribe(() => {
  saveTasks(store.getState().tasks.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
