import React, { useCallback, useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { CONTEUDO_SUBJECTS } from '@/lib/conteudoData';
import { getData, storeData, STORAGE_KEYS } from '@/lib/storage';
import type { ProgressMap } from '@/lib/types';

export default function SubjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressMap>({});

  const subject = CONTEUDO_SUBJECTS.find((s) => s.id === id);

  useFocusEffect(
    useCallback(() => {
      getData<ProgressMap>(STORAGE_KEYS.STUDY_PROGRESS).then((p) => {
        if (p) setProgress(p);
        else setProgress({});
      });
    }, [])
  );

  const toggleTopic = async (topicId: string) => {
    const updated: ProgressMap = { ...progress, [topicId]: !progress[topicId] };
    setProgress(updated);
    await storeData(STORAGE_KEYS.STUDY_PROGRESS, updated);
  };

  if (!subject) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }]}>
        <Stack.Screen options={{ title: 'Matéria' }} />
        <Text style={{ color: colors.text }}>Matéria não encontrada.</Text>
      </View>
    );
  }

  const done = subject.topics.filter((t) => !!progress[t.id]).length;
  const pct = subject.topics.length > 0 ? done / subject.topics.length : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: subject.name,
          headerTintColor: subject.color,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + (Platform.OS === 'web' ? 34 : 16) + 60 },
        ]}
      >
        {/* Progress Card */}
        <View style={[styles.progressCard, { backgroundColor: subject.color + '14', borderColor: subject.color + '30' }]}>
          <View style={styles.progressTop}>
            <View style={[styles.subjectIcon, { backgroundColor: subject.color + '22' }]}>
              <Feather name={subject.icon as any} size={22} color={subject.color} />
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={[styles.subjectName, { color: subject.color }]}>{subject.name}</Text>
              <View style={[styles.pBar, { backgroundColor: subject.color + '22' }]}>
                <View
                  style={[styles.pFill, { width: `${pct * 100}%` as any, backgroundColor: subject.color }]}
                />
              </View>
              <Text style={styles.pLabel}>{done}/{subject.topics.length} tópicos estudados</Text>
            </View>
          </View>
          <Pressable
            style={[styles.viewAulaBtn, { borderColor: subject.color }]}
            onPress={() => router.push(`/aulas/${id}` as any)}
          >
            <Feather name="layers" size={14} color={subject.color} />
            <Text style={[styles.viewAulaBtnText, { color: subject.color }]}>Ver aulas completas</Text>
          </Pressable>
        </View>

        {/* Topics */}
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          MARQUE OS TÓPICOS ESTUDADOS
        </Text>
        {subject.topics.map((topic) => {
          const isDone = !!progress[topic.id];
          const incidenciaColor = topic.incidencia === 'alta' ? '#EF4444' : topic.incidencia === 'média' ? '#F59E0B' : '#9E9E9E';
          return (
            <Pressable
              key={topic.id}
              style={({ pressed }) => [
                styles.topicRow,
                {
                  backgroundColor: isDone ? subject.color + '0C' : colors.card,
                  borderColor: isDone ? subject.color + '40' : colors.border,
                  opacity: pressed ? 0.88 : 1,
                },
              ]}
              onPress={() => toggleTopic(topic.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: isDone ? subject.color : 'transparent',
                    borderColor: isDone ? subject.color : colors.border,
                  },
                ]}
              >
                {isDone && <Feather name="check" size={12} color="#FFFFFF" />}
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text
                  style={[
                    styles.topicTitle,
                    { color: isDone ? subject.color : colors.text },
                  ]}
                >
                  {topic.title}
                </Text>
                <Text style={[styles.topicIncidencia, { color: incidenciaColor }]}>
                  Incidência {topic.incidencia}
                </Text>
              </View>
              {isDone && (
                <View style={[styles.doneBadge, { backgroundColor: subject.color + '18' }]}>
                  <Text style={[styles.doneBadgeText, { color: subject.color }]}>✓ Estudado</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12 },
  progressCard: { borderRadius: 14, borderWidth: 1, padding: 14, gap: 12 },
  progressTop: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  subjectIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  subjectName: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  pBar: { height: 5, borderRadius: 3, overflow: 'hidden' },
  pFill: { height: '100%', borderRadius: 3 },
  pLabel: { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#757575' },
  viewAulaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  viewAulaBtnText: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 4,
    marginLeft: 2,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicTitle: { fontFamily: 'Inter_500Medium', fontSize: 14 },
  topicIncidencia: { fontFamily: 'Inter_400Regular', fontSize: 11 },
  doneBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  doneBadgeText: { fontFamily: 'Inter_500Medium', fontSize: 11 },
});
