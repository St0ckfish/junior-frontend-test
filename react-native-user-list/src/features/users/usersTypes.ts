export type ApiAddress = {
  street: string;
  city: string;
  zipcode: string;
};

export type ApiUser = {
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

export type UsersRootState = {
  users: UsersState;
};

export type FetchUsersPageArgs = {
  page?: number;
  refresh?: boolean;
};

export type FetchUsersPageResult = {
  users: User[];
  page: number;
  hasMore: boolean;
};
