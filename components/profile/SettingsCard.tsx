import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/profileStyles';

export default function SettingsCard() {
  const items = [
    { label: 'Edit Profil', icon: 'person-outline' },
    { label: 'Pengaturan Notifikasi', icon: 'notifications-outline' },
    { label: 'Tentang Aplikasi', icon: 'information-circle-outline' },
    { label: 'Keluar', icon: 'log-out-outline', danger: true },
  ];

  return (
    <View style={styles.settingsCard}>
      <Text style={styles.cardTitle}>Pengaturan</Text>

      {items.map((item, i) => (
        <TouchableOpacity key={i} style={styles.settingItem}>
          <Ionicons
            name={item.icon as any}
            size={20}
            color={item.danger ? '#ef4444' : '#e5e7eb'}
          />
          <Text
            style={[
              styles.settingText,
              item.danger && { color: '#ef4444' },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
