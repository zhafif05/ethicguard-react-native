import { Text, View } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { styles } from '../../styles/historyStyles';
import { ScalePressable } from '../ui/AnimatedComponents';

const filters = [
  { label: '📋 Semua', value: 'all', color: '#3b82f6' },
  { label: '✅ Etis', value: 'safe', color: '#10b981' },
  { label: '⚠️ Tinjauan', value: 'caution', color: '#f59e0b' },
  { label: '❌ Tidak Etis', value: 'risky', color: '#ef4444' },
];

export default function FilterButtons({ selectedFilter, onSelect }: any) {
  return (
    <Animated.View 
      entering={FadeInDown.delay(100).springify()}
      layout={Layout.springify()}
      style={styles.filterContainer}
    >
      {filters.map((filter, index) => (
        <Animated.View
          key={filter.value}
          entering={FadeInDown.delay(150 + index * 50).springify()}
        >
          <ScalePressable
            onPress={() => onSelect(filter.value)}
            scaleValue={0.93}
          >
            <View
              style={[
                styles.filterButton,
                selectedFilter === filter.value && [
                  styles.filterButtonActive,
                  { borderColor: filter.color, backgroundColor: `${filter.color}20` }
                ],
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.value && [
                    styles.filterTextActive,
                    { color: filter.color }
                  ],
                ]}
              >
                {filter.label}
              </Text>
            </View>
          </ScalePressable>
        </Animated.View>
      ))}
    </Animated.View>
  );
}
