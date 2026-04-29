import { useCallback, useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LoadingState } from '../components/LoadingState';
import { UserCard } from '../components/UserCard';
import { UserListEmpty } from '../components/UserListEmpty';
import { UserListFooter } from '../components/UserListFooter';
import { UserListHeader } from '../components/UserListHeader';
import { selectFilteredUsers, selectUsersState } from '../features/users/usersSelectors';
import {
  fetchUsersPage,
  hydrateUsersFromCache,
  setSearchQuery,
} from '../features/users/usersSlice';
import type { User } from '../features/users/usersTypes';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { USER_ROW_HEIGHT } from '../utils/constants';

export function HomeScreen() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectFilteredUsers);
  const { error, hasMore, isLoading, isRefreshing, loadedFromCache, searchQuery } =
    useAppSelector(selectUsersState);

  useEffect(() => {
    dispatch(hydrateUsersFromCache());
    dispatch(fetchUsersPage({ page: 1, refresh: true }));
  }, [dispatch]);

  const handleSearchChange = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch],
  );

  const handleRefresh = useCallback(() => {
    dispatch(fetchUsersPage({ page: 1, refresh: true }));
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore && searchQuery.trim().length === 0) {
      dispatch(fetchUsersPage({}));
    }
  }, [dispatch, hasMore, isLoading, searchQuery]);

  const renderUser: ListRenderItem<User> = useCallback(
    ({ item }) => <UserCard name={item.name} email={item.email} address={item.address} />,
    [],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<User> | null | undefined, index: number) => ({
      length: USER_ROW_HEIGHT,
      offset: USER_ROW_HEIGHT * index,
      index,
    }),
    [],
  );

  const keyExtractor = useCallback((item: User) => item.id.toString(), []);
  const isSearchActive = searchQuery.trim().length > 0;
  const showInitialLoader = isLoading && users.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-slate-100" edges={['top']}>
      <UserListHeader
        isUsingCachedData={loadedFromCache}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {showInitialLoader ? (
        <LoadingState />
      ) : (
        <View className="flex-1">
          <FlatList
            className="flex-1"
            contentContainerClassName="gap-3 px-5 py-4"
            data={users}
            getItemLayout={getItemLayout}
            initialNumToRender={5}
            keyExtractor={keyExtractor}
            keyboardShouldPersistTaps="handled"
            maxToRenderPerBatch={6}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor="#2563eb"
              />
            }
            removeClippedSubviews
            renderItem={renderUser}
            updateCellsBatchingPeriod={50}
            windowSize={7}
            ListEmptyComponent={<UserListEmpty />}
            ListFooterComponent={
              <UserListFooter
                error={error}
                hasMore={hasMore}
                isLoading={isLoading}
                isSearchActive={isSearchActive}
                onLoadMore={handleLoadMore}
              />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}
