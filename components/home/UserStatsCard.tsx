import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeInUp,
  ZoomIn,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import Svg, { Circle, Defs, Stop, LinearGradient as SvgGradient } from 'react-native-svg';
import { AnimatedCounter } from '../ui/AnimatedComponents';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Progress Ring Component
function ProgressRing({ progress, size = 100, strokeWidth = 10 }: { progress: number; size?: number; strokeWidth?: number }) {
  const animatedProgress = useSharedValue(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 1500, easing: Easing.out(Easing.cubic) });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (circumference * animatedProgress.value) / 100;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Defs>
          <SvgGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#3b82f6" />
            <Stop offset="100%" stopColor="#10b981" />
          </SvgGradient>
        </Defs>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export default function UserStatsCard({ userStats, loading }: any) {
  const rotation = useSharedValue(0);
  const expProgress = ((userStats.experience % 50) / 50) * 100;

  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      rotation.value = 0;
    }
  }, [loading]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  const getLevelInfo = (level: number) => {
    if (level >= 10) return { title: 'Master', color: '#f59e0b', icon: 'trophy' };
    if (level >= 7) return { title: 'Expert', color: '#8b5cf6', icon: 'star' };
    if (level >= 4) return { title: 'Intermediate', color: '#3b82f6', icon: 'ribbon' };
    if (level >= 2) return { title: 'Beginner', color: '#10b981', icon: 'leaf' };
    return { title: 'Novice', color: '#94a3b8', icon: 'person' };
  };

  const levelInfo = getLevelInfo(userStats.level);

  return (
    <Animated.View entering={FadeInUp.delay(800).springify()}>
      <View style={statsStyles.container}>
        <View style={statsStyles.header}>
          <Text style={statsStyles.sectionTitle}>🎮 Progres Anda</Text>
          {loading && (
            <Animated.View style={spinStyle}>
              <Ionicons name="refresh" size={18} color="#3b82f6" />
            </Animated.View>
          )}
        </View>

        <View style={statsStyles.contentRow}>
          {/* Level Ring */}
          <Animated.View entering={ZoomIn.delay(900).springify()} style={statsStyles.ringContainer}>
            <ProgressRing progress={expProgress} size={120} strokeWidth={12} />
            <View style={statsStyles.ringCenter}>
              <Text style={statsStyles.levelNumber}>{userStats.level}</Text>
              <Text style={statsStyles.levelLabel}>LEVEL</Text>
            </View>
          </Animated.View>

          {/* Stats Info */}
          <View style={statsStyles.infoContainer}>
            <Animated.View entering={FadeInUp.delay(1000).springify()}>
              <View style={[statsStyles.levelBadge, { backgroundColor: `${levelInfo.color}20` }]}>
                <Ionicons name={levelInfo.icon as any} size={16} color={levelInfo.color} />
                <Text style={[statsStyles.levelTitle, { color: levelInfo.color }]}>{levelInfo.title}</Text>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(1100).springify()} style={statsStyles.statRow}>
              <View style={statsStyles.statItem}>
                <AnimatedCounter value={userStats.totalChecks} duration={1500} textStyle={statsStyles.statValue} />
                <Text style={statsStyles.statLabel}>Analisis</Text>
              </View>
              <View style={statsStyles.statDivider} />
              <View style={statsStyles.statItem}>
                <AnimatedCounter value={userStats.experience} duration={1500} textStyle={statsStyles.statValue} />
                <Text style={statsStyles.statLabel}>XP Total</Text>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(1200).springify()}>
              <View style={statsStyles.xpProgress}>
                <View style={statsStyles.xpBar}>
                  <View style={[statsStyles.xpFill, { width: `${expProgress}%` }]} />
                </View>
                <Text style={statsStyles.xpText}>
                  {userStats.experience % 50}/50 XP ke Level {userStats.level + 1}
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const statsStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ringContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    marginRight: 20,
  },
  ringCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  levelLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '600',
    letterSpacing: 1,
  },
  infoContainer: {
    flex: 1,
    gap: 12,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  levelTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  xpProgress: {
    gap: 6,
  },
  xpBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },
  xpText: {
    fontSize: 11,
    color: '#64748b',
  },
});
