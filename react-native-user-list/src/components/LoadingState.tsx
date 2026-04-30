import { memo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

function LoadingStateComponent() {
  return (
    <View className="flex-1 items-center justify-center gap-3 px-5">
      <View className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-300">
        <ActivityIndicator size="large" color="#1d4ed8" />
      </View>
      <Text className="text-sm font-extrabold text-slate-500">Syncing directory...</Text>
    </View>
  );
}

export const LoadingState = memo(LoadingStateComponent);
