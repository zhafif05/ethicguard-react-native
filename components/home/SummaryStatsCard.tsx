import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight, FadeInUp, ZoomIn } from 'react-native-reanimated';
import { FloatingView, ScalePressable } from '../ui/AnimatedComponents';

const dailyInsights = [
  {
    id: 1,
    icon: 'bulb',
    title: 'Etika Hari Ini',
    content: 'Pastikan konten yang kamu bagikan tidak menyebarkan informasi palsu atau menyesatkan.',
    gradient: ['#6366f1', '#8b5cf6'],
  },
  {
    id: 2,
    icon: 'shield-checkmark',
    title: 'Tips Keamanan',
    content: 'Selalu periksa sumber informasi sebelum membagikan ke orang lain.',
    gradient: ['#10b981', '#059669'],
  },
];

const quickGuides = [
  { icon: 'document-text', label: 'Cek Teks', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
  { icon: 'image', label: 'Cek Gambar', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
  { icon: 'link', label: 'Cek Link', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  { icon: 'chatbubbles', label: 'Cek Chat', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' },
];

export default function SummaryStatsCard() {
  const today = new Date();
  const dayIndex = today.getDay();
  const insight = dailyInsights[dayIndex % dailyInsights.length];

  return (
    <Animated.View entering={FadeInUp.delay(1000).springify()}>
      <View style={cardStyles.container}>
        {/* Daily Insight Card */}
        <Animated.View entering={ZoomIn.delay(1100).springify()}>
          <ScalePressable scaleValue={0.98}>
            <LinearGradient
              colors={insight.gradient as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={cardStyles.insightCard}
            >
              <View style={cardStyles.insightHeader}>
                <FloatingView duration={2500}>
                  <View style={cardStyles.insightIconWrap}>
                    <Ionicons name={insight.icon as any} size={28} color="#fff" />
                  </View>
                </FloatingView>
                <View style={cardStyles.insightBadge}>
                  <Text style={cardStyles.insightBadgeText}>💡 Daily Insight</Text>
                </View>
              </View>
              <Text style={cardStyles.insightTitle}>{insight.title}</Text>
              <Text style={cardStyles.insightContent}>{insight.content}</Text>
              <View style={cardStyles.insightDecor}>
                <View style={cardStyles.decorCircle1} />
                <View style={cardStyles.decorCircle2} />
              </View>
            </LinearGradient>
          </ScalePressable>
        </Animated.View>

        {/* Quick Guide Section */}
        <Text style={cardStyles.sectionTitle}>🚀 Panduan Cepat</Text>
        <View style={cardStyles.guideGrid}>
          {quickGuides.map((guide, index) => (
            <Animated.View
              key={guide.label}
              entering={FadeInRight.delay(1200 + index * 80).springify()}
              style={cardStyles.guideItem}
            >
              <ScalePressable scaleValue={0.92}>
                <View style={[cardStyles.guideCard, { backgroundColor: guide.bg }]}>
                  <View style={[cardStyles.guideIconWrap, { backgroundColor: guide.color }]}>
                    <Ionicons name={guide.icon as any} size={20} color="#fff" />
                  </View>
                  <Text style={[cardStyles.guideLabel, { color: guide.color }]}>{guide.label}</Text>
                </View>
              </ScalePressable>
            </Animated.View>
          ))}
        </View>

        {/* Motivational Footer */}
        <Animated.View entering={FadeInUp.delay(1500).springify()}>
          <View style={cardStyles.motivationCard}>
            <Text style={cardStyles.motivationEmoji}>🌟</Text>
            <View style={cardStyles.motivationContent}>
              <Text style={cardStyles.motivationText}>
                "Jadilah pengguna digital yang bertanggung jawab"
              </Text>
              <Text style={cardStyles.motivationAuthor}>— EthicGuard</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const cardStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  insightCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  insightIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  insightBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  insightTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  insightContent: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  insightDecor: {
    position: 'absolute',
    right: -20,
    bottom: -20,
  },
  decorCircle1: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  decorCircle2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    position: 'absolute',
    right: 50,
    bottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 14,
  },
  guideGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  guideItem: {
    width: '48%',
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 12,
  },
  guideIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  motivationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 14,
  },
  motivationEmoji: {
    fontSize: 32,
  },
  motivationContent: {
    flex: 1,
  },
  motivationText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#e2e8f0',
    lineHeight: 20,
  },
  motivationAuthor: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
});
