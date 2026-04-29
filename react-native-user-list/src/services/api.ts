import { USERS_API_URL } from '../utils/constants';
import type { ApiUser, User } from '../features/users/usersTypes';

const transformUser = (user: ApiUser): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
});

export const fetchUsers = async () => {
  const response = await fetch(USERS_API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const users = (await response.json()) as ApiUser[];

  return users.map(transformUser);
};
