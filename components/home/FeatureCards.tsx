import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ScalePressable } from '../ui/AnimatedComponents';

const tips = [
  {
    id: 1,
    icon: 'heart-outline',
    title: 'Jaga Kesopanan',
    description: 'Gunakan bahasa yang sopan dan tidak menyinggung',
    gradient: ['#ec4899', '#f43f5e'],
  },
  {
    id: 2,
    icon: 'checkmark-shield-outline',
    title: 'Fakta Akurat',
    description: 'Pastikan informasi yang dibagikan sudah terverifikasi',
    gradient: ['#3b82f6', '#06b6d4'],
  },
  {
    id: 3,
    icon: 'people-outline',
    title: 'Hormati Privasi',
    description: 'Jangan bagikan data pribadi orang lain',
    gradient: ['#8b5cf6', '#a855f7'],
  },
  {
    id: 4,
    icon: 'happy-outline',
    title: 'Positif & Konstruktif',
    description: 'Sebarkan konten yang bermanfaat',
    gradient: ['#10b981', '#22c55e'],
  },
];

export default function FeatureCards() {
  return (
    <Animated.View entering={FadeInUp.delay(600).springify()} style={featureStyles.container}>
      <Text style={featureStyles.sectionTitle}>💡 Tips Etika Digital</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={featureStyles.scrollContent}
      >
        {tips.map((tip, index) => (
          <ScalePressable key={tip.id} scaleValue={0.95}>
            <Animated.View 
              entering={FadeInUp.delay(700 + index * 80).springify()}
              style={featureStyles.tipCard}
            >
              <View style={[featureStyles.tipIconContainer, { backgroundColor: `${tip.gradient[0]}20` }]}>
                <Ionicons name={tip.icon as any} size={28} color={tip.gradient[0]} />
              </View>
              <Text style={featureStyles.tipTitle}>{tip.title}</Text>
              <Text style={featureStyles.tipDescription}>{tip.description}</Text>
            </Animated.View>
          </ScalePressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const featureStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 14,
  },
  scrollContent: {
    paddingRight: 20,
    gap: 12,
  },
  tipCard: {
    width: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  tipIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 16,
  },
});
