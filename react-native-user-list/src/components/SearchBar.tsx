import { memo } from 'react';
import { TextInput } from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (query: string) => void;
};

function SearchBarComponent({ value, onChangeText }: SearchBarProps) {
  return (
    <TextInput
      className="mt-4 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-950"
      autoCapitalize="none"
      autoCorrect={false}
      clearButtonMode="while-editing"
      onChangeText={onChangeText}
      placeholder="Search users by name"
      placeholderTextColor="#94a3b8"
      value={value}
    />
  );
}

export const SearchBar = memo(SearchBarComponent);
