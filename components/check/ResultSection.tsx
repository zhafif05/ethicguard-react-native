import { View } from 'react-native';
import StatusCard from './StatusCard';
import WarningCard from './WarningCard';
import RecommendationCard from './RecommendationCard';
import ImpactCard from './ImpactCard';
import SuggestionsCard from './SuggestionsCard';
import { styles } from '../../styles/checkStyles';

export default function ResultSection({ result }: any) {
  return (
    <View style={styles.resultsContainer}>
      <StatusCard result={result} />
      {result.warnings?.length > 0 && <WarningCard warnings={result.warnings} />}
      {result.recommendations?.length > 0 && (
        <RecommendationCard recommendations={result.recommendations} />
      )}
      <ImpactCard impact={result.impact} />
      {result.suggestions?.length > 0 && (
        <SuggestionsCard suggestions={result.suggestions} />
      )}
    </View>
  );
}
