import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  gradient: { flex: 1, padding: 20, paddingTop: 20, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },

  // =============== FILTER BUTTONS ===============
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  filterButtonActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f620',
  },
  filterText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  filterTextActive: { color: '#3b82f6' },

  // =============== LOADING STATE ===============
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    gap: 12,
  },
  loadingIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600',
    marginTop: 16,
  },
  loadingSubtext: {
    color: '#64748b',
    fontSize: 13,
  },

  // =============== EMPTY STATE ===============
  emptyState: { 
    alignItems: 'center', 
    marginTop: 60,
    padding: 20,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: { 
    fontSize: 14, 
    color: '#64748b', 
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // =============== HISTORY LIST ===============
  historyList: { gap: 12, marginBottom: 20 },
  historyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: { 
    flexDirection: 'row', 
    gap: 12, 
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: { flex: 1 },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  date: { fontSize: 12, color: '#64748b' },

  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  score: { fontSize: 20, fontWeight: 'bold' },
  scoreMax: { fontSize: 12, color: '#64748b' },

  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
    fontStyle: 'italic',
  },

  footer: { gap: 10 },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },
  viewMore: { 
    fontSize: 13, 
    color: '#3b82f6', 
    fontWeight: '600',
  },

  // =============== STATS SUMMARY ===============
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 10,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
  },
  statBoxInner: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: { 
    fontSize: 11, 
    color: '#94a3b8', 
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#3b82f6' },
  
  miniStatsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  miniStat: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  miniStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  miniStatLabel: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
  },
});
