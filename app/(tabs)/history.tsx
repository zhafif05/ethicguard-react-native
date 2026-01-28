import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import EmptyState from '../../components/history/EmptyState';
import FilterButtons from '../../components/history/FilterButtons';
import HistoryList from '../../components/history/HistoryList';
import LoadingState from '../../components/history/LoadingState';
import StatsSummary from '../../components/history/StatsSummary';
import { PulseView } from '../../components/ui/AnimatedComponents';
import { styles } from '../../styles/historyStyles';

const API_URL = 'http://10.122.49.114:3000/api';

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);
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

      // Get auth token
      const token = await AsyncStorage.getItem('authToken');

      const res = await fetch(`${API_URL}/analysis/history?${params}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });
      const data = await res.json();

      if (data.status === 'success') {
        setHistory(data.data.history || data.data || []);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      Alert.alert('Error', 'Gagal memuat riwayat');
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

  const getDateField = (item: any) =>
    item.createdAt ||
    item.created_at ||
    item.timestamp ||
    item.updated_at ||
    item.updatedAt;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
        {/* Animated Title */}
        <Animated.View 
          entering={FadeInDown.delay(100).springify()}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 }}
        >
          <PulseView pulseScale={1.1} duration={2000}>
            <Ionicons name="time" size={28} color="#3b82f6" />
          </PulseView>
          <Text style={styles.title}>Riwayat Analisis</Text>
        </Animated.View>

        <FilterButtons
          selectedFilter={selectedFilter}
          onSelect={setSelectedFilter}
        />

        {loading ? (
          <LoadingState />
        ) : history.length === 0 ? (
          <EmptyState />
        ) : (
          <HistoryList
            history={history}
            formatDate={formatDate}
            getDateField={getDateField}
          />
        )}

        {history.length > 0 && <StatsSummary history={history} />}
      </LinearGradient>
    </ScrollView>
  );
}
