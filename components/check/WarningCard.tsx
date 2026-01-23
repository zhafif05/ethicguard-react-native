import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/checkStyles';

export default function WarningCard({ warnings }: any) {
  return (
    <View style={styles.warningCard}>
      <View style={styles.warningHeader}>
        <Ionicons name="warning" size={20} color="#f59e0b" />
        <Text style={styles.warningTitle}>Peringatan</Text>
      </View>

      {warnings.map((warning: string, index: number) => (
        <Text key={index} style={styles.warningText}>
          • {warning}
        </Text>
      ))}
    </View>
  );
}
