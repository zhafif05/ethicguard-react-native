import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import FeatureCards from '@/components/home/FeatureCards';
import HeroSection from '@/components/home/HeroSection';
import SummaryStatsCard from '@/components/home/SummaryStatsCard';
import UserStatsCard from '@/components/home/UserStatsCard';
import { useAuth } from '@/contexts/AuthContext';
import { styles } from '@/styles/homeStyles';

const API_URL = 'http://10.122.49.114:3000/api';

export default function HomeScreen() {
  const { user } = useAuth();
  
  const [userStats, setUserStats] = useState({
    userId: user?.id || 'user-001',
    totalChecks: 0,
    level: 1,
    experience: 0,
    createdAt: '',
  });

  const [summary, setSummary] = useState({
    totalAnalyses: 0,
    safeCount: 0,
    cautionCount: 0,
    riskyCount: 0,
    averageScore: 0,
    lastAnalyzed: null,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Gunakan user-001 sebagai default karena data di database menggunakan ID ini
      const userId = 'user-001';
      
      // Get auth token
      const token = await AsyncStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      };
      
      // 1. Fetch history untuk menghitung statistik
      const historyRes = await fetch(`${API_URL}/analysis/history?userId=${userId}&limit=100`, { headers });
      if (historyRes.ok) {
        const historyJson = await historyRes.json();
        if (historyJson.status === 'success') {
          const history = historyJson.data.history || historyJson.data || [];
          
          // Hitung statistik dari history
          const totalChecks = history.length;
          const safeCount = history.filter((h: any) => h.status === 'safe').length;
          const cautionCount = history.filter((h: any) => h.status === 'caution').length;
          const riskyCount = history.filter((h: any) => h.status === 'risky').length;
          const avgScore = history.length > 0 
            ? history.reduce((sum: number, item: any) => sum + (item.score || 0), 0) / history.length 
            : 0;
          
          // Update userStats
          setUserStats(prev => ({
            ...prev,
            userId,
            totalChecks,
            level: Math.floor(totalChecks / 5) + 1,
            experience: totalChecks * 10,
          }));
          
          // Update summary
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
      
      // 2. Coba fetch dari user/stats juga (jika ada data tambahan)
      const userRes = await fetch(`${API_URL}/user/stats?userId=${userId}`, { headers });
      if (userRes.ok) {
        const json = await userRes.json();
        if (json.status === 'success' && json.data) {
          // Hanya update jika data dari API lebih lengkap
          const apiData = json.data;
          if (apiData.totalChecks > 0 || apiData.experience > 0) {
            setUserStats(prev => ({
              ...prev,
              ...apiData,
            }));
          }
        }
      }

      const summaryRes = await fetch(
        `${API_URL}/analysis/stats/summary?userId=user-001`,
        { headers }
      );
      if (summaryRes.ok) {
        const json = await summaryRes.json();
        if (json.status === 'success' && json.data) {
          // Hanya update jika data dari API lebih lengkap
          const apiData = json.data;
          if (apiData.totalAnalyses > 0) {
            setSummary(prev => ({
              ...prev,
              ...apiData,
            }));
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchData();
          }}
          tintColor="#3b82f6"
          colors={['#3b82f6']}
        />
      }
    >
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#0f172a']}
        style={styles.gradient}
      >
        <HeroSection />
        <FeatureCards />
        <UserStatsCard userStats={userStats} loading={loading} />
        <SummaryStatsCard />
      </LinearGradient>
    </ScrollView>
  );
}
