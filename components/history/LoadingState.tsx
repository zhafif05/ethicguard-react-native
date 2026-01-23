import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from '../../styles/historyStyles';

export default function LoadingState() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={styles.loadingText}>Memuat riwayat...</Text>
    </View>
  );
}
