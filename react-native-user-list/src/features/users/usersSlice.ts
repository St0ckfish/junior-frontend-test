import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { fetchUsers } from '../../services/api';
import { USERS_CACHE_KEY, USERS_PAGE_SIZE } from '../../utils/constants';
import type {
  FetchUsersPageArgs,
  FetchUsersPageResult,
  User,
  UsersRootState,
  UsersState,
} from './usersTypes';

const initialState: UsersState = {
  items: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
  searchQuery: '',
  page: 0,
  hasMore: true,
  loadedFromCache: false,
};

const readCachedUsers = async () => {
  const cachedUsers = await AsyncStorage.getItem(USERS_CACHE_KEY);

  const users = cachedUsers ? (JSON.parse(cachedUsers) as User[]) : [];

  return users.map((user) => ({
    ...user,
    avatarUrl: user.avatarUrl ?? `https://i.pravatar.cc/160?img=${user.id + 10}`,
    company: user.company ?? 'Unknown company',
    phone: user.phone ?? 'Unavailable',
    status: user.status ?? (user.id % 2 === 0 ? 'Active' : 'Offline'),
    website: user.website ?? 'Unavailable',
  }));
};

const cacheUsers = async (users: User[]) => {
  await AsyncStorage.setItem(USERS_CACHE_KEY, JSON.stringify(users));
};

export const hydrateUsersFromCache = createAsyncThunk('users/hydrateFromCache', async () => {
  return readCachedUsers();
});

export const fetchUsersPage = createAsyncThunk<
  FetchUsersPageResult,
  FetchUsersPageArgs,
  { state: UsersRootState; rejectValue: string }
>('users/fetchPage', async ({ page, refresh = false }, { getState, rejectWithValue }) => {
  const currentState = getState().users;
  const nextPage = page ?? (refresh ? 1 : currentState.page + 1);
  const start = (nextPage - 1) * USERS_PAGE_SIZE;

  try {
    const allUsers = await fetchUsers();
    const users = allUsers.slice(start, start + USERS_PAGE_SIZE);
    const mergedUsers = refresh ? users : [...currentState.items, ...users];

    await cacheUsers(mergedUsers);

    return {
      users,
      page: nextPage,
      hasMore: start + USERS_PAGE_SIZE < allUsers.length,
    };
  } catch (error) {
    console.error('Unable to fetch users from JSONPlaceholder:', error);

    const cachedUsers = await readCachedUsers();

    if (cachedUsers.length > 0) {
      if (refresh || currentState.items.length === 0) {
        return {
          users: cachedUsers,
          page: Math.ceil(cachedUsers.length / USERS_PAGE_SIZE),
          hasMore: false,
        };
      }

      return {
        users: [],
        page: currentState.page,
        hasMore: false,
      };
    }

    return rejectWithValue('Unable to load users. Check your connection and try again.');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateUsersFromCache.fulfilled, (state, action) => {
        if (action.payload.length === 0 || state.items.length > 0) {
          return;
        }

        state.items = action.payload;
        state.page = Math.ceil(action.payload.length / USERS_PAGE_SIZE);
        state.hasMore = action.payload.length % USERS_PAGE_SIZE === 0;
        state.loadedFromCache = true;
      })
      .addCase(fetchUsersPage.pending, (state, action) => {
        state.error = null;

        if (action.meta.arg.refresh) {
          state.isRefreshing = true;
        } else {
          state.isLoading = true;
        }
      })
      .addCase(fetchUsersPage.fulfilled, (state, action) => {
        const { users, page, hasMore } = action.payload;

        state.isLoading = false;
        state.isRefreshing = false;
        state.page = page;
        state.hasMore = hasMore;
        state.loadedFromCache = false;

        if (action.meta.arg.refresh) {
          state.items = users;
          return;
        }

        const existingIds = new Set(state.items.map((user) => user.id));
        state.items.push(...users.filter((user) => !existingIds.has(user.id)));
      })
      .addCase(fetchUsersPage.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.payload ?? 'Unable to load users.';
      });
  },
});

export const { setSearchQuery } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
