import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/historyStyles';

const getStatusIcon = (status: string) => {
  if (status === 'safe' || status === 'passed') return 'checkmark-circle';
  if (status === 'caution') return 'alert-circle';
  return 'close-circle';
};

export default function HistoryItemCard({ item, formatDate, getDateField }: any) {
  return (
    <TouchableOpacity style={styles.historyCard} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Ionicons
            name={getStatusIcon(item.status)}
            size={32}
            color={item.color}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.date}>
              {formatDate(getDateField(item))}
            </Text>
          </View>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={[styles.score, { color: item.color }]}>
            {item.score}/100
          </Text>
        </View>
      </View>

      <Text style={styles.text} numberOfLines={2}>
        {item.text}
      </Text>

      <View style={styles.footer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${item.score}%`, backgroundColor: item.color },
            ]}
          />
        </View>
        <Text style={styles.viewMore}>Lihat Detail →</Text>
      </View>
    </TouchableOpacity>
  );
}
