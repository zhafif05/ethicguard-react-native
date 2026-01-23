import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/historyStyles';

export default function FilterButtons({ selectedFilter, onSelect }: any) {
  const filters = [
    { label: 'Semua', value: 'all' },
    { label: 'Etis', value: 'safe' },
    { label: 'Perlu Tinjauan', value: 'caution' },
    { label: 'Tidak Etis', value: 'risky' },
  ];

  return (
    <View style={styles.filterContainer}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.value}
          style={[
            styles.filterButton,
            selectedFilter === filter.value && styles.filterButtonActive,
          ]}
          onPress={() => onSelect(filter.value)}
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
  );
}
