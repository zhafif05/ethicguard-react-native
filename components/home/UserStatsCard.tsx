import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles';

export default function UserStatsCard({ userStats, loading }: any) {
  return (
    <View style={styles.statsCard}>
      <View style={styles.statsHeader}>
        <Text style={styles.statsTitle}>Statistik Anda</Text>
        {loading && (
          <Ionicons name="refresh" size={16} color="#94a3b8" />
        )}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.totalChecks}</Text>
          <Text style={styles.statLabel}>Total Analisis</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.level}</Text>
          <Text style={styles.statLabel}>Level Etika</Text>
        </View>
      </View>

      {userStats.level < 10 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>
              Menuju Level {userStats.level + 1}
            </Text>
            <Text style={styles.progressText}>
              {userStats.experience % 50}/50 XP
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((userStats.experience % 50) / 50) * 100}%`,
                },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );
}
