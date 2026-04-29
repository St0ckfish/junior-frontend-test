import { memo } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { ErrorView } from './ErrorView';

type UserListFooterProps = {
  error: string | null;
  hasMore: boolean;
  isLoading: boolean;
  isSearchActive: boolean;
  onLoadMore: () => void;
};

function UserListFooterComponent({
  error,
  hasMore,
  isLoading,
  isSearchActive,
  onLoadMore,
}: UserListFooterProps) {
  return (
    <View className="gap-3 pb-4 pt-1">
      {error ? <ErrorView message={error} /> : null}

      {isSearchActive ? (
        <Text className="text-center text-sm text-slate-500">
          Clear search to load additional users.
        </Text>
      ) : (
        <Pressable
          className={`items-center rounded-lg px-4 py-3 ${
            hasMore ? 'bg-blue-600' : 'bg-slate-300'
          }`}
          accessibilityRole="button"
          disabled={!hasMore || isLoading}
          onPress={onLoadMore}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-base font-extrabold text-white">
              {hasMore ? 'Load More' : 'All users loaded'}
            </Text>
          )}
        </Pressable>
      )}
    </View>
  );
}

export const UserListFooter = memo(UserListFooterComponent);
