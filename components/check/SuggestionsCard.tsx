import { View, Text } from 'react-native';
import { styles } from '../../styles/checkStyles';

export default function SuggestionsCard({ suggestions }: any) {
  return (
    <View style={styles.suggestionsCard}>
      <Text style={styles.suggestionsTitle}>💡 Saran Perbaikan Detail</Text>

      {suggestions.map((sugg: any, index: number) => (
        <View key={index} style={styles.suggestionItem}>
          <Text style={styles.suggestionCategory}>{sugg.category}</Text>
          <Text style={styles.suggestionIssue}>
            Masalah: {sugg.issue}
          </Text>
          <Text style={styles.suggestionText}>
            Saran: {sugg.suggestion}
          </Text>
        </View>
      ))}
    </View>
  );
}
