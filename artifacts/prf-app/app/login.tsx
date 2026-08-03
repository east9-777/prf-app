import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const trimmed = username.trim();
    if (trimmed.length < 2) {
      setError('Digite um nome com pelo menos 2 caracteres.');
      return;
    }
    setLoading(true);
    setError('');
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await signIn(trimmed);
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            {
              paddingTop: insets.top + (Platform.OS === 'web' ? 67 : 60),
              paddingBottom: insets.bottom + 40,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoSection}>
            <Image
              source={require('@/assets/images/prf-badge.jpg')}
              style={styles.badgeImage}
              resizeMode="contain"
            />
            <Text style={[styles.appName, { color: colors.text }]}>
              Project <Text style={{ color: colors.primary }}>P.R.F</Text>
            </Text>
            <Text style={[styles.appSubtitle, { color: colors.mutedForeground }]}>
              Preparatório para o concurso da{'\n'}Polícia Rodoviária Federal
            </Text>
          </View>

          {/* Form */}
          <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.formTitle, { color: colors.text }]}>Entrar no app</Text>
            <Text style={[styles.formSubtitle, { color: colors.mutedForeground }]}>
              Digite um nome de usuário para começar seus estudos
            </Text>

            <View style={[styles.inputWrap, { borderColor: error ? '#C62828' : colors.border, backgroundColor: colors.background }]}>
              <Feather name="user" size={16} color={colors.mutedForeground} />
              <TextInput
                value={username}
                onChangeText={(t) => { setUsername(t); setError(''); }}
                placeholder="Seu nome de usuário"
                placeholderTextColor={colors.mutedForeground}
                style={[styles.input, { color: colors.text }]}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>
            {error.length > 0 && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <Pressable
              style={({ pressed }) => [
                styles.loginBtn,
                { backgroundColor: colors.primary, opacity: pressed || loading ? 0.8 : 1 },
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginBtnText}>
                {loading ? 'Entrando...' : 'Começar estudar'}
              </Text>
              {!loading && <Feather name="arrow-right" size={18} color="#FFFFFF" />}
            </Pressable>
          </View>

          {/* Features */}
          <View style={styles.features}>
            {[
              { icon: 'layers', text: 'Aulas completas com exemplos e exercícios' },
              { icon: 'clipboard', text: 'Simulados estilo CEBRASPE' },
              { icon: 'book-open', text: 'Acompanhe seu progresso por matéria' },
            ].map((f) => (
              <View key={f.text} style={styles.featureRow}>
                <View style={[styles.featureIcon, { backgroundColor: colors.primary + '18' }]}>
                  <Feather name={f.icon as any} size={14} color={colors.primary} />
                </View>
                <Text style={[styles.featureText, { color: colors.mutedForeground }]}>{f.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24, gap: 28 },
  logoSection: { alignItems: 'center', gap: 12 },
  badgeImage: {
    width: 140,
    height: 140,
    borderRadius: 16,
  },
  appName: { fontFamily: 'Inter_700Bold', fontSize: 30, letterSpacing: -0.5 },
  appSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  formCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    gap: 14,
  },
  formTitle: { fontFamily: 'Inter_700Bold', fontSize: 18 },
  formSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 18 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 15 },
  errorText: { color: '#C62828', fontFamily: 'Inter_400Regular', fontSize: 12 },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 4,
  },
  loginBtnText: { fontFamily: 'Inter_600SemiBold', fontSize: 16, color: '#FFFFFF' },
  features: { gap: 10 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureIcon: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  featureText: { fontFamily: 'Inter_400Regular', fontSize: 13, flex: 1 },
});
