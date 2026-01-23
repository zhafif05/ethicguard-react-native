import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  gradient: { flex: 1, padding: 20, paddingTop: 20, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },

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
  filterTextActive: { color: '#fff' },

  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  loadingText: { color: '#94a3b8', marginTop: 12, fontSize: 14 },

  emptyState: { alignItems: 'center', marginTop: 80 },
  emptyText: {
    fontSize: 18,
    color: '#94a3b8',
    fontWeight: '600',
    marginTop: 20,
  },
  emptySubtext: { fontSize: 14, color: '#64748b', marginTop: 8 },

  historyList: { gap: 12, marginBottom: 20 },
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
  headerLeft: { flexDirection: 'row', gap: 12, flex: 1 },
  headerInfo: { flex: 1 },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  date: { fontSize: 12, color: '#64748b' },

  scoreContainer: { alignItems: 'flex-end' },
  score: { fontSize: 18, fontWeight: 'bold' },

  text: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    marginBottom: 12,
  },

  footer: { gap: 8 },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },

  viewMore: { fontSize: 12, color: '#3b82f6', textAlign: 'right' },

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
  statLabel: { fontSize: 12, color: '#94a3b8', marginBottom: 8 },
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#3b82f6' },
});
