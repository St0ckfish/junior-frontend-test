import { createSelector } from '@reduxjs/toolkit';

import type { UsersRootState } from './usersTypes';

export const selectUsersState = (state: UsersRootState) => state.users;

export const selectFilteredUsers = createSelector(
  [
    (state: UsersRootState) => state.users.items,
    (state: UsersRootState) => state.users.searchQuery,
  ],
  (users, searchQuery) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return users;
    }

    return users.filter((user) => user.name.toLowerCase().includes(normalizedQuery));
  },
);
