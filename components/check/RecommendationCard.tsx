import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/checkStyles';

export default function RecommendationCard({ recommendations }: any) {
  return (
    <View style={styles.recommendCard}>
      <View style={styles.recommendHeader}>
        <Ionicons name="bulb" size={20} color="#3b82f6" />
        <Text style={styles.recommendTitle}>Rekomendasi</Text>
      </View>

      {recommendations.map((rec: string, index: number) => (
        <Text key={index} style={styles.recommendText}>
          ✓ {rec}
        </Text>
      ))}
    </View>
  );
}
