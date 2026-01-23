import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/profileStyles';

export default function DetailStatsCard({ summary }: any) {
  return (
    <LinearGradient
      colors={['rgba(59,130,246,0.15)', 'rgba(15,23,42,0.6)']}
      style={styles.detailCard}
    >
      <Text style={styles.cardTitle}>Statistik Detail</Text>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Total Analisis</Text>
        <Text style={styles.detailValue}>{summary.totalAnalyses}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Rata-rata Skor Etika</Text>
        <Text style={styles.detailValue}>
          {summary.averageScore?.toFixed(1) ?? '-'}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Terakhir Dianalisis</Text>
        <Text style={styles.detailValue}>
          {summary.lastAnalyzed
            ? new Date(summary.lastAnalyzed).toLocaleDateString()
            : '-'}
        </Text>
      </View>
    </LinearGradient>
  );
}
