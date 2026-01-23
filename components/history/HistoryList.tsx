import { View } from 'react-native';
import HistoryItemCard from './HistoryItemCard';
import { styles } from '../../styles/historyStyles';

export default function HistoryList({ history, formatDate, getDateField }: any) {
  return (
    <View style={styles.historyList}>
      {history.map((item: any) => (
        <HistoryItemCard
          key={item.id}
          item={item}
          formatDate={formatDate}
          getDateField={getDateField}
        />
      ))}
    </View>
  );
}
