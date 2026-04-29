import { memo } from 'react';
import { Text, View } from 'react-native';

type UserCardProps = {
  name: string;
  email: string;
  address: string;
};

function UserCardComponent({ name, email, address }: UserCardProps) {
  return (
    <View className="gap-1.5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300">
      <Text className="text-lg font-extrabold text-slate-950">{name}</Text>
      <Text className="text-sm text-blue-600">{email}</Text>
      <Text className="text-sm text-slate-500">{address}</Text>
    </View>
  );
}

export const UserCard = memo(UserCardComponent);
