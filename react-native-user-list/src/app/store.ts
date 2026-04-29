import { configureStore } from '@reduxjs/toolkit';

import { usersReducer } from '../features/users/usersSlice';
import type { UsersState } from '../features/users/usersTypes';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = {
  users: UsersState;
};
export type AppDispatch = typeof store.dispatch;
