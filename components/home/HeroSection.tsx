import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '../../styles/homeStyles';

export default function HeroSection() {
  return (
    <View style={styles.hero}>
      <View style={styles.logoContainer}>
        <LinearGradient
          colors={['#3b82f6', '#10b981']}
          style={styles.logoGradient}
        >
          <Ionicons name="shield-checkmark" size={48} color="#fff" />
        </LinearGradient>
      </View>

      <Text style={styles.title}>Your Ethical Digital Companion</Text>
      <Text style={styles.subtitle}>
        Evaluasi konten Anda sebelum dipublikasikan
      </Text>

      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => router.push('/(tabs)/check')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#3b82f6', '#10b981']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaGradient}
        >
          <Text style={styles.ctaText}>Cek Konten Sekarang</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
