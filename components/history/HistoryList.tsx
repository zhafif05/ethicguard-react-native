import Animated, { Layout } from 'react-native-reanimated';
import { styles } from '../../styles/historyStyles';
import { SlideInItem } from '../ui/AnimatedComponents';
import HistoryItemCard from './HistoryItemCard';

export default function HistoryList({ history, formatDate, getDateField }: any) {
  return (
    <Animated.View 
      layout={Layout.springify()}
      style={styles.historyList}
    >
      {history.map((item: any, index: number) => (
        <SlideInItem key={item.id} index={index}>
          <HistoryItemCard
            item={item}
            formatDate={formatDate}
            getDateField={getDateField}
            index={index}
          />
        </SlideInItem>
      ))}
    </Animated.View>
  );
}
