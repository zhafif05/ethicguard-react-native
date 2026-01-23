// app/(tabs)/index.tsx - FIXED VERSION
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

// ⚠️ GANTI IP INI!
const API_URL = 'http://192.168.1.11:3000/api';

interface UserStats {
  userId: string;
  totalChecks: number;
  level: number;
  experience: number;
  createdAt: string;
}

interface AnalysisSummary {
  totalAnalyses: number;
  safeCount: number;
  cautionCount: number;
  riskyCount: number;
  averageScore: number;
  lastAnalyzed: string | null;
}

export default function HomeScreen() {
  const [userStats, setUserStats] = useState<UserStats>({
    userId: 'user-001',
    totalChecks: 0,
    level: 1,
    experience: 0,
    createdAt: '',
  });
  
  const [summary, setSummary] = useState<AnalysisSummary>({
    totalAnalyses: 0,
    safeCount: 0,
    cautionCount: 0,
    riskyCount: 0,
    averageScore: 0,
    lastAnalyzed: null,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch data dari backend
  const fetchData = async () => {
    try {
      // 1. Fetch User Stats
      const userResponse = await fetch(
        `${API_URL}/user/stats?userId=user-001`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        if (userData.status === 'success') {
          setUserStats(userData.data);
        }
      }

      // 2. Fetch Analysis Summary
      const summaryResponse = await fetch(
        `${API_URL}/analysis/stats/summary?userId=user-001`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (summaryResponse.ok) {
        const summaryData = await summaryResponse.json();
        if (summaryData.status === 'success') {
          setSummary(summaryData.data);
        }
      }

    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load data saat pertama kali
  useEffect(() => {
    fetchData();
  }, []);

  // Refresh data setiap kali tab dibuka
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#3b82f6"
          colors={['#3b82f6']}
        />
      }
    >
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#0f172a']}
        style={styles.gradient}
      >
        {/* Hero Section */}
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

        {/* Education Cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Ionicons name="flash" size={32} color="#fbbf24" />
            <Text style={styles.cardTitle}>Cepat & Akurat</Text>
            <Text style={styles.cardSubtitle}>Analisis instan dengan AI</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="trending-up" size={32} color="#10b981" />
            <Text style={styles.cardTitle}>Privasi Terjaga</Text>
            <Text style={styles.cardSubtitle}>Data Anda aman</Text>
          </View>
        </View>

        {/* Stats Card - Dari Database User */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Statistik Anda</Text>
            {loading && (
              <Ionicons name="refresh" size={16} color="#94a3b8" />
            )}
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.totalChecks}</Text>
              <Text style={styles.statLabel}>Total Analisis</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.level}</Text>
              <Text style={styles.statLabel}>Level Etika</Text>
            </View>
          </View>

          {/* Progress to next level */}
          {userStats.level < 10 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                  Menuju Level {userStats.level + 1}
                </Text>
                <Text style={styles.progressText}>
                  {userStats.experience % 50}/50 XP
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${((userStats.experience % 50) / 50) * 100}%` }
                  ]} 
                />
              </View>
            </View>
          )}
        </View>

        {/* Summary Stats Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Ringkasan Analisis</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryBadge, { backgroundColor: '#10b98120' }]}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              </View>
              <Text style={styles.summaryNumber}>{summary.safeCount}</Text>
              <Text style={styles.summaryLabel}>Etis</Text>
            </View>

            <View style={styles.summaryItem}>
              <View style={[styles.summaryBadge, { backgroundColor: '#f59e0b20' }]}>
                <Ionicons name="alert-circle" size={20} color="#f59e0b" />
              </View>
              <Text style={styles.summaryNumber}>{summary.cautionCount}</Text>
              <Text style={styles.summaryLabel}>Perlu Ditinjau</Text>
            </View>

            <View style={styles.summaryItem}>
              <View style={[styles.summaryBadge, { backgroundColor: '#ef444420' }]}>
                <Ionicons name="close-circle" size={20} color="#ef4444" />
              </View>
              <Text style={styles.summaryNumber}>{summary.riskyCount}</Text>
              <Text style={styles.summaryLabel}>Tidak Etis</Text>
            </View>
          </View>

          {summary.averageScore > 0 && (
            <View style={styles.averageContainer}>
              <Text style={styles.averageLabel}>Rata-rata Skor Etika</Text>
              <Text style={styles.averageScore}>{summary.averageScore}/100</Text>
            </View>
          )}
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  ctaButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 12,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
  },
  averageContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  averageScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
  },
});