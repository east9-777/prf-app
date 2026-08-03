import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { MOCK_SIMULADOS } from '@/lib/mockData';
import { getData, STORAGE_KEYS } from '@/lib/storage';
import type { Simulado, SimuladoResult } from '@/lib/types';

export default function SimuladosScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [results, setResults] = useState<SimuladoResult[]>([]);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoaded(false);
      getData<SimuladoResult[]>(STORAGE_KEYS.SIMULADO_RESULTS).then((r) => {
        setResults(r ?? []);
        setLoaded(true);
      });
    }, [])
  );

  const stats = useMemo(() => {
    const completed = results.length;
    const avg =
      completed > 0
        ? Math.round(
            (results.reduce((sum, r) => sum + r.score / r.total, 0) / completed) * 100
          )
        : 0;
    return { completed, avg };
  }, [results]);

  const getResult = (id: string) => results.find((r) => r.simuladoId === id);

  const topPadding = insets.top + (Platform.OS === 'web' ? 67 : 12);

  const renderItem = ({ item }: { item: Simulado }) => {
    const result = getResult(item.id);
    const pct = result ? Math.round((result.score / result.total) * 100) : null;
    const scoreColor = pct === null ? colors.primary : pct >= 70 ? '#2E7D32' : pct >= 50 ? '#E65100' : '#C62828';

    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.92 : 1 },
        ]}
        onPress={() => router.push(`/simulado/${item.id}` as any)}
      >
        <View style={styles.cardTop}>
          <View style={[styles.iconBox, { backgroundColor: scoreColor + '18' }]}>
            <Feather name="clipboard" size={20} color={scoreColor} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>
              {item.description}
            </Text>
          </View>
        </View>
        <View style={[styles.cardMeta, { borderTopColor: colors.border }]}>
          <View style={styles.metaItem}>
            <Feather name="list" size={13} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
              {item.questions.length} questões
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="clock" size={13} color={colors.mutedForeground} />
            <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
              {item.timeLimit} min
            </Text>
          </View>
          <View style={[styles.resultBadge, { backgroundColor: scoreColor + '18' }]}>
            <Text style={[styles.resultText, { color: scoreColor }]}>
              {pct !== null ? `${pct}% — Refazer` : 'Iniciar'}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={MOCK_SIMULADOS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ paddingTop: topPadding, paddingHorizontal: 16, paddingBottom: 12, gap: 12 }}>
            <Text style={[styles.screenTitle, { color: colors.text }]}>Simulados</Text>
            <View style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.statItem}>
                <Feather name="check-circle" size={18} color={colors.primary} />
                <Text style={[styles.statVal, { color: colors.text }]}>{stats.completed}</Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Realizados</Text>
              </View>
              <View style={[styles.statDiv, { backgroundColor: colors.border }]} />
              <View style={styles.statItem}>
                <Feather name="trending-up" size={18} color={stats.avg >= 70 ? '#2E7D32' : colors.mutedForeground} />
                <Text style={[styles.statVal, { color: colors.text }]}>{stats.avg}%</Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Aproveitamento</Text>
              </View>
              <View style={[styles.statDiv, { backgroundColor: colors.border }]} />
              <View style={styles.statItem}>
                <Feather name="award" size={18} color="#E65100" />
                <Text style={[styles.statVal, { color: colors.text }]}>{MOCK_SIMULADOS.length}</Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Disponíveis</Text>
              </View>
            </View>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              LISTA DE SIMULADOS
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: insets.bottom + (Platform.OS === 'web' ? 34 : 0) + 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  screenTitle: { fontFamily: 'Inter_700Bold', fontSize: 28, letterSpacing: -0.5 },
  statsCard: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statVal: { fontFamily: 'Inter_700Bold', fontSize: 20 },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 10, textAlign: 'center' },
  statDiv: { width: 1, height: 44 },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardTop: { flexDirection: 'row', gap: 12, padding: 14, alignItems: 'flex-start' },
  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1, gap: 4 },
  cardTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  cardDesc: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17 },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 12,
    flexWrap: 'wrap',
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: 'Inter_400Regular', fontSize: 12 },
  resultBadge: { marginLeft: 'auto', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  resultText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
});
