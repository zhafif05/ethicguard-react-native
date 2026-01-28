import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { FloatingView, PulseView, ScalePressable } from '../ui/AnimatedComponents';
import { useAuth } from '@/contexts/AuthContext';

export default function HeroSection() {
  const { user } = useAuth();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? '🌅 Selamat Pagi' : currentHour < 18 ? '☀️ Selamat Siang' : '🌙 Selamat Malam';
  const userName = user?.name?.split(' ')[0] || 'Pengguna';

  return (
    <View style={heroStyles.container}>
      {/* Greeting with Wave Animation */}
      <Animated.View entering={FadeInDown.delay(100).springify()} style={heroStyles.greetingContainer}>
        <Text style={heroStyles.greeting}>{greeting}, {userName}! 👋</Text>
        <Text style={heroStyles.welcomeText}>Siap menjaga etika digital hari ini?</Text>
      </Animated.View>

      {/* Main Hero Card */}
      <Animated.View entering={ZoomIn.delay(200).springify()}>
        <LinearGradient
          colors={['#3b82f6', '#8b5cf6', '#10b981']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={heroStyles.heroCard}
        >
          {/* Decorative circles */}
          <View style={heroStyles.decorCircle1} />
          <View style={heroStyles.decorCircle2} />
          
          <View style={heroStyles.heroContent}>
            <FloatingView floatDistance={6} duration={2500}>
              <View style={heroStyles.iconContainer}>
                <Ionicons name="shield-checkmark" size={40} color="#fff" />
              </View>
            </FloatingView>
            
            <View style={heroStyles.heroTextContainer}>
              <Text style={heroStyles.heroTitle}>EthicGuard AI</Text>
              <Text style={heroStyles.heroSubtitle}>Analisis etika konten dalam hitungan detik</Text>
            </View>
          </View>

          {/* Quick Action Button */}
          <ScalePressable onPress={() => router.push('/(tabs)/check')} scaleValue={0.97}>
            <View style={heroStyles.ctaButton}>
              <Ionicons name="sparkles" size={18} color="#3b82f6" />
              <Text style={heroStyles.ctaText}>Mulai Analisis</Text>
              <Ionicons name="arrow-forward" size={18} color="#3b82f6" />
            </View>
          </ScalePressable>
        </LinearGradient>
      </Animated.View>

      {/* Quick Actions Row */}
      <View style={heroStyles.quickActionsRow}>
        <Animated.View entering={FadeInLeft.delay(400).springify()} style={{ flex: 1 }}>
          <ScalePressable onPress={() => router.push('/(tabs)/history')} scaleValue={0.95}>
            <View style={[heroStyles.quickAction, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <View style={[heroStyles.quickActionIcon, { backgroundColor: '#10b981' }]}>
                <Ionicons name="time-outline" size={20} color="#fff" />
              </View>
              <Text style={heroStyles.quickActionLabel}>Riwayat</Text>
            </View>
          </ScalePressable>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(500).springify()} style={{ flex: 1 }}>
          <ScalePressable onPress={() => router.push('/(tabs)/check')} scaleValue={0.95}>
            <View style={[heroStyles.quickAction, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
              <PulseView pulseScale={1.1} duration={1500}>
                <View style={[heroStyles.quickActionIcon, { backgroundColor: '#3b82f6' }]}>
                  <Ionicons name="add" size={24} color="#fff" />
                </View>
              </PulseView>
              <Text style={heroStyles.quickActionLabel}>Cek Baru</Text>
            </View>
          </ScalePressable>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(400).springify()} style={{ flex: 1 }}>
          <ScalePressable onPress={() => router.push('/(tabs)/explore')} scaleValue={0.95}>
            <View style={[heroStyles.quickAction, { backgroundColor: 'rgba(139, 92, 246, 0.15)' }]}>
              <View style={[heroStyles.quickActionIcon, { backgroundColor: '#8b5cf6' }]}>
                <Ionicons name="book-outline" size={20} color="#fff" />
              </View>
              <Text style={heroStyles.quickActionLabel}>Panduan</Text>
            </View>
          </ScalePressable>
        </Animated.View>
      </View>
    </View>
  );
}

const heroStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingTop: 10,
  },
  greetingContainer: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 15,
    color: '#94a3b8',
  },
  heroCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  decorCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 10,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
});
