import { USERS_API_URL } from '../utils/constants';
import type { ApiUser, User } from '../features/users/usersTypes';

const transformUser = (user: ApiUser): User => ({
  address: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
  avatarUrl: `https://i.pravatar.cc/160?img=${user.id + 10}`,
  company: user.company.name,
  id: user.id,
  email: user.email,
  name: user.name,
  phone: user.phone,
  status: user.id % 2 === 0 ? 'Active' : 'Offline',
  website: user.website,
});

export const fetchUsers = async () => {
  const response = await fetch(USERS_API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const users = (await response.json()) as ApiUser[];

  return users.map(transformUser);
};
