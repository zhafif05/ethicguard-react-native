import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles';

export default function SummaryStatsCard({ summary }: any) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Ringkasan Analisis</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryBadge, { backgroundColor: '#10b98120' }]}>
            <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          </View>
          <Text style={styles.summaryNumber}>{summary.safeCount}</Text>
          <Text style={styles.summaryLabel}>Etis</Text>
        </View>

        <View style={styles.summaryItem}>
          <View style={[styles.summaryBadge, { backgroundColor: '#f59e0b20' }]}>
            <Ionicons name="alert-circle" size={20} color="#f59e0b" />
          </View>
          <Text style={styles.summaryNumber}>{summary.cautionCount}</Text>
          <Text style={styles.summaryLabel}>Perlu Ditinjau</Text>
        </View>

        <View style={styles.summaryItem}>
          <View style={[styles.summaryBadge, { backgroundColor: '#ef444420' }]}>
            <Ionicons name="close-circle" size={20} color="#ef4444" />
          </View>
          <Text style={styles.summaryNumber}>{summary.riskyCount}</Text>
          <Text style={styles.summaryLabel}>Tidak Etis</Text>
        </View>
      </View>

      {summary.averageScore > 0 && (
        <View style={styles.averageContainer}>
          <Text style={styles.averageLabel}>Rata-rata Skor Etika</Text>
          <Text style={styles.averageScore}>{summary.averageScore}/100</Text>
        </View>
      )}
    </View>
  );
}
