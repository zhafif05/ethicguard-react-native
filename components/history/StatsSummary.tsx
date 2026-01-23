import { View, Text } from 'react-native';
import { styles } from '../../styles/historyStyles';

export default function StatsSummary({ history }: any) {
  const avg =
    history.reduce((sum: number, item: any) => sum + item.score, 0) /
    history.length;

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Total Analisis</Text>
        <Text style={styles.statValue}>{history.length}</Text>
      </View>

      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Rata-rata Skor</Text>
        <Text style={styles.statValue}>{Math.round(avg)}</Text>
      </View>
    </View>
  );
}
