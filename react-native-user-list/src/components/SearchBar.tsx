import { memo } from 'react';
import { Text, TextInput, View } from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (query: string) => void;
};

function SearchBarComponent({ value, onChangeText }: SearchBarProps) {
  return (
    <View className="mt-5 flex-row items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-sm shadow-slate-900">
      <Text className="text-xl text-blue-600">⌕</Text>
      <TextInput
        className="flex-1 text-base font-semibold text-slate-950"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        onChangeText={onChangeText}
        placeholder="Search contacts"
        placeholderTextColor="#64748b"
        value={value}
      />
    </View>
  );
}

export const SearchBar = memo(SearchBarComponent);
