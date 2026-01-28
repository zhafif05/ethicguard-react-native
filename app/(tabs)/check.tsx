// app/(tabs)/check.tsx - VERSI DENGAN ANIMASI INTERAKTIF
import {
  AnimatedProgress,
  PulseView,
  ScalePressable,
  ShakeView,
  SlideInItem,
} from '@/components/ui/AnimatedComponents';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  BounceIn,
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  ZoomIn
} from 'react-native-reanimated';

// GANTI DENGAN IP LAPTOP ANDA!
const API_URL = 'http://10.122.49.114:3000/api';

export default function CheckScreen() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showError, setShowError] = useState(false);

  // Animation values
  const buttonScale = useSharedValue(1);
  const inputBorderColor = useSharedValue(0);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 500);
      return;
    }

    Keyboard.dismiss();
    setAnalyzing(true);
    setResult(null);

    // Button animation
    buttonScale.value = withSequence(
      withSpring(0.95),
      withSpring(1)
    );

    try {
      // Get auth token from storage
      const token = await AsyncStorage.getItem('authToken');
      
      console.log('Sending analysis request...');
      console.log('Token:', token ? 'Present' : 'Missing');
      console.log('Text:', text.substring(0, 50) + '...');
      
      const response = await fetch(`${API_URL}/analysis/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          text: text,
          userId: 'user-001',
        }),
      });

      // Log full response for debugging
      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response body:', responseText);

      if (!response.ok) {
        console.error('API Error:', response.status, responseText);
        
        // Tampilkan pesan error dari server jika ada
        let serverMessage = '';
        try {
          const errorData = JSON.parse(responseText);
          serverMessage = errorData.message || errorData.error || '';
        } catch (e) {
          serverMessage = responseText;
        }
        
        throw new Error(`Server error ${response.status}: ${serverMessage}`);
      }

      const data = JSON.parse(responseText);

      if (data.status === 'success') {
        setResult(data.data.analysis);
      } else {
        throw new Error(data.message || 'Analysis failed');
      }
    } catch (error: any) {
      console.error('Error analyzing content:', error);
      
      let errorMessage = 'Gagal menganalisis konten.';
      if (error.message.includes('Network request failed')) {
        errorMessage = `Tidak dapat terhubung ke server.\n\nPastikan:\n1. Backend server sudah berjalan di port 3000\n2. HP dan laptop dalam WiFi yang sama\n3. IP address benar: ${API_URL}`;
      } else if (error.message.includes('Server error')) {
        errorMessage = `Server error: ${error.message}`;
      }
      
      Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
    } finally {
      setAnalyzing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'safe') return 'checkmark-circle';
    if (status === 'caution') return 'alert-circle';
    return 'close-circle';
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
        {/* Animated Title */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <View style={styles.headerRow}>
            <PulseView pulseScale={1.1} duration={2000}>
              <Ionicons name="shield-checkmark" size={32} color="#3b82f6" />
            </PulseView>
            <Text style={styles.title}>Cek Etika Konten</Text>
          </View>
        </Animated.View>

        {/* Input Section with Animation */}
        <Animated.View entering={FadeInUp.delay(200).springify()}>
          <ShakeView trigger={showError}>
            <View style={[styles.inputCard, showError && styles.inputCardError]}>
              <View style={styles.labelRow}>
                <Ionicons name="create-outline" size={18} color="#3b82f6" />
                <Text style={styles.label}>Masukkan caption, komentar, atau status</Text>
              </View>
              
              <TextInput
                style={styles.input}
                multiline
                numberOfLines={6}
                value={text}
                onChangeText={setText}
                placeholder="Contoh: Hari ini saya sangat senang..."
                placeholderTextColor="#64748b"
                textAlignVertical="top"
              />

              {/* Character Count */}
              <Text style={styles.charCount}>
                {text.length} karakter
              </Text>

              <Animated.View style={buttonAnimatedStyle}>
                <ScalePressable
                  onPress={handleAnalyze}
                  disabled={!text.trim() || analyzing}
                  scaleValue={0.97}
                >
                  <View style={[styles.button, (!text.trim() || analyzing) && styles.buttonDisabled]}>
                    {analyzing ? (
                      <LinearGradient colors={['#475569', '#475569']} style={styles.buttonGradient}>
                        <ActivityIndicator color="#fff" size="small" />
                        <Text style={styles.buttonText}>Menganalisis...</Text>
                      </LinearGradient>
                    ) : (
                      <LinearGradient
                        colors={['#3b82f6', '#10b981']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.buttonGradient}
                      >
                        <Ionicons name="sparkles" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Analisis dengan AI</Text>
                      </LinearGradient>
                    )}
                  </View>
                </ScalePressable>
              </Animated.View>
            </View>
          </ShakeView>
        </Animated.View>

        {/* Result Section with Animations */}
        {result && (
          <View style={styles.resultsContainer}>
            {/* Status Card */}
            <Animated.View entering={ZoomIn.delay(100).springify()}>
              <ScalePressable scaleValue={0.98}>
                <View style={[styles.statusCard, { borderColor: result.color }]}>
                  <PulseView pulseScale={1.1} duration={1500}>
                    <Ionicons name={getStatusIcon(result.status)} size={64} color={result.color} />
                  </PulseView>
                  <Text style={[styles.statusLabel, { color: result.color }]}>
                    {result.label}
                  </Text>

                  {/* Animated Score */}
                  <Animated.View entering={FadeIn.delay(300)} style={styles.scoreContainer}>
                    <View style={styles.scoreHeader}>
                      <Text style={styles.scoreText}>🎯 Skor Etika</Text>
                      <Text style={styles.scoreNumber}>{result.score}/100</Text>
                    </View>

                    {/* Animated Progress Bar */}
                    <AnimatedProgress
                      progress={result.score}
                      color={result.color}
                      delay={400}
                      height={12}
                    />
                  </Animated.View>

                  {/* Details */}
                  <Animated.View entering={FadeInUp.delay(500)} style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>
                      📊 Kata: {result.details?.wordCount || 0} | Karakter: {result.details?.textLength || 0}
                    </Text>
                    <Text style={styles.detailsText}>
                      ⚠️ Masalah ditemukan: {result.details?.issuesCount || 0}
                    </Text>
                  </Animated.View>
                </View>
              </ScalePressable>
            </Animated.View>

            {/* Warnings with Slide Animation */}
            {result.warnings && result.warnings.length > 0 && (
              <Animated.View entering={SlideInRight.delay(200).springify()}>
                <ScalePressable scaleValue={0.98}>
                  <View style={styles.warningCard}>
                    <View style={styles.warningHeader}>
                      <PulseView pulseScale={1.15} duration={1000}>
                        <Ionicons name="warning" size={20} color="#f59e0b" />
                      </PulseView>
                      <Text style={styles.warningTitle}>Peringatan</Text>
                    </View>
                    {result.warnings.map((warning: string, index: number) => (
                      <SlideInItem key={index} index={index}>
                        <Text style={styles.warningText}>• {warning}</Text>
                      </SlideInItem>
                    ))}
                  </View>
                </ScalePressable>
              </Animated.View>
            )}

            {/* Recommendations with Animation */}
            {result.recommendations && result.recommendations.length > 0 && (
              <Animated.View entering={SlideInRight.delay(300).springify()}>
                <ScalePressable scaleValue={0.98}>
                  <View style={styles.recommendCard}>
                    <View style={styles.recommendHeader}>
                      <PulseView pulseScale={1.15} duration={1200}>
                        <Ionicons name="bulb" size={20} color="#3b82f6" />
                      </PulseView>
                      <Text style={styles.recommendTitle}>Rekomendasi</Text>
                    </View>
                    {result.recommendations.map((rec: string, index: number) => (
                      <SlideInItem key={index} index={index}>
                        <Text style={styles.recommendText}>✓ {rec}</Text>
                      </SlideInItem>
                    ))}
                  </View>
                </ScalePressable>
              </Animated.View>
            )}

            {/* Impact Card */}
            <Animated.View entering={FadeInUp.delay(400).springify()}>
              <ScalePressable scaleValue={0.98}>
                <View style={styles.impactCard}>
                  <View style={styles.impactHeader}>
                    <Ionicons name="globe-outline" size={20} color="#8b5cf6" />
                    <Text style={styles.impactTitle}>Simulasi Dampak</Text>
                  </View>
                  <Text style={styles.impactText}>{result.impact}</Text>
                </View>
              </ScalePressable>
            </Animated.View>

            {/* Suggestions Detail with Stagger */}
            {result.suggestions && result.suggestions.length > 0 && (
              <Animated.View entering={BounceIn.delay(500)}>
                <ScalePressable scaleValue={0.98}>
                  <View style={styles.suggestionsCard}>
                    <View style={styles.suggestionsHeader}>
                      <Ionicons name="sparkles" size={20} color="#10b981" />
                      <Text style={styles.suggestionsTitle}>Saran Perbaikan Detail</Text>
                    </View>
                    {result.suggestions.map((sugg: any, index: number) => (
                      <SlideInItem key={index} index={index} style={styles.suggestionItem}>
                        <View style={styles.suggestionCategoryBadge}>
                          <Text style={styles.suggestionCategory}>{sugg.category}</Text>
                        </View>
                        <Text style={styles.suggestionIssue}>❌ Masalah: {sugg.issue}</Text>
                        <Text style={styles.suggestionText}>✅ Saran: {sugg.suggestion}</Text>
                      </SlideInItem>
                    ))}
                  </View>
                </ScalePressable>
              </Animated.View>
            )}
          </View>
        )}
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
  headerRow: {
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
  inputCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputCardError: {
    borderColor: '#ef4444',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  label: {
    color: '#94a3b8',
    fontSize: 14,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    minHeight: 120,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  charCount: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 16,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    gap: 16,
  },
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
  },
  statusLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  scoreContainer: {
    width: '100%',
    marginTop: 24,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  scoreText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  scoreNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  detailsContainer: {
    width: '100%',
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
  },
  detailsText: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 4,
  },
  warningCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  warningTitle: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningText: {
    color: '#fbbf24',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  recommendCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  recommendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  recommendTitle: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendText: {
    color: '#93c5fd',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  impactCard: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  impactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  impactTitle: {
    color: '#a78bfa',
    fontSize: 16,
    fontWeight: 'bold',
  },
  impactText: {
    color: '#c4b5fd',
    fontSize: 14,
    lineHeight: 20,
  },
  suggestionsCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  suggestionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  suggestionsTitle: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.2)',
  },
  suggestionCategoryBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  suggestionCategory: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: 'bold',
  },
  suggestionIssue: {
    color: '#fca5a5',
    fontSize: 13,
    marginBottom: 4,
  },
  suggestionText: {
    color: '#a7f3d0',
    fontSize: 13,
  },
});