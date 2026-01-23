import { ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileCard from '@/components/profile/ProfileCard';
import StatsGrid from '@/components/profile/StatsGrid';
import DetailStatsCard from '@/components/profile/DetailStatsCard';
import ActivityCard from '@/components/profile/ActivityCard';
import AchievementCard from '@/components/profile/AchievementCard';
import SettingsCard from '@/components/profile/SettingsCard';
import { styles } from '@/styles/profileStyles';

const API_URL = 'http://192.168.1.11:3000/api';

export default function ProfileScreen() {
  const [userStats, setUserStats] = useState({
    userId: 'user-001',
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

  const fetchData = async () => {
    try {
      const userRes = await fetch(`${API_URL}/user/stats?userId=user-001`);
      if (userRes.ok) {
        const json = await userRes.json();
        if (json.status === 'success') setUserStats(json.data);
      }

      const summaryRes = await fetch(
        `${API_URL}/analysis/stats/summary?userId=user-001`
      );
      if (summaryRes.ok) {
        const json = await summaryRes.json();
        if (json.status === 'success') setSummary(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
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
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.gradient}>
        <ProfileHeader />
        <ProfileCard userStats={userStats} />
        <StatsGrid userStats={userStats} summary={summary} />
        <DetailStatsCard summary={summary} />
        <ActivityCard userStats={userStats} summary={summary} />
        {userStats.level >= 5 && <AchievementCard level={userStats.level} />}
        <SettingsCard />
      </LinearGradient>
    </ScrollView>
  );
}
