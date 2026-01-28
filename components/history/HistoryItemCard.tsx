import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { styles } from '../../styles/historyStyles';
import { AnimatedProgress, PulseView, ScalePressable } from '../ui/AnimatedComponents';

const getStatusIcon = (status: string) => {
  if (status === 'safe' || status === 'passed') return 'checkmark-circle';
  if (status === 'caution') return 'alert-circle';
  return 'close-circle';
};

const getStatusEmoji = (status: string) => {
  if (status === 'safe' || status === 'passed') return '✨';
  if (status === 'caution') return '⚠️';
  return '🚫';
};

export default function HistoryItemCard({ item, formatDate, getDateField, index = 0 }: any) {
  return (
    <ScalePressable scaleValue={0.98}>
      <View style={[styles.historyCard, { borderLeftWidth: 3, borderLeftColor: item.color }]}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <PulseView pulseScale={1.1} duration={2000}>
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                <Ionicons
                  name={getStatusIcon(item.status)}
                  size={24}
                  color={item.color}
                />
              </View>
            </PulseView>
            <View style={styles.headerInfo}>
              <Text style={styles.label}>
                {getStatusEmoji(item.status)} {item.label}
              </Text>
              <Text style={styles.date}>
                🕐 {formatDate(getDateField(item))}
              </Text>
            </View>
          </View>

          <View style={[styles.scoreBadge, { backgroundColor: `${item.color}20` }]}>
            <Text style={[styles.score, { color: item.color }]}>
              {item.score}
            </Text>
            <Text style={styles.scoreMax}>/100</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2}>
            "{item.text}"
          </Text>
        </View>

        <View style={styles.footer}>
          <AnimatedProgress
            progress={item.score}
            color={item.color}
            delay={index * 50}
            height={6}
          />
          <View style={styles.footerActions}>
            <Text style={styles.viewMore}>Lihat Detail</Text>
            <Ionicons name="chevron-forward" size={16} color="#3b82f6" />
          </View>
        </View>
      </View>
    </ScalePressable>
  );
}
