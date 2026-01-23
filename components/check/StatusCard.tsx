import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/checkStyles';

const getStatusIcon = (status: string) => {
  if (status === 'safe') return 'checkmark-circle';
  if (status === 'caution') return 'alert-circle';
  return 'close-circle';
};

export default function StatusCard({ result }: any) {
  return (
    <View style={[styles.statusCard, { borderColor: result.color }]}>
      <Ionicons
        name={getStatusIcon(result.status)}
        size={64}
        color={result.color}
      />

      <Text style={[styles.statusLabel, { color: result.color }]}>
        {result.label}
      </Text>

      <View style={styles.scoreContainer}>
        <View style={styles.scoreHeader}>
          <Text style={styles.scoreText}>Skor Etika</Text>
          <Text style={styles.scoreNumber}>{result.score}/100</Text>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${result.score}%`, backgroundColor: result.color },
            ]}
          />
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>
          📊 Kata: {result.details?.wordCount || 0} | Karakter:{' '}
          {result.details?.textLength || 0}
        </Text>
        <Text style={styles.detailsText}>
          ⚠️ Masalah ditemukan: {result.details?.issuesCount || 0}
        </Text>
      </View>
    </View>
  );
}
