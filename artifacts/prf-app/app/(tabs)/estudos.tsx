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
import { CONTEUDO_SUBJECTS, type ConteudoSubject } from '@/lib/conteudoData';
import { getData, STORAGE_KEYS } from '@/lib/storage';
import type { ProgressMap } from '@/lib/types';

export default function EstudosScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState<ProgressMap>({});

  // Fix: use useFocusEffect to reload every time this screen is focused
  useFocusEffect(
    useCallback(() => {
      getData<ProgressMap>(STORAGE_KEYS.STUDY_PROGRESS).then((p) => {
        if (p) setProgress(p);
        else setProgress({});
      });
    }, [])
  );

  const getSubjectProgress = useCallback(
    (subject: ConteudoSubject) => {
      const total = subject.topics.length;
      const done = subject.topics.filter((t) => !!progress[t.id]).length;
      return { done, total, pct: total > 0 ? done / total : 0 };
    },
    [progress]
  );

  const totalProgress = useMemo(() => {
    let done = 0;
    let total = 0;
    CONTEUDO_SUBJECTS.forEach((s) => {
      const p = getSubjectProgress(s);
      done += p.done;
      total += p.total;
    });
    return { done, total, pct: total > 0 ? done / total : 0 };
  }, [getSubjectProgress]);

  const topPadding = insets.top + (Platform.OS === 'web' ? 67 : 12);

  const renderSubject = ({ item }: { item: ConteudoSubject }) => {
    const { done, total, pct } = getSubjectProgress(item);
    const pctInt = Math.round(pct * 100);
    return (
      <Pressable
        style={({ pressed }) => [
          styles.subjectCard,
          { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.92 : 1 },
        ]}
        onPress={() => router.push(`/subject/${item.id}` as any)}
      >
        <View style={[styles.iconWrap, { backgroundColor: item.color + '20' }]}>
          <Feather name={item.icon as any} size={22} color={item.color} />
        </View>
        <View style={styles.subjectInfo}>
          <View style={styles.subjectTopRow}>
            <Text style={[styles.subjectName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.pctText, { color: pct === 1 ? '#2E7D32' : colors.mutedForeground }]}>
              {pctInt}%
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.progressFill,
                { width: `${pct * 100}%` as any, backgroundColor: pct === 1 ? '#2E7D32' : item.color },
              ]}
            />
          </View>
          <Text style={[styles.progressLabel, { color: colors.mutedForeground }]}>
            {done}/{total} tópicos concluídos
          </Text>
        </View>
        <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={CONTEUDO_SUBJECTS}
        keyExtractor={(item) => item.id}
        renderItem={renderSubject}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ paddingTop: topPadding, paddingHorizontal: 16, paddingBottom: 12, gap: 12 }}>
            <Text style={[styles.screenTitle, { color: colors.text }]}>Estudos</Text>
            {/* Summary card */}
            <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryNum, { color: colors.primary }]}>
                    {totalProgress.done}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
                    Concluídos
                  </Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryNum, { color: colors.text }]}>
                    {totalProgress.total - totalProgress.done}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
                    Restantes
                  </Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryNum, { color: '#2E7D32' }]}>
                    {Math.round(totalProgress.pct * 100)}%
                  </Text>
                  <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
                    Progresso
                  </Text>
                </View>
              </View>
              <View style={[styles.totalBar, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.totalFill,
                    { width: `${totalProgress.pct * 100}%` as any, backgroundColor: colors.primary },
                  ]}
                />
              </View>
            </View>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              {CONTEUDO_SUBJECTS.length} MATÉRIAS
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
  summaryCard: { borderRadius: 14, borderWidth: 1, padding: 16, gap: 12 },
  summaryRow: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1, alignItems: 'center', gap: 3 },
  summaryNum: { fontFamily: 'Inter_700Bold', fontSize: 22 },
  summaryLabel: { fontFamily: 'Inter_400Regular', fontSize: 11, textAlign: 'center' },
  summaryDivider: { width: 1, height: 40 },
  totalBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  totalFill: { height: '100%', borderRadius: 3 },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  iconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  subjectInfo: { flex: 1, gap: 5 },
  subjectTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subjectName: { fontFamily: 'Inter_600SemiBold', fontSize: 14, flex: 1 },
  pctText: { fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  progressBar: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  progressLabel: { fontFamily: 'Inter_400Regular', fontSize: 11 },
});
