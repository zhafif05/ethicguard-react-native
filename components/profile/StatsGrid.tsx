import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/profileStyles';

export default function StatsGrid({ userStats, summary }: any) {
  const items = [
    {
      label: 'Total Cek',
      value: userStats.totalChecks,
      icon: 'shield-checkmark',
      color: '#3b82f6',
    },
    {
      label: 'Konten Aman',
      value: summary.safeCount,
      icon: 'checkmark-circle',
      color: '#10b981',
    },
    {
      label: 'Peringatan',
      value: summary.cautionCount,
      icon: 'alert-circle',
      color: '#f59e0b',
    },
    {
      label: 'Berisiko',
      value: summary.riskyCount,
      icon: 'close-circle',
      color: '#ef4444',
    },
  ];

  return (
    <View style={styles.statsGrid}>
      {items.map((item, i) => (
        <View key={i} style={styles.statBox}>
          <Ionicons name={item.icon as any} size={22} color={item.color} />
          <Text style={styles.statValue}>{item.value}</Text>
          <Text style={styles.statLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}
