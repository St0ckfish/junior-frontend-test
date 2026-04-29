import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';
const USERS_CACHE_KEY = 'react-native-user-list:users';
const PAGE_SIZE = 5;

type ApiAddress = {
  street: string;
  city: string;
  zipcode: string;
};

type ApiUser = {
  id: number;
  name: string;
  email: string;
  address: ApiAddress;
};

export type User = {
  id: number;
  name: string;
  email: string;
  address: string;
};

export type UsersState = {
  items: User[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  hasMore: boolean;
  loadedFromCache: boolean;
};

type UsersRootState = {
  users: UsersState;
};

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

const transformUser = (user: ApiUser): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
});

const readCachedUsers = async () => {
  const cachedUsers = await AsyncStorage.getItem(USERS_CACHE_KEY);

  return cachedUsers ? (JSON.parse(cachedUsers) as User[]) : [];
};

const cacheUsers = async (users: User[]) => {
  await AsyncStorage.setItem(USERS_CACHE_KEY, JSON.stringify(users));
};

export const hydrateUsersFromCache = createAsyncThunk('users/hydrateFromCache', async () => {
  return readCachedUsers();
});

export const fetchUsersPage = createAsyncThunk<
  { users: User[]; page: number; hasMore: boolean },
  { page?: number; refresh?: boolean },
  { state: UsersRootState; rejectValue: string }
>('users/fetchPage', async ({ page, refresh = false }, { getState, rejectWithValue }) => {
  const currentState = getState().users;
  const nextPage = page ?? (refresh ? 1 : currentState.page + 1);
  const start = (nextPage - 1) * PAGE_SIZE;

  try {
    const response = await fetch(USERS_API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const apiUsers = (await response.json()) as ApiUser[];
    const users = apiUsers.slice(start, start + PAGE_SIZE).map(transformUser);
    const mergedUsers = refresh ? users : [...currentState.items, ...users];

    await cacheUsers(mergedUsers);

    return {
      users,
      page: nextPage,
      hasMore: start + PAGE_SIZE < apiUsers.length,
    };
  } catch (error) {
    console.error('Unable to fetch users from JSONPlaceholder:', error);

    const cachedUsers = await readCachedUsers();

    if (cachedUsers.length > 0) {
      if (refresh || currentState.items.length === 0) {
        return {
          users: cachedUsers,
          page: Math.ceil(cachedUsers.length / PAGE_SIZE),
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
        state.page = Math.ceil(action.payload.length / PAGE_SIZE);
        state.hasMore = action.payload.length % PAGE_SIZE === 0;
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
