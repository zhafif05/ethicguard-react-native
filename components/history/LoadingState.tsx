import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
    Easing,
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';
import { styles } from '../../styles/historyStyles';

export default function LoadingState() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1500, easing: Easing.linear }),
      -1,
      false
    );
    scale.value = withRepeat(
      withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateZ: `${rotation.value}deg` },
      { scale: scale.value }
    ],
  }));

  return (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={styles.loadingContainer}
    >
      <Animated.View style={spinStyle}>
        <View style={styles.loadingIcon}>
          <Ionicons name="sync" size={40} color="#3b82f6" />
        </View>
      </Animated.View>
      <Text style={styles.loadingText}>⏳ Memuat riwayat...</Text>
      <Text style={styles.loadingSubtext}>Mohon tunggu sebentar</Text>
    </Animated.View>
  );
}
