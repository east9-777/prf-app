import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { useColors } from '@/hooks/useColors';
import { CONTEUDO_SUBJECTS } from '@/lib/conteudoData';

const QUICK_ACCESS = [
  { icon: 'book-open' as const, title: 'Estudos', desc: 'Acompanhe seu progresso', route: '/(tabs)/estudos', color: '#1565C0' },
  { icon: 'layers' as const, title: 'Aulas', desc: 'Teoria completa e exemplos', route: '/(tabs)/aulas', color: '#7B1FA2' },
  { icon: 'clipboard' as const, title: 'Simulados', desc: 'Teste seus conhecimentos', route: '/(tabs)/simulados', color: '#1B5E20' },
];

const STATS = [
  { label: 'Matérias', value: String(CONTEUDO_SUBJECTS.length) },
  {
    label: 'Tópicos',
    value: String(CONTEUDO_SUBJECTS.reduce((a, s) => a + s.topics.length, 0)),
  },
  { label: 'Simulados', value: '5' },
];

export default function InicioScreen() {
  const colors = useColors();
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const topPadding = insets.top + (Platform.OS === 'web' ? 67 : 12);
  const bottomPadding = insets.bottom + (Platform.OS === 'web' ? 34 : 16);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingTop: topPadding, paddingBottom: bottomPadding + 60 }]}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.greeting, { color: colors.mutedForeground }]}>
              Olá, {user?.username ?? 'candidato'} 👋
            </Text>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Project{' '}
              <Text style={{ color: colors.primary }}>P.R.F</Text>
            </Text>
          </View>
          <View style={[styles.badgeCircle, { backgroundColor: colors.primary + '20' }]}>
            <Feather name="shield" size={26} color={colors.primary} />
          </View>
        </View>

        {/* Stats */}
        <View style={[styles.statsRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.primary }]}>{s.value}</Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
              </View>
              {i < STATS.length - 1 && (
                <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Quick Access */}
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
          ACESSO RÁPIDO
        </Text>
        {QUICK_ACCESS.map((item) => (
          <Pressable
            key={item.title}
            style={({ pressed }) => [
              styles.quickCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: pressed ? 0.88 : 1,
              },
            ]}
            onPress={() => router.push(item.route as any)}
          >
            <View style={[styles.quickIcon, { backgroundColor: item.color + '18' }]}>
              <Feather name={item.icon} size={22} color={item.color} />
            </View>
            <View style={styles.quickInfo}>
              <Text style={[styles.quickTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.quickDesc, { color: colors.mutedForeground }]}>{item.desc}</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
          </Pressable>
        ))}

        {/* Tip */}
        <View style={[styles.tipCard, { backgroundColor: colors.primary + '12', borderColor: colors.primary + '30' }]}>
          <Feather name="info" size={16} color={colors.primary} />
          <Text style={[styles.tipText, { color: colors.primary }]}>
            Dica: comece pelas{' '}
            <Text style={{ fontFamily: 'Inter_600SemiBold' }}>Aulas</Text> para estudar o
            conteúdo com exemplos e exercícios, depois teste no{' '}
            <Text style={{ fontFamily: 'Inter_600SemiBold' }}>Simulado</Text>.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 16, gap: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  greeting: { fontFamily: 'Inter_400Regular', fontSize: 13 },
  headerTitle: { fontFamily: 'Inter_700Bold', fontSize: 26, letterSpacing: -0.5, marginTop: 2 },
  badgeCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  statsRow: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  statItem: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { fontFamily: 'Inter_700Bold', fontSize: 22 },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 11 },
  statDivider: { width: 1, height: 36 },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 8,
    marginLeft: 2,
  },
  quickCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  quickIcon: { width: 46, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  quickInfo: { flex: 1, gap: 3 },
  quickTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 15 },
  quickDesc: { fontFamily: 'Inter_400Regular', fontSize: 12 },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
  },
  tipText: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19 },
});
