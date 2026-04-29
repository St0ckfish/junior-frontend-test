import { memo } from 'react';
import { Text, View } from 'react-native';

import { SearchBar } from './SearchBar';

type UserListHeaderProps = {
  isUsingCachedData: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

function UserListHeaderComponent({
  isUsingCachedData,
  searchQuery,
  onSearchChange,
}: UserListHeaderProps) {
  return (
    <View className="border-b border-slate-200 bg-white px-5 pb-4 pt-3">
      <Text className="text-[13px] font-extrabold uppercase text-slate-500">JSONPlaceholder</Text>
      <Text className="mt-1 text-4xl font-extrabold text-slate-950">User List</Text>
      <Text className="mt-2 text-sm leading-5 text-slate-500">
        {isUsingCachedData
          ? 'Showing cached users while the app reconnects.'
          : 'Redux powered user directory.'}
      </Text>

      <SearchBar value={searchQuery} onChangeText={onSearchChange} />
    </View>
  );
}

export const UserListHeader = memo(UserListHeaderComponent);
