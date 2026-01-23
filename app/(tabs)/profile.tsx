// app/(tabs)/profile.tsx - FIXED VERSION
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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

export default function ProfileScreen() {
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
      console.error('Error fetching profile data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Refresh setiap kali tab dibuka
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  // Format tanggal
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Belum ada analisis';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Get level badge
  const getLevelBadge = (level: number) => {
    if (level >= 10) return { name: 'Master Guardian', color: '#f59e0b' };
    if (level >= 7) return { name: 'Advanced', color: '#8b5cf6' };
    if (level >= 4) return { name: 'Intermediate', color: '#3b82f6' };
    if (level >= 2) return { name: 'Beginner', color: '#10b981' };
    return { name: 'Novice', color: '#94a3b8' };
  };

  const levelBadge = getLevelBadge(userStats.level);

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
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
        <Text style={styles.title}>Profil</Text>

        {/* Profile Card */}
        <LinearGradient
          colors={['rgba(59, 130, 246, 0.2)', 'rgba(16, 185, 129, 0.2)']}
          style={styles.profileCard}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
          <Text style={styles.name}>Pengguna EthicGuard</Text>
          <View style={styles.levelBadge}>
            <Ionicons name="star" size={16} color={levelBadge.color} />
            <Text style={[styles.levelText, { color: levelBadge.color }]}>
              Level {userStats.level} • {levelBadge.name}
            </Text>
          </View>

          {/* Experience Progress */}
          <View style={styles.expContainer}>
            <View style={styles.expHeader}>
              <Text style={styles.expLabel}>Experience Points</Text>
              <Text style={styles.expValue}>{userStats.experience} XP</Text>
            </View>
            <View style={styles.expBar}>
              <View 
                style={[
                  styles.expFill, 
                  { width: `${((userStats.experience % 50) / 50) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.expNext}>
              {50 - (userStats.experience % 50)} XP menuju Level {userStats.level + 1}
            </Text>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Ionicons name="document-text" size={24} color="#3b82f6" />
            <Text style={styles.statNumber}>{userStats.totalChecks}</Text>
            <Text style={styles.statLabel}>Total Analisis</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="checkmark-circle" size={24} color="#10b981" />
            <Text style={styles.statNumber}>{summary.safeCount}</Text>
            <Text style={styles.statLabel}>Konten Etis</Text>
          </View>
        </View>

        {/* Detailed Stats */}
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Statistik Detail</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              <Text style={styles.detailLabel}>Etis</Text>
            </View>
            <Text style={styles.detailValue}>{summary.safeCount}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="alert-circle" size={20} color="#f59e0b" />
              <Text style={styles.detailLabel}>Perlu Ditinjau</Text>
            </View>
            <Text style={styles.detailValue}>{summary.cautionCount}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Ionicons name="close-circle" size={20} color="#ef4444" />
              <Text style={styles.detailLabel}>Tidak Etis</Text>
            </View>
            <Text style={styles.detailValue}>{summary.riskyCount}</Text>
          </View>

          <View style={[styles.detailRow, styles.detailRowLast]}>
            <View style={styles.detailLeft}>
              <Ionicons name="trending-up" size={20} color="#8b5cf6" />
              <Text style={styles.detailLabel}>Rata-rata Skor</Text>
            </View>
            <Text style={[styles.detailValue, styles.scoreHighlight]}>
              {summary.averageScore}/100
            </Text>
          </View>
        </View>

        {/* Activity Info */}
        <View style={styles.activityCard}>
          <View style={styles.activityRow}>
            <Ionicons name="calendar" size={20} color="#94a3b8" />
            <View style={styles.activityText}>
              <Text style={styles.activityLabel}>Bergabung sejak</Text>
              <Text style={styles.activityValue}>
                {formatDate(userStats.createdAt)}
              </Text>
            </View>
          </View>

          {summary.lastAnalyzed && (
            <View style={styles.activityRow}>
              <Ionicons name="time" size={20} color="#94a3b8" />
              <View style={styles.activityText}>
                <Text style={styles.activityLabel}>Analisis terakhir</Text>
                <Text style={styles.activityValue}>
                  {formatDate(summary.lastAnalyzed)}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Achievement Badge (if any) */}
        {userStats.level >= 5 && (
          <View style={styles.achievementCard}>
            <Ionicons name="trophy" size={32} color="#f59e0b" />
            <Text style={styles.achievementTitle}>Pencapaian</Text>
            <Text style={styles.achievementDesc}>
              Selamat! Anda telah mencapai Level {userStats.level}
            </Text>
          </View>
        )}

        {/* Settings */}
        <View style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>Pengaturan</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => Alert.alert('Info', 'Fitur notifikasi akan segera hadir!')}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={24} color="#3b82f6" />
              <View>
                <Text style={styles.settingItemTitle}>Pengaturan Notifikasi</Text>
                <Text style={styles.settingSubtitle}>Atur preferensi notifikasi</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => Alert.alert('Info', 'Fitur privasi akan segera hadir!')}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="lock-closed" size={24} color="#3b82f6" />
              <View>
                <Text style={styles.settingItemTitle}>Privasi & Keamanan</Text>
                <Text style={styles.settingSubtitle}>Kelola data pribadi</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, styles.lastItem]}
            onPress={() => Alert.alert(
              'EthicGuard',
              `Versi 1.0.0\n\nPengembang: Tim EthicGuard\n\nTerima kasih telah menggunakan aplikasi kami!`,
              [{ text: 'OK' }]
            )}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="information-circle" size={24} color="#3b82f6" />
              <View>
                <Text style={styles.settingItemTitle}>Tentang Aplikasi</Text>
                <Text style={styles.settingSubtitle}>Versi 1.0.0</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </TouchableOpacity>
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
  profileCard: {
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    marginBottom: 20,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  expContainer: {
    width: '100%',
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  expLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  expValue: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  expBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  expFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  expNext: {
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#fff',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  scoreHighlight: {
    color: '#10b981',
    fontSize: 18,
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
    gap: 12,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityText: {
    flex: 1,
  },
  activityLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 2,
  },
  activityValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  achievementCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    marginBottom: 20,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginTop: 8,
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 13,
    color: '#fbbf24',
    textAlign: 'center',
  },
  settingsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
    paddingBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
});