import { memo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import type { User } from '../features/users/usersTypes';

type UserCardProps = {
  onPress: (user: User) => void;
  user: User;
};

function UserCardComponent({ onPress, user }: UserCardProps) {
  const isActive = user.status === 'Active';

  return (
    <Pressable
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-300"
      onPress={() => onPress(user)}
    >
      <View className="flex-row">
        <View className={`w-1.5 ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />

        <View className="flex-1 flex-row items-center gap-3 p-4">
          <View className="relative">
            <Image className="size-14 rounded-2xl bg-slate-200" source={{ uri: user.avatarUrl }} />
            <View
              className={`absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-white ${
                isActive ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
          </View>

          <View className="min-w-0 flex-1">
            <View className="flex-row items-center justify-between gap-2">
              <Text className="flex-1 text-lg font-extrabold text-slate-950" numberOfLines={1}>
                {user.name}
              </Text>
              <View
                className={`rounded-full px-2.5 py-1 ${isActive ? 'bg-emerald-50' : 'bg-slate-100'}`}
              >
                <Text
                  className={`text-[11px] font-extrabold ${
                    isActive ? 'text-emerald-700' : 'text-slate-600'
                  }`}
                >
                  {user.status}
                </Text>
              </View>
            </View>
            <Text className="mt-1 text-sm font-semibold text-blue-700" numberOfLines={1}>
              {user.email}
            </Text>
            <Text
              className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400"
              numberOfLines={1}
            >
              {user.company}
            </Text>
            <Text className="mt-1 text-sm text-slate-500" numberOfLines={1}>
              {user.address}
            </Text>
          </View>

          <View className="size-9 items-center justify-center rounded-full bg-slate-100">
            <Text className="text-2xl font-light text-slate-500">›</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export const UserCard = memo(UserCardComponent);
