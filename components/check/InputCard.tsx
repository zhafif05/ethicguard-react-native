import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/checkStyles';

export default function InputCard({ text, setText, analyzing, onAnalyze }: any) {
  return (
    <View style={styles.inputCard}>
      <Text style={styles.label}>Masukkan caption, komentar, atau status</Text>

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={6}
        value={text}
        onChangeText={setText}
        placeholder="Contoh: Hari ini saya sangat senang..."
        placeholderTextColor="#64748b"
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={[styles.button, (!text.trim() || analyzing) && styles.buttonDisabled]}
        onPress={onAnalyze}
        disabled={!text.trim() || analyzing}
      >
        <LinearGradient
          colors={analyzing ? ['#475569', '#475569'] : ['#3b82f6', '#10b981']}
          style={styles.buttonGradient}
        >
          {analyzing ? (
            <>
              <ActivityIndicator color="#fff" />
              <Text style={styles.buttonText}>Menganalisis...</Text>
            </>
          ) : (
            <>
              <Ionicons name="search" size={20} color="#fff" />
              <Text style={styles.buttonText}>Analisis dengan AI</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
