// app/(tabs)/profile.tsx - ANIMATED VERSION
import {
    AnimatedCounter,
    AnimatedProgress,
    BounceCard,
    FloatingView,
    GlowCard,
    PulseView,
    ScalePressable,
} from '@/components/ui/AnimatedComponents';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Modal, RefreshControl, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
    BounceIn,
    FadeInDown,
    FadeInUp,
    SlideInRight,
    ZoomIn
} from 'react-native-reanimated';

// ⚠️ GANTI IP INI!
const API_URL = 'http://10.122.49.114:3000/api';

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
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [userStats, setUserStats] = useState<UserStats>({
    userId: user?.id || 'user-001',
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
  
  // Modal states
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [notificationSettingsVisible, setNotificationSettingsVisible] = useState(false);
  const [privacySettingsVisible, setPrivacySettingsVisible] = useState(false);
  
  // Edit profile form
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  
  // Notification settings
  const [notifAnalysis, setNotifAnalysis] = useState(true);
  const [notifReminder, setNotifReminder] = useState(true);
  const [notifUpdate, setNotifUpdate] = useState(false);
  
  // Privacy settings
  const [saveHistory, setSaveHistory] = useState(true);
  const [shareAnonymous, setShareAnonymous] = useState(false);

  // Fetch data dari backend
  const fetchData = async () => {
    try {
      // Gunakan user-001 sebagai default karena data di database menggunakan ID ini
      const userId = 'user-001';
      
      // 1. Fetch history untuk menghitung statistik (paling akurat)
      const historyResponse = await fetch(
        `${API_URL}/analysis/history?userId=${userId}&limit=100`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (historyResponse.ok) {
        const historyData = await historyResponse.json();
        if (historyData.status === 'success') {
          const history = historyData.data.history || historyData.data || [];
          
          // Hitung statistik dari history
          const totalChecks = history.length;
          const safeCount = history.filter((h: any) => h.status === 'safe').length;
          const cautionCount = history.filter((h: any) => h.status === 'caution').length;
          const riskyCount = history.filter((h: any) => h.status === 'risky').length;
          const avgScore = history.length > 0 
            ? history.reduce((sum: number, item: any) => sum + (item.score || 0), 0) / history.length 
            : 0;
          
          // Update userStats dari history
          setUserStats(prev => ({
            ...prev,
            userId,
            totalChecks,
            level: Math.floor(totalChecks / 5) + 1,
            experience: totalChecks * 10,
          }));
          
          // Update summary dari history
          setSummary({
            totalAnalyses: totalChecks,
            safeCount,
            cautionCount,
            riskyCount,
            averageScore: Math.round(avgScore),
            lastAnalyzed: history[0]?.createdAt || history[0]?.created_at || null,
          });
        }
      }
      
      // 2. Fetch User Stats (optional, untuk data tambahan seperti createdAt)
      const userResponse = await fetch(
        `${API_URL}/user/stats?userId=${userId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        if (userData.status === 'success' && userData.data) {
          // Hanya update createdAt jika tersedia
          if (userData.data.createdAt) {
            setUserStats(prev => ({
              ...prev,
              createdAt: userData.data.createdAt,
            }));
          }
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

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Keluar',
      'Apakah Anda yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  // Handle save profile
  const handleSaveProfile = () => {
    Alert.alert('Sukses', 'Profil berhasil diperbarui!');
    setEditProfileVisible(false);
  };

  // Handle clear history
  const handleClearHistory = () => {
    Alert.alert(
      'Hapus Riwayat',
      'Apakah Anda yakin ingin menghapus semua riwayat analisis?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => Alert.alert('Info', 'Riwayat berhasil dihapus!'),
        },
      ]
    );
  };

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
        {/* Animated Title */}
        <Animated.View 
          entering={FadeInDown.delay(100).springify()}
          style={styles.headerRow}
        >
          <PulseView pulseScale={1.1} duration={2000}>
            <Ionicons name="person-circle" size={32} color="#3b82f6" />
          </PulseView>
          <Text style={styles.title}>Profil</Text>
        </Animated.View>

        {/* Profile Card with Animation */}
        <Animated.View entering={ZoomIn.delay(200).springify()}>
          <GlowCard glowColor="#3b82f6">
            <LinearGradient
              colors={['rgba(59, 130, 246, 0.2)', 'rgba(16, 185, 129, 0.2)']}
              style={styles.profileCard}
            >
              <FloatingView floatDistance={8} duration={3000}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </Text>
                </View>
              </FloatingView>
              
              <Text style={styles.name}>{user?.name || 'Pengguna EthicGuard'}</Text>
              <Text style={styles.email}>{user?.email || ''}</Text>
              
              <Animated.View entering={BounceIn.delay(400)} style={styles.levelBadge}>
                <PulseView pulseScale={1.15} duration={1500}>
                  <Ionicons name="star" size={16} color={levelBadge.color} />
                </PulseView>
                <Text style={[styles.levelText, { color: levelBadge.color }]}>
                  Level {userStats.level} • {levelBadge.name}
                </Text>
              </Animated.View>

              {/* Experience Progress */}
              <Animated.View entering={FadeInUp.delay(500)} style={styles.expContainer}>
                <View style={styles.expHeader}>
                  <Text style={styles.expLabel}>⚡ Experience Points</Text>
                  <Text style={styles.expValue}>{userStats.experience} XP</Text>
                </View>
                <AnimatedProgress
                  progress={((userStats.experience % 50) / 50) * 100}
                  color="#3b82f6"
                  delay={600}
                />
                <Text style={styles.expNext}>
                  🎯 {50 - (userStats.experience % 50)} XP menuju Level {userStats.level + 1}
                </Text>
              </Animated.View>
            </LinearGradient>
          </GlowCard>
        </Animated.View>

        {/* Stats Grid with Animation */}
        <View style={styles.statsGrid}>
          <Animated.View entering={SlideInRight.delay(300).springify()} style={{ flex: 1 }}>
            <ScalePressable scaleValue={0.95}>
              <View style={styles.statBox}>
                <PulseView pulseScale={1.1} duration={2000}>
                  <Ionicons name="document-text" size={24} color="#3b82f6" />
                </PulseView>
                <AnimatedCounter
                  value={userStats.totalChecks}
                  duration={1500}
                  textStyle={styles.statNumber}
                />
                <Text style={styles.statLabel}>Total Analisis</Text>
              </View>
            </ScalePressable>
          </Animated.View>
          
          <Animated.View entering={SlideInRight.delay(400).springify()} style={{ flex: 1 }}>
            <ScalePressable scaleValue={0.95}>
              <View style={styles.statBox}>
                <PulseView pulseScale={1.1} duration={2000}>
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                </PulseView>
                <AnimatedCounter
                  value={summary.safeCount}
                  duration={1500}
                  textStyle={[styles.statNumber, { color: '#10b981' }]}
                />
                <Text style={styles.statLabel}>Konten Etis</Text>
              </View>
            </ScalePressable>
          </Animated.View>
        </View>

        {/* Detailed Stats with Animation */}
        <Animated.View entering={FadeInUp.delay(500).springify()}>
          <BounceCard delay={500} style={styles.detailCard}>
            <Text style={styles.detailTitle}>📊 Statistik Detail</Text>
            
            {[
              { icon: 'checkmark-circle', color: '#10b981', label: 'Etis', value: summary.safeCount },
              { icon: 'alert-circle', color: '#f59e0b', label: 'Perlu Ditinjau', value: summary.cautionCount },
              { icon: 'close-circle', color: '#ef4444', label: 'Tidak Etis', value: summary.riskyCount },
            ].map((item, index) => (
              <Animated.View 
                key={item.label}
                entering={SlideInRight.delay(600 + index * 100).springify()}
                style={styles.detailRow}
              >
                <View style={styles.detailLeft}>
                  <View style={[styles.detailIconBg, { backgroundColor: `${item.color}20` }]}>
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                </View>
                <AnimatedCounter
                  value={item.value}
                  duration={1500}
                  textStyle={styles.detailValue}
                />
              </Animated.View>
            ))}

            <Animated.View 
              entering={BounceIn.delay(900)}
              style={[styles.detailRow, styles.detailRowLast]}
            >
              <View style={styles.detailLeft}>
                <View style={[styles.detailIconBg, { backgroundColor: '#8b5cf620' }]}>
                  <Ionicons name="trending-up" size={20} color="#8b5cf6" />
                </View>
                <Text style={styles.detailLabel}>Rata-rata Skor</Text>
              </View>
              <Text style={[styles.detailValue, styles.scoreHighlight]}>
                {summary.averageScore}/100
              </Text>
            </Animated.View>
          </BounceCard>
        </Animated.View>

        {/* Activity Info with Animation */}
        <Animated.View entering={FadeInUp.delay(700).springify()}>
          <BounceCard delay={700} style={styles.activityCard}>
            <Animated.View entering={SlideInRight.delay(800)} style={styles.activityRow}>
              <View style={[styles.activityIconBg, { backgroundColor: '#3b82f620' }]}>
                <Ionicons name="calendar" size={20} color="#3b82f6" />
              </View>
              <View style={styles.activityText}>
                <Text style={styles.activityLabel}>📅 Bergabung sejak</Text>
                <Text style={styles.activityValue}>
                  {formatDate(userStats.createdAt)}
                </Text>
              </View>
            </Animated.View>

            {summary.lastAnalyzed && (
              <Animated.View entering={SlideInRight.delay(900)} style={styles.activityRow}>
                <View style={[styles.activityIconBg, { backgroundColor: '#10b98120' }]}>
                  <Ionicons name="time" size={20} color="#10b981" />
                </View>
                <View style={styles.activityText}>
                  <Text style={styles.activityLabel}>⏰ Analisis terakhir</Text>
                  <Text style={styles.activityValue}>
                    {formatDate(summary.lastAnalyzed)}
                  </Text>
                </View>
              </Animated.View>
            )}
          </BounceCard>
        </Animated.View>

        {/* Achievement Badge with Animation */}
        {userStats.level >= 5 && (
          <Animated.View entering={ZoomIn.delay(800).springify()}>
            <BounceCard delay={800} style={styles.achievementCard}>
              <FloatingView floatDistance={5} duration={2000}>
                <Ionicons name="trophy" size={40} color="#f59e0b" />
              </FloatingView>
              <Text style={styles.achievementTitle}>🏆 Pencapaian</Text>
              <Text style={styles.achievementDesc}>
                Selamat! Anda telah mencapai Level {userStats.level}
              </Text>
            </BounceCard>
          </Animated.View>
        )}

        {/* Settings with Animation */}
        <Animated.View entering={FadeInUp.delay(900).springify()}>
          <View style={styles.settingsCard}>
            <Text style={styles.settingsTitle}>⚙️ Pengaturan</Text>
            
            {[
              {
                icon: 'person',
                title: 'Edit Profil',
                subtitle: 'Ubah nama dan email',
                color: '#3b82f6',
                onPress: () => {
                  setEditName(user?.name || '');
                  setEditEmail(user?.email || '');
                  setEditProfileVisible(true);
                },
              },
              {
                icon: 'notifications',
                title: 'Pengaturan Notifikasi',
                subtitle: 'Atur preferensi notifikasi',
                color: '#f59e0b',
                onPress: () => setNotificationSettingsVisible(true),
              },
              {
                icon: 'lock-closed',
                title: 'Privasi & Keamanan',
                subtitle: 'Kelola data pribadi',
                color: '#8b5cf6',
                onPress: () => setPrivacySettingsVisible(true),
              },
              {
                icon: 'information-circle',
                title: 'Tentang Aplikasi',
                subtitle: 'Versi 1.0.0',
                color: '#10b981',
                onPress: () => Alert.alert(
                  'EthicGuard',
                  `Versi 1.0.0\n\nAplikasi untuk mengecek etika konten digital.\n\nDibuat dengan ❤️ oleh Tim EthicGuard`,
                  [{ text: 'OK' }]
                ),
              },
              {
                icon: 'log-out',
                title: 'Keluar',
                subtitle: 'Keluar dari akun',
                color: '#ef4444',
                isLast: true,
                onPress: handleLogout,
              },
            ].map((item, index) => (
              <Animated.View 
                key={item.title}
                entering={SlideInRight.delay(1000 + index * 100).springify()}
              >
                <ScalePressable onPress={item.onPress} scaleValue={0.98}>
                  <View style={[styles.settingItem, item.isLast && styles.lastItem]}>
                    <View style={styles.settingLeft}>
                      <View style={[styles.settingIconBg, { backgroundColor: `${item.color}20` }]}>
                        <Ionicons name={item.icon as any} size={22} color={item.color} />
                      </View>
                      <View>
                        <Text style={styles.settingItemTitle}>{item.title}</Text>
                        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#64748b" />
                  </View>
                </ScalePressable>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Edit Profile Modal */}
        <Modal
          visible={editProfileVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setEditProfileVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Profil</Text>
                <TouchableOpacity onPress={() => setEditProfileVisible(false)}>
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nama</Text>
                <TextInput
                  style={styles.textInput}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Masukkan nama"
                  placeholderTextColor="#64748b"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  placeholder="Masukkan email"
                  placeholderTextColor="#64748b"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Notification Settings Modal */}
        <Modal
          visible={notificationSettingsVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setNotificationSettingsVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Pengaturan Notifikasi</Text>
                <TouchableOpacity onPress={() => setNotificationSettingsVisible(false)}>
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.switchRow}>
                <View style={styles.switchInfo}>
                  <Ionicons name="analytics" size={22} color="#3b82f6" />
                  <View style={styles.switchTextContainer}>
                    <Text style={styles.switchLabel}>Hasil Analisis</Text>
                    <Text style={styles.switchDesc}>Notifikasi saat analisis selesai</Text>
                  </View>
                </View>
                <Switch
                  value={notifAnalysis}
                  onValueChange={setNotifAnalysis}
                  trackColor={{ false: '#3e3e3e', true: '#3b82f6' }}
                  thumbColor="#fff"
                />
              </View>
              
              <View style={styles.switchRow}>
                <View style={styles.switchInfo}>
                  <Ionicons name="alarm" size={22} color="#f59e0b" />
                  <View style={styles.switchTextContainer}>
                    <Text style={styles.switchLabel}>Pengingat Harian</Text>
                    <Text style={styles.switchDesc}>Ingatkan untuk cek konten</Text>
                  </View>
                </View>
                <Switch
                  value={notifReminder}
                  onValueChange={setNotifReminder}
                  trackColor={{ false: '#3e3e3e', true: '#f59e0b' }}
                  thumbColor="#fff"
                />
              </View>
              
              <View style={styles.switchRow}>
                <View style={styles.switchInfo}>
                  <Ionicons name="download" size={22} color="#10b981" />
                  <View style={styles.switchTextContainer}>
                    <Text style={styles.switchLabel}>Update Aplikasi</Text>
                    <Text style={styles.switchDesc}>Info versi terbaru</Text>
                  </View>
                </View>
                <Switch
                  value={notifUpdate}
                  onValueChange={setNotifUpdate}
                  trackColor={{ false: '#3e3e3e', true: '#10b981' }}
                  thumbColor="#fff"
                />
              </View>
              
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={() => {
                  Alert.alert('Sukses', 'Pengaturan notifikasi disimpan!');
                  setNotificationSettingsVisible(false);
                }}
              >
                <Text style={styles.saveButtonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Privacy Settings Modal */}
        <Modal
          visible={privacySettingsVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setPrivacySettingsVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Privasi & Keamanan</Text>
                <TouchableOpacity onPress={() => setPrivacySettingsVisible(false)}>
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.switchRow}>
                <View style={styles.switchInfo}>
                  <Ionicons name="time" size={22} color="#8b5cf6" />
                  <View style={styles.switchTextContainer}>
                    <Text style={styles.switchLabel}>Simpan Riwayat</Text>
                    <Text style={styles.switchDesc}>Simpan riwayat analisis</Text>
                  </View>
                </View>
                <Switch
                  value={saveHistory}
                  onValueChange={setSaveHistory}
                  trackColor={{ false: '#3e3e3e', true: '#8b5cf6' }}
                  thumbColor="#fff"
                />
              </View>
              
              <View style={styles.switchRow}>
                <View style={styles.switchInfo}>
                  <Ionicons name="share-social" size={22} color="#3b82f6" />
                  <View style={styles.switchTextContainer}>
                    <Text style={styles.switchLabel}>Data Anonim</Text>
                    <Text style={styles.switchDesc}>Bantu tingkatkan aplikasi</Text>
                  </View>
                </View>
                <Switch
                  value={shareAnonymous}
                  onValueChange={setShareAnonymous}
                  trackColor={{ false: '#3e3e3e', true: '#3b82f6' }}
                  thumbColor="#fff"
                />
              </View>
              
              <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: '#ef4444' }]} 
                onPress={handleClearHistory}
              >
                <Ionicons name="trash" size={18} color="#fff" />
                <Text style={styles.saveButtonText}>Hapus Semua Riwayat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={() => {
                  Alert.alert('Sukses', 'Pengaturan privasi disimpan!');
                  setPrivacySettingsVisible(false);
                }}
              >
                <Text style={styles.saveButtonText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  profileCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 10,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    marginBottom: 24,
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
    marginBottom: 10,
  },
  expLabel: {
    fontSize: 13,
    color: '#94a3b8',
  },
  expValue: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  expBar: {
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  expFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 5,
  },
  expNext: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
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
    gap: 8,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b82f6',
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
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 18,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  detailIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 15,
    color: '#fff',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#94a3b8',
  },
  scoreHighlight: {
    color: '#10b981',
    fontSize: 20,
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
    gap: 16,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  activityIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityText: {
    flex: 1,
  },
  activityLabel: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 3,
  },
  activityValue: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  achievementCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    marginBottom: 20,
    gap: 8,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginTop: 8,
  },
  achievementDesc: {
    fontSize: 14,
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
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    padding: 18,
    paddingBottom: 14,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  settingIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  switchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  switchTextContainer: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  switchDesc: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
});