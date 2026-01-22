// app/(tabs)/history.tsx - VERSI DENGAN BACKEND API
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// GANTI DENGAN IP LAPTOP ANDA!
const API_URL = 'http://192.168.1.11:3000/api'; // ⚠️ GANTI IP INI!

interface HistoryItem {
  id: number;
  text: string;
  score: number;
  status: string;
  label: string;
  color: string;
  createdAt?: string;
  created_at?: string;
  timestamp?: string;
  updatedAt?: string;
  updated_at?: string;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, [selectedFilter]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        userId: 'user-001',
        limit: '50',
      });

      if (selectedFilter && selectedFilter !== 'all') {
        params.append('status', selectedFilter);
      }

      const url = `${API_URL}/analysis/history?${params}`;
      console.log('Fetching from URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.status === 'success') {
        setHistory(data.data.history || data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch history');
      }
    } catch (error: any) {
      console.error('Error fetching history:', error.message, error);
      Alert.alert(
        'Error',
        `Gagal memuat riwayat:\n${error.message}\n\nPastikan:\n1. Backend berjalan di ${API_URL}\n2. IP address benar (saat ini: 192.168.1.11)`
      );
      setHistory([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHistory();
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDateField = (item: HistoryItem): string | undefined => {
    return item.createdAt || item.created_at || item.timestamp || item.updated_at || item.updatedAt;
  };

  const getStatusIcon = (status: string) => {
    if (status === 'safe' || status === 'passed') return 'checkmark-circle';
    if (status === 'caution') return 'alert-circle';
    return 'close-circle';
  };

  const renderHistoryItem = (item: HistoryItem) => (
    <TouchableOpacity key={item.id} style={styles.historyCard} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Ionicons name={getStatusIcon(item.status)} size={32} color={item.color} />
          <View style={styles.headerInfo}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.date}>{formatDate(getDateField(item))}</Text>
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={[styles.score, { color: item.color }]}>
            {item.score}/100
          </Text>
        </View>
      </View>

      <Text style={styles.text} numberOfLines={2}>
        {item.text}
      </Text>

      <View style={styles.footer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${item.score}%`, backgroundColor: item.color },
            ]}
          />
        </View>
        <Text style={styles.viewMore}>Lihat Detail →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
        <Text style={styles.title}>Riwayat Analisis</Text>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {[
            { label: 'Semua', value: 'all' },
            { label: 'Etis', value: 'passed' },
            { label: 'Perlu Tinjauan', value: 'caution' },
            { label: 'Tidak Etis', value: 'risky' },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.filterButton,
                selectedFilter === filter.value && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter.value)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.value && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* History List */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={styles.loadingText}>Memuat riwayat...</Text>
          </View>
        ) : history.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={80} color="#475569" />
            <Text style={styles.emptyText}>Belum ada riwayat</Text>
            <Text style={styles.emptySubtext}>
              Analisis konten akan muncul di sini
            </Text>
          </View>
        ) : (
          <View style={styles.historyList}>
            {history.map((item) => renderHistoryItem(item))}
          </View>
        )}

        {/* Stats Summary */}
        {history.length > 0 && (
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Analisis</Text>
              <Text style={styles.statValue}>{history.length}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Rata-rata Skor</Text>
              <Text style={styles.statValue}>
                {Math.round(
                  history.reduce((sum, item) => sum + item.score, 0) / history.length
                )}
              </Text>
            </View>
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
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 12,
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 18,
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  historyList: {
    gap: 12,
    marginBottom: 20,
  },
  historyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  headerInfo: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#64748b',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    gap: 8,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  viewMore: {
    fontSize: 12,
    color: '#3b82f6',
    textAlign: 'right',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3b82f6',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
});
