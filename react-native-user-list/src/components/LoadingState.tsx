import { memo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

function LoadingStateComponent() {
  return (
    <View className="flex-1 items-center justify-center gap-3 px-5">
      <ActivityIndicator size="large" color="#2563eb" />
      <Text className="text-sm font-semibold text-slate-500">Loading users...</Text>
    </View>
  );
}

export const LoadingState = memo(LoadingStateComponent);
