import { Text, View } from 'react-native';

type UserCardProps = {
  name: string;
  email: string;
  address: string;
};

export function UserCard({ name, email, address }: UserCardProps) {
  return (
    <View className="gap-1.5 rounded-lg border border-slate-300 bg-white p-4">
      <Text className="text-lg font-bold text-slate-950">{name}</Text>
      <Text className="text-sm text-blue-600">{email}</Text>
      <Text className="text-sm text-slate-500">{address}</Text>
    </View>
  );
}
