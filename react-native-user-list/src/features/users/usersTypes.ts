export type ApiAddress = {
  street: string;
  city: string;
  zipcode: string;
};

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: ApiAddress;
  company: {
    name: string;
  };
};

export type UserStatus = 'Active' | 'Offline';

export type User = {
  address: string;
  avatarUrl: string;
  company: string;
  id: number;
  email: string;
  name: string;
  phone: string;
  status: UserStatus;
  website: string;
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
