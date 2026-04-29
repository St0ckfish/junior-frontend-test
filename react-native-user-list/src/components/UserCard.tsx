import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type UserCardProps = {
  name: string;
  email: string;
  address: string;
};

function UserCardComponent({ name, email, address }: UserCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
}

export const UserCard = memo(UserCardComponent);

const styles = StyleSheet.create({
  card: {
    gap: 6,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    shadowColor: '#cbd5e1',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  name: {
    color: '#020617',
    fontSize: 18,
    fontWeight: '800',
  },
  email: {
    color: '#2563eb',
    fontSize: 14,
  },
  address: {
    color: '#64748b',
    fontSize: 14,
  },
});
