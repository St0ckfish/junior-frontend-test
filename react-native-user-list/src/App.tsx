import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { ListRenderItem } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { UserCard } from './components/UserCard';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { store } from './redux/store';
import {
  fetchUsersPage,
  hydrateUsersFromCache,
  selectFilteredUsers,
  selectUsersState,
  setSearchQuery,
} from './redux/usersSlice';
import type { User } from './redux/usersSlice';

const USER_ROW_HEIGHT = 116;

function UserListScreen() {
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
  const showInitialLoader = isLoading && users.length === 0;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>User List</Text>
        <Text style={styles.subtitle}>
          {loadedFromCache
            ? 'Showing cached users while the app reconnects.'
            : 'Redux powered user directory.'}
        </Text>

        <TextInput
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={handleSearchChange}
          placeholder="Search users by name"
          placeholderTextColor="#94a3b8"
          value={searchQuery}
        />
      </View>

      {showInitialLoader ? (
        <View style={styles.centeredState}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.mutedText}>Loading users...</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
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
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No users found</Text>
              <Text style={styles.emptyDescription}>
                Try another search term or refresh the list.
              </Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              {searchQuery.trim().length > 0 ? (
                <Text style={styles.mutedCenterText}>Clear search to load additional users.</Text>
              ) : (
                <Pressable
                  style={[styles.loadMoreButton, !hasMore && styles.loadMoreButtonDisabled]}
                  accessibilityRole="button"
                  disabled={!hasMore || isLoading}
                  onPress={handleLoadMore}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.loadMoreText}>
                      {hasMore ? 'Load More' : 'All users loaded'}
                    </Text>
                  )}
                </Pressable>
              )}
            </View>
          }
        />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <UserListScreen />
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    marginTop: 4,
    color: '#020617',
    fontSize: 36,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 8,
    color: '#64748b',
    fontSize: 14,
    lineHeight: 20,
  },
  searchInput: {
    marginTop: 16,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#f8fafc',
    color: '#020617',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  centeredState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  mutedText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#cbd5e1',
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  emptyTitle: {
    color: '#020617',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyDescription: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    gap: 12,
    paddingBottom: 16,
    paddingTop: 4,
  },
  errorBox: {
    borderColor: '#fecaca',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fef2f2',
    padding: 16,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: '700',
  },
  mutedCenterText: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
  },
  loadMoreButton: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loadMoreButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
  loadMoreText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});
