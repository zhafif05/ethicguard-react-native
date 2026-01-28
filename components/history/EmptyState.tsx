import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import Animated, { BounceIn, FadeIn, ZoomIn } from 'react-native-reanimated';
import { styles } from '../../styles/historyStyles';
import { FloatingView } from '../ui/AnimatedComponents';

export default function EmptyState() {
  return (
    <Animated.View 
      entering={FadeIn.delay(200).duration(500)}
      style={styles.emptyState}
    >
      <Animated.View entering={ZoomIn.delay(300).springify()}>
        <FloatingView floatDistance={15} duration={3000}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="document-text-outline" size={60} color="#3b82f6" />
          </View>
        </FloatingView>
      </Animated.View>
      
      <Animated.Text 
        entering={BounceIn.delay(500)}
        style={styles.emptyText}
      >
        📭 Belum ada riwayat
      </Animated.Text>
      
      <Animated.Text 
        entering={FadeIn.delay(600)}
        style={styles.emptySubtext}
      >
        Mulai analisis konten untuk melihat riwayat di sini
      </Animated.Text>
    </Animated.View>
  );
}
