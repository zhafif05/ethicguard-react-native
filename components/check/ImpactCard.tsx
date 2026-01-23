import { View, Text } from 'react-native';
import { styles } from '../../styles/checkStyles';

export default function ImpactCard({ impact }: any) {
  return (
    <View style={styles.impactCard}>
      <Text style={styles.impactTitle}>Simulasi Dampak</Text>
      <Text style={styles.impactText}>{impact}</Text>
    </View>
  );
}
