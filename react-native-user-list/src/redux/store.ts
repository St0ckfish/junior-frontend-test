import { configureStore } from '@reduxjs/toolkit';

import { usersReducer } from './usersSlice';
import type { UsersState } from './usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = {
  users: UsersState;
};
export type AppDispatch = typeof store.dispatch;
