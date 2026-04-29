import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import '../global.css';
import { store } from './app/store';
import { HomeScreen } from './screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <HomeScreen />
        <StatusBar style="auto" />
      </Provider>
    </SafeAreaProvider>
  );
}
