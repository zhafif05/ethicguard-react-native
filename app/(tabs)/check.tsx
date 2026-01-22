// app/(tabs)/check.tsx - VERSI DENGAN BACKEND API
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// GANTI DENGAN IP LAPTOP ANDA!
// Cara cek IP: Windows (ipconfig) / Mac (ifconfig)
const API_URL = 'http://192.168.1.11:3000/api'; // ⚠️ GANTI IP INI!

export default function CheckScreen() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/analysis/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          userId: 'user-001', // Bisa diganti dengan user ID real
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.status === 'success') {
        setResult(data.data.analysis);
      } else {
        throw new Error(data.message || 'Analysis failed');
      }
    } catch (error: any) {
      console.error('Error analyzing content:', error);
      Alert.alert(
        'Error',
        'Gagal menganalisis konten. Pastikan backend sudah jalan dan IP sudah benar.',
        [{ text: 'OK' }]
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'safe') return 'checkmark-circle';
    if (status === 'caution') return 'alert-circle';
    return 'close-circle';
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
        <Text style={styles.title}>Cek Etika Konten</Text>

        {/* Input Section */}
        <View style={styles.inputCard}>
          <Text style={styles.label}>Masukkan caption, komentar, atau status</Text>
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

          <TouchableOpacity
            style={[styles.button, (!text.trim() || analyzing) && styles.buttonDisabled]}
            onPress={handleAnalyze}
            disabled={!text.trim() || analyzing}
            activeOpacity={0.8}
          >
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
                <Ionicons name="search" size={20} color="#fff" />
                <Text style={styles.buttonText}>Analisis dengan AI</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>

        {/* Result Section */}
        {result && (
          <View style={styles.resultsContainer}>
            {/* Status Card */}
            <View style={[styles.statusCard, { borderColor: result.color }]}>
              <Ionicons name={getStatusIcon(result.status)} size={64} color={result.color} />
              <Text style={[styles.statusLabel, { color: result.color }]}>
                {result.label}
              </Text>

              {/* Score */}
              <View style={styles.scoreContainer}>
                <View style={styles.scoreHeader}>
                  <Text style={styles.scoreText}>Skor Etika</Text>
                  <Text style={styles.scoreNumber}>{result.score}/100</Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${result.score}%`, backgroundColor: result.color },
                    ]}
                  />
                </View>
              </View>

              {/* Details */}
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsText}>
                  📊 Kata: {result.details?.wordCount || 0} | Karakter: {result.details?.textLength || 0}
                </Text>
                <Text style={styles.detailsText}>
                  ⚠️ Masalah ditemukan: {result.details?.issuesCount || 0}
                </Text>
              </View>
            </View>

            {/* Warnings */}
            {result.warnings && result.warnings.length > 0 && (
              <View style={styles.warningCard}>
                <View style={styles.warningHeader}>
                  <Ionicons name="warning" size={20} color="#f59e0b" />
                  <Text style={styles.warningTitle}>Peringatan</Text>
                </View>
                {result.warnings.map((warning: string, index: number) => (
                  <Text key={index} style={styles.warningText}>
                    • {warning}
                  </Text>
                ))}
              </View>
            )}

            {/* Recommendations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <View style={styles.recommendCard}>
                <View style={styles.recommendHeader}>
                  <Ionicons name="bulb" size={20} color="#3b82f6" />
                  <Text style={styles.recommendTitle}>Rekomendasi</Text>
                </View>
                {result.recommendations.map((rec: string, index: number) => (
                  <Text key={index} style={styles.recommendText}>
                    ✓ {rec}
                  </Text>
                ))}
              </View>
            )}

            {/* Impact */}
            <View style={styles.impactCard}>
              <Text style={styles.impactTitle}>Simulasi Dampak</Text>
              <Text style={styles.impactText}>{result.impact}</Text>
            </View>

            {/* Suggestions Detail */}
            {result.suggestions && result.suggestions.length > 0 && (
              <View style={styles.suggestionsCard}>
                <Text style={styles.suggestionsTitle}>💡 Saran Perbaikan Detail</Text>
                {result.suggestions.map((sugg: any, index: number) => (
                  <View key={index} style={styles.suggestionItem}>
                    <Text style={styles.suggestionCategory}>{sugg.category}</Text>
                    <Text style={styles.suggestionIssue}>Masalah: {sugg.issue}</Text>
                    <Text style={styles.suggestionText}>Saran: {sugg.suggestion}</Text>
                  </View>
                ))}
              </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  label: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    minHeight: 120,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  impactTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  impactText: {
    color: '#94a3b8',
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
  suggestionsTitle: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  suggestionItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.2)',
  },
  suggestionCategory: {
    color: '#34d399',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  suggestionIssue: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 4,
  },
  suggestionText: {
    color: '#a7f3d0',
    fontSize: 13,
  },
});