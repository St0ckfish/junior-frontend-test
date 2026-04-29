import { memo } from 'react';
import { Text, View } from 'react-native';

type ErrorViewProps = {
  message: string;
};

function ErrorViewComponent({ message }: ErrorViewProps) {
  return (
    <View className="rounded-lg border border-red-200 bg-red-50 p-4">
      <Text className="text-sm font-bold text-red-700">{message}</Text>
    </View>
  );
}

export const ErrorView = memo(ErrorViewComponent);
