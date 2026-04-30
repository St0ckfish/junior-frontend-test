import { memo } from 'react';
import { Text, View } from 'react-native';

function UserListEmptyComponent() {
  return (
    <View className="items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 shadow-sm shadow-slate-300">
      <Text className="text-4xl">⌕</Text>
      <Text className="mt-3 text-base font-extrabold text-slate-950">No users found</Text>
      <Text className="mt-1 text-center text-sm leading-5 text-slate-500">
        Try another search term or refresh the list.
      </Text>
    </View>
  );
}

export const UserListEmpty = memo(UserListEmptyComponent);
