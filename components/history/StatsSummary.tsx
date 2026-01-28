import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { styles } from '../../styles/historyStyles';
import { AnimatedCounter, BounceCard, ScalePressable } from '../ui/AnimatedComponents';

export default function StatsSummary({ history }: any) {
  const avg =
    history.reduce((sum: number, item: any) => sum + item.score, 0) /
    history.length;

  const safeCount = history.filter((h: any) => h.status === 'safe').length;
  const cautionCount = history.filter((h: any) => h.status === 'caution').length;
  const riskyCount = history.filter((h: any) => h.status === 'risky').length;

  return (
    <Animated.View entering={FadeInUp.delay(300).springify()}>
      <BounceCard delay={300} style={styles.statsContainer}>
        <Text style={styles.statsTitle}>📊 Ringkasan Statistik</Text>
        
        <View style={styles.statsRow}>
          <Animated.View entering={ZoomIn.delay(400)} style={styles.statBox}>
            <ScalePressable scaleValue={0.95}>
              <View style={styles.statBoxInner}>
                <Ionicons name="document-text" size={24} color="#3b82f6" />
                <AnimatedCounter
                  value={history.length}
                  duration={1500}
                  textStyle={styles.statValue}
                />
                <Text style={styles.statLabel}>Total</Text>
              </View>
            </ScalePressable>
          </Animated.View>

          <Animated.View entering={ZoomIn.delay(500)} style={styles.statBox}>
            <ScalePressable scaleValue={0.95}>
              <View style={styles.statBoxInner}>
                <Ionicons name="trending-up" size={24} color="#10b981" />
                <AnimatedCounter
                  value={Math.round(avg)}
                  duration={1500}
                  textStyle={styles.statValue}
                />
                <Text style={styles.statLabel}>Rata-rata</Text>
              </View>
            </ScalePressable>
          </Animated.View>
        </View>

        <View style={styles.miniStatsRow}>
          <View style={[styles.miniStat, { backgroundColor: '#10b98120' }]}>
            <Text style={[styles.miniStatValue, { color: '#10b981' }]}>{safeCount}</Text>
            <Text style={styles.miniStatLabel}>✅ Etis</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: '#f59e0b20' }]}>
            <Text style={[styles.miniStatValue, { color: '#f59e0b' }]}>{cautionCount}</Text>
            <Text style={styles.miniStatLabel}>⚠️ Tinjauan</Text>
          </View>
          <View style={[styles.miniStat, { backgroundColor: '#ef444420' }]}>
            <Text style={[styles.miniStatValue, { color: '#ef4444' }]}>{riskyCount}</Text>
            <Text style={styles.miniStatLabel}>❌ Risiko</Text>
          </View>
        </View>
      </BounceCard>
    </Animated.View>
  );
}
