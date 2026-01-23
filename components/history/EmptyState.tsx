import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/historyStyles';

export default function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="document-text-outline" size={80} color="#475569" />
      <Text style={styles.emptyText}>Belum ada riwayat</Text>
      <Text style={styles.emptySubtext}>
        Analisis konten akan muncul di sini
      </Text>
    </View>
  );
}
