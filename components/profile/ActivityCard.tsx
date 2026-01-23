import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/profileStyles';

export default function ActivityCard({ userStats, summary }: any) {
  return (
    <LinearGradient
      colors={['rgba(16,185,129,0.15)', 'rgba(15,23,42,0.6)']}
      style={styles.activityCard}
    >
      <View style={styles.activityHeader}>
        <Ionicons name="pulse" size={22} color="#10b981" />
        <Text style={styles.cardTitle}>Aktivitas Pengguna</Text>
      </View>

      <Text style={styles.activityText}>
        Kamu telah melakukan <Text style={styles.bold}>{userStats.totalChecks}</Text>{' '}
        pengecekan konten.
      </Text>

      <Text style={styles.activityText}>
        Mayoritas konten kamu berada pada kategori{' '}
        <Text style={styles.bold}>
          {summary.safeCount >= summary.riskyCount ? 'Aman' : 'Perlu Perhatian'}
        </Text>
        .
      </Text>
    </LinearGradient>
  );
}
