import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/homeStyles';

export default function FeatureCards() {
  return (
    <View style={styles.cardsContainer}>
      <View style={styles.card}>
        <Ionicons name="flash" size={32} color="#fbbf24" />
        <Text style={styles.cardTitle}>Cepat & Akurat</Text>
        <Text style={styles.cardSubtitle}>Analisis instan dengan AI</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="trending-up" size={32} color="#10b981" />
        <Text style={styles.cardTitle}>Privasi Terjaga</Text>
        <Text style={styles.cardSubtitle}>Data Anda aman</Text>
      </View>
    </View>
  );
}
