import {
    BounceCard,
    FloatingView,
    GlowCard,
    PulseView,
    ScalePressable,
} from '@/components/ui/AnimatedComponents';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
    BounceIn,
    FadeInDown,
    FadeInUp,
    SlideInRight,
    ZoomIn,
} from 'react-native-reanimated';

// Tips dan panduan etika digital
const ethicsTips = [
  {
    id: 1,
    icon: '🎯',
    title: 'Berpikir Sebelum Posting',
    description: 'Selalu pertimbangkan dampak konten Anda sebelum membagikannya ke publik.',
    color: '#3b82f6',
  },
  {
    id: 2,
    icon: '💬',
    title: 'Komunikasi Positif',
    description: 'Gunakan bahasa yang sopan dan menghargai pendapat orang lain.',
    color: '#10b981',
  },
  {
    id: 3,
    icon: '🔒',
    title: 'Lindungi Privasi',
    description: 'Jangan membagikan informasi pribadi orang lain tanpa izin.',
    color: '#8b5cf6',
  },
  {
    id: 4,
    icon: '✅',
    title: 'Verifikasi Fakta',
    description: 'Pastikan informasi yang Anda bagikan akurat dan dapat dipertanggungjawabkan.',
    color: '#f59e0b',
  },
];

// Fitur aplikasi
const appFeatures = [
  {
    icon: 'shield-checkmark',
    title: 'Analisis AI',
    description: 'Teknologi AI canggih untuk mengevaluasi etika konten Anda',
    color: '#3b82f6',
  },
  {
    icon: 'time-outline',
    title: 'Riwayat Lengkap',
    description: 'Simpan dan lacak semua analisis konten Anda',
    color: '#10b981',
  },
  {
    icon: 'trending-up',
    title: 'Statistik & Level',
    description: 'Tingkatkan level etika digital Anda dengan setiap analisis',
    color: '#f59e0b',
  },
  {
    icon: 'bulb-outline',
    title: 'Rekomendasi Cerdas',
    description: 'Dapatkan saran untuk memperbaiki konten Anda',
    color: '#8b5cf6',
  },
];

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#0f172a', '#1e293b', '#0f172a']} style={styles.gradient}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.header}>
          <PulseView pulseScale={1.1} duration={2000}>
            <Ionicons name="compass" size={32} color="#3b82f6" />
          </PulseView>
          <Text style={styles.title}>Jelajahi</Text>
        </Animated.View>

        {/* Hero Section */}
        <Animated.View entering={ZoomIn.delay(200).springify()}>
          <GlowCard glowColor="#3b82f6">
            <LinearGradient
              colors={['rgba(59, 130, 246, 0.2)', 'rgba(16, 185, 129, 0.2)']}
              style={styles.heroCard}
            >
              <FloatingView floatDistance={10} duration={3000}>
                <View style={styles.heroIconContainer}>
                  <Ionicons name="book" size={48} color="#fff" />
                </View>
              </FloatingView>
              <Text style={styles.heroTitle}>Panduan Etika Digital</Text>
              <Text style={styles.heroSubtitle}>
                Pelajari cara berkomunikasi yang baik dan etis di dunia digital
              </Text>
            </LinearGradient>
          </GlowCard>
        </Animated.View>

        {/* Ethics Tips Section */}
        <Animated.View entering={FadeInUp.delay(300).springify()}>
          <Text style={styles.sectionTitle}>💡 Tips Etika Digital</Text>
          
          {ethicsTips.map((tip, index) => (
            <Animated.View
              key={tip.id}
              entering={SlideInRight.delay(400 + index * 100).springify()}
            >
              <ScalePressable scaleValue={0.98}>
                <View style={[styles.tipCard, { borderLeftColor: tip.color }]}>
                  <View style={[styles.tipIconContainer, { backgroundColor: `${tip.color}20` }]}>
                    <Text style={styles.tipEmoji}>{tip.icon}</Text>
                  </View>
                  <View style={styles.tipContent}>
                    <Text style={styles.tipTitle}>{tip.title}</Text>
                    <Text style={styles.tipDescription}>{tip.description}</Text>
                  </View>
                </View>
              </ScalePressable>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Features Section */}
        <Animated.View entering={FadeInUp.delay(600).springify()}>
          <Text style={styles.sectionTitle}>🚀 Fitur EthicGuard</Text>
          
          <View style={styles.featuresGrid}>
            {appFeatures.map((feature, index) => (
              <Animated.View
                key={feature.title}
                entering={ZoomIn.delay(700 + index * 100).springify()}
                style={styles.featureCardWrapper}
              >
                <BounceCard delay={700 + index * 100} style={styles.featureCard}>
                  <PulseView pulseScale={1.15} duration={2000}>
                    <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                      <Ionicons name={feature.icon as any} size={24} color={feature.color} />
                    </View>
                  </PulseView>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.description}</Text>
                </BounceCard>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* About Section */}
        <Animated.View entering={BounceIn.delay(900)}>
          <BounceCard delay={900} style={styles.aboutCard}>
            <View style={styles.aboutHeader}>
              <FloatingView floatDistance={5} duration={2500}>
                <View style={styles.aboutIcon}>
                  <Ionicons name="information-circle" size={32} color="#3b82f6" />
                </View>
              </FloatingView>
              <Text style={styles.aboutTitle}>Tentang EthicGuard</Text>
            </View>
            <Text style={styles.aboutText}>
              EthicGuard adalah aplikasi yang membantu Anda mengevaluasi etika konten digital sebelum dipublikasikan. 
              Dengan teknologi AI, kami membantu menciptakan lingkungan digital yang lebih positif dan bertanggung jawab.
            </Text>
            <View style={styles.versionBadge}>
              <Ionicons name="code-slash" size={16} color="#64748b" />
              <Text style={styles.versionText}>Versi 1.0.0</Text>
            </View>
          </BounceCard>
        </Animated.View>

        {/* Quick Links */}
        <Animated.View entering={FadeInUp.delay(1000).springify()}>
          <Text style={styles.sectionTitle}>🔗 Tautan Cepat</Text>
          
          {[
            { icon: 'help-circle', label: 'Bantuan & FAQ', color: '#3b82f6' },
            { icon: 'mail', label: 'Hubungi Kami', color: '#10b981' },
            { icon: 'star', label: 'Beri Rating', color: '#f59e0b' },
          ].map((link, index) => (
            <Animated.View
              key={link.label}
              entering={SlideInRight.delay(1100 + index * 80).springify()}
            >
              <ScalePressable scaleValue={0.98}>
                <View style={styles.linkItem}>
                  <View style={[styles.linkIcon, { backgroundColor: `${link.color}20` }]}>
                    <Ionicons name={link.icon as any} size={22} color={link.color} />
                  </View>
                  <Text style={styles.linkLabel}>{link.label}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#64748b" />
                </View>
              </ScalePressable>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInUp.delay(1200)} style={styles.footer}>
          <Text style={styles.footerText}>Made with 💙 for a better digital world</Text>
        </Animated.View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  gradient: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  
  // Hero Section
  heroCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 24,
  },
  heroIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    marginTop: 8,
  },
  
  // Tips Cards
  tipCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tipIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  tipEmoji: {
    fontSize: 24,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 20,
  },
  
  // Features Grid
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 10,
  },
  featureCardWrapper: {
    width: '48%',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    minHeight: 150,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 16,
  },
  
  // About Section
  aboutCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  aboutIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  aboutText: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 22,
    marginBottom: 16,
  },
  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  versionText: {
    fontSize: 12,
    color: '#64748b',
  },
  
  // Quick Links
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  linkIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  linkLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  
  // Footer
  footer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#64748b',
  },
});
