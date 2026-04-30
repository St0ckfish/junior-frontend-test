import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { User } from '../features/users/usersTypes';

type UserDetailsScreenProps = {
  user: User;
  onBack: () => void;
};

export function UserDetailsScreen({ user, onBack }: UserDetailsScreenProps) {
  const isActive = user.status === 'Active';

  return (
    <SafeAreaView className="flex-1 bg-slate-100" edges={['top']}>
      <View className="bg-blue-700 px-5 pb-24 pt-4">
        <View className="flex-row items-center justify-between">
          <Pressable
            className="flex-row items-center rounded-full bg-white/15 px-3 py-2"
            accessibilityRole="button"
            onPress={onBack}
          >
            <Text className="text-2xl leading-6 text-white">‹</Text>
            <Text className="ml-1 text-sm font-extrabold text-white">Back</Text>
          </Pressable>

          <View className={`rounded-full px-3 py-1 ${isActive ? 'bg-emerald-400' : 'bg-white/20'}`}>
            <Text
              className={`text-xs font-extrabold ${isActive ? 'text-emerald-950' : 'text-white'}`}
            >
              {user.status}
            </Text>
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-sm font-extrabold uppercase tracking-widest text-blue-200">
            Profile
          </Text>
          <Text className="mt-2 text-3xl font-black text-white" numberOfLines={2}>
            {user.name}
          </Text>
          <Text className="mt-2 text-base font-semibold text-blue-100" numberOfLines={1}>
            {user.company}
          </Text>
        </View>
      </View>

      <View className="-mt-16 flex-1 px-5 pb-6">
        <View className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-300">
          <View className="flex-row items-end justify-between">
            <Image className="size-28 rounded-3xl bg-slate-200" source={{ uri: user.avatarUrl }} />

            <View className="items-end">
              <Text className="text-xs font-extrabold uppercase text-slate-400">Member ID</Text>
              <Text className="mt-1 text-2xl font-black text-slate-950">#{user.id}</Text>
            </View>
          </View>

          <View className="mt-6 gap-3">
            <View className="rounded-2xl bg-slate-50 p-4">
              <Text className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
                Email
              </Text>
              <Text className="mt-1 text-base font-bold text-slate-950">{user.email}</Text>
            </View>

            <View className="rounded-2xl bg-slate-50 p-4">
              <Text className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
                Phone
              </Text>
              <Text className="mt-1 text-base font-bold text-slate-950">{user.phone}</Text>
            </View>

            <View className="rounded-2xl bg-slate-50 p-4">
              <Text className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
                Website
              </Text>
              <Text className="mt-1 text-base font-bold text-blue-700">{user.website}</Text>
            </View>

            <View className="rounded-2xl bg-slate-50 p-4">
              <Text className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
                Address
              </Text>
              <Text className="mt-1 text-base font-bold leading-6 text-slate-950">
                {user.address}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
