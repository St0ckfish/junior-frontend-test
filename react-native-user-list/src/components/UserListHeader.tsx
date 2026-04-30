import { memo } from 'react';
import { Image, Text, View } from 'react-native';

import { SearchBar } from './SearchBar';

type UserListHeaderProps = {
  isUsingCachedData: boolean;
  searchQuery: string;
  totalUsers: number;
  onSearchChange: (query: string) => void;
};

function UserListHeaderComponent({
  isUsingCachedData,
  searchQuery,
  totalUsers,
  onSearchChange,
}: UserListHeaderProps) {
  return (
    <View className="rounded-b-[28px] bg-slate-950 px-5 pb-6 pt-3">
      <View className="flex-row items-center justify-between">
        <View className="size-10 items-center justify-center rounded-2xl bg-white/10">
          <Text className="text-lg font-black text-white">≡</Text>
        </View>

        <View className="items-center">
          <Text className="text-xs font-extrabold uppercase tracking-widest text-blue-300">
            Contacts
          </Text>
          <Text className="mt-1 text-lg font-extrabold text-white">User Directory</Text>
        </View>

        <Image
          className="size-10 rounded-2xl bg-slate-700"
          source={{ uri: 'https://i.pravatar.cc/120?img=47' }}
        />
      </View>

      <View className="mt-5 flex-row items-end justify-between">
        <View>
          <Text className="text-3xl font-black text-white">Team members</Text>
          <Text className="mt-1 text-sm font-semibold text-slate-400">
            {totalUsers} profiles synced
          </Text>
        </View>
        {isUsingCachedData ? (
          <View className="rounded-full bg-amber-400/15 px-3 py-1">
            <Text className="text-xs font-extrabold text-amber-200">Cached</Text>
          </View>
        ) : null}
      </View>

      <SearchBar value={searchQuery} onChangeText={onSearchChange} />
    </View>
  );
}

export const UserListHeader = memo(UserListHeaderComponent);
