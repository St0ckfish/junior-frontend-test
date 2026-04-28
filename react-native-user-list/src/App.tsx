import '../global.css';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Text, View } from 'react-native';
import { useAppSelector } from './redux/hooks';
import { store } from './redux/store';

function UserListScreen() {
  const users = useAppSelector((state) => state.users.items);

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1 justify-center gap-4 px-6">
        <Text className="text-sm font-semibold text-slate-500">{users.length} users</Text>
      </View>
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
