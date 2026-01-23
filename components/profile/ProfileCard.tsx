import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/profileStyles';

export default function ProfileCard({ userStats }: any) {
  const getLevelBadge = (level: number) => {
    if (level >= 10) return { name: 'Master Guardian', color: '#f59e0b' };
    if (level >= 7) return { name: 'Advanced', color: '#8b5cf6' };
    if (level >= 4) return { name: 'Intermediate', color: '#3b82f6' };
    if (level >= 2) return { name: 'Beginner', color: '#10b981' };
    return { name: 'Novice', color: '#94a3b8' };
  };

  const badge = getLevelBadge(userStats.level);

  return (
    <LinearGradient
      colors={['rgba(59, 130, 246, 0.2)', 'rgba(16, 185, 129, 0.2)']}
      style={styles.profileCard}
    >
      <View style={styles.avatar}>
        <Ionicons name="person" size={40} color="#fff" />
      </View>

      <Text style={styles.name}>Pengguna EthicGuard</Text>

      <View style={styles.levelBadge}>
        <Ionicons name="star" size={16} color={badge.color} />
        <Text style={[styles.levelText, { color: badge.color }]}>
          Level {userStats.level} • {badge.name}
        </Text>
      </View>

      <View style={styles.expContainer}>
        <View style={styles.expHeader}>
          <Text style={styles.expLabel}>Experience Points</Text>
          <Text style={styles.expValue}>{userStats.experience} XP</Text>
        </View>

        <View style={styles.expBar}>
          <View
            style={[
              styles.expFill,
              { width: `${((userStats.experience % 50) / 50) * 100}%` },
            ]}
          />
        </View>

        <Text style={styles.expNext}>
          {50 - (userStats.experience % 50)} XP menuju Level{' '}
          {userStats.level + 1}
        </Text>
      </View>
    </LinearGradient>
  );
}
