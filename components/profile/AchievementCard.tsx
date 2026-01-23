import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/profileStyles';

export default function AchievementCard({ level }: { level: number }) {
  return (
    <LinearGradient
      colors={['#f59e0b', '#d97706']}
      style={styles.achievementCard}
    >
      <Ionicons name="trophy" size={28} color="#fff" />
      <View>
        <Text style={styles.achievementTitle}>Achievement Unlocked!</Text>
        <Text style={styles.achievementText}>
          Kamu mencapai Level {level}. Terus jaga etika digital 💪
        </Text>
      </View>
    </LinearGradient>
  );
}
