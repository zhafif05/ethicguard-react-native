import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  gradient: { flex: 1, padding: 20, paddingTop: 20, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },

  inputCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  label: { color: '#94a3b8', fontSize: 14, marginBottom: 12 },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    minHeight: 120,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },

  button: { borderRadius: 12, overflow: 'hidden' },
  buttonDisabled: { opacity: 0.5 },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  resultsContainer: { gap: 16 },

  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
  },
  statusLabel: { fontSize: 24, fontWeight: 'bold', marginTop: 16 },

  scoreContainer: { width: '100%', marginTop: 24 },
  scoreHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  scoreText: { color: '#94a3b8', fontSize: 14 },
  scoreNumber: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 6 },

  detailsContainer: {
    width: '100%',
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
  },
  detailsText: { color: '#94a3b8', fontSize: 12, marginBottom: 4 },

  warningCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  warningHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  warningTitle: { color: '#f59e0b', fontSize: 16, fontWeight: 'bold' },
  warningText: { color: '#fbbf24', fontSize: 14, lineHeight: 20 },

  recommendCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  recommendHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  recommendTitle: { color: '#3b82f6', fontSize: 16, fontWeight: 'bold' },
  recommendText: { color: '#93c5fd', fontSize: 14, lineHeight: 20 },

  impactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  impactTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  impactText: { color: '#94a3b8', fontSize: 14, lineHeight: 20 },

  suggestionsCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  suggestionsTitle: { color: '#10b981', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  suggestionItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16, 185, 129, 0.2)',
  },
  suggestionCategory: { color: '#34d399', fontSize: 14, fontWeight: 'bold' },
  suggestionIssue: { color: '#94a3b8', fontSize: 13 },
  suggestionText: { color: '#a7f3d0', fontSize: 13 },
});
