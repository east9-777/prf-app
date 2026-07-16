import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { MOCK_SIMULADOS } from '@/lib/mockData';
import { getData, STORAGE_KEYS } from '@/lib/storage';
import { formatTime } from '@/lib/dateUtils';
import type { SimuladoResult } from '@/lib/types';

export default function SimuladoResultsScreen() {
  const { simuladoId } = useLocalSearchParams<{ simuladoId: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [result, setResult] = useState<SimuladoResult | null>(null);
  const [showReview, setShowReview] = useState(false);

  const simulado = MOCK_SIMULADOS.find((s) => s.id === simuladoId);

  useEffect(() => {
    (async () => {
      const all = await getData<SimuladoResult[]>(STORAGE_KEYS.SIMULADO_RESULTS);
      const found = all?.find((r) => r.simuladoId === simuladoId) ?? null;
      setResult(found);
    })();
  }, [simuladoId]);

  if (!result || !simulado) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={{ color: colors.mutedForeground }}>Carregando resultado…</Text>
      </View>
    );
  }

  const pct = Math.round((result.score / result.total) * 100);
  const passed = pct >= 60;
  const scoreColor = pct >= 80 ? '#22C55E' : pct >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 },
        ]}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.replace('/(tabs)/simulados')}
            style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Feather name="arrow-left" size={18} color={colors.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Resultado</Text>
          <View style={{ width: 38 }} />
        </View>

        {/* Score card */}
        <View style={[styles.scoreCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.scoreCircle, { borderColor: scoreColor }]}>
            <Text style={[styles.scorePct, { color: scoreColor }]}>{pct}%</Text>
            <Text style={[styles.scoreLabel, { color: colors.mutedForeground }]}>acertos</Text>
          </View>

          <Text style={[styles.simuladoTitle, { color: colors.text }]}>{result.simuladoTitle}</Text>

          <View style={[styles.badge, { backgroundColor: passed ? '#22C55E18' : '#EF444418' }]}>
            <Feather
              name={passed ? 'check-circle' : 'x-circle'}
              size={14}
              color={passed ? '#22C55E' : '#EF4444'}
            />
            <Text style={[styles.badgeText, { color: passed ? '#22C55E' : '#EF4444' }]}>
              {passed ? 'Aprovado' : 'Reprovado'}
            </Text>
          </View>

          {/* Stats row */}
          <View style={[styles.statsRow, { borderColor: colors.border }]}>
            {[
              { icon: 'check', label: 'Certas', value: String(result.score), color: '#22C55E' },
              { icon: 'x', label: 'Erradas', value: String(result.total - result.score), color: '#EF4444' },
              { icon: 'clock', label: 'Tempo', value: formatTime(result.timeSpent), color: colors.primary },
            ].map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <View style={[styles.statIconBox, { backgroundColor: stat.color + '18' }]}>
                  <Feather name={stat.icon as any} size={14} color={stat.color} />
                </View>
                <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Review toggle */}
        <Pressable
          style={[styles.reviewToggle, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => setShowReview((v) => !v)}
        >
          <Feather name="list" size={16} color={colors.primary} />
          <Text style={[styles.reviewToggleText, { color: colors.text }]}>
            {showReview ? 'Ocultar gabarito' : 'Ver gabarito comentado'}
          </Text>
          <Feather name={showReview ? 'chevron-up' : 'chevron-down'} size={16} color={colors.mutedForeground} />
        </Pressable>

        {/* Question review */}
        {showReview && (
          <View style={{ gap: 12, marginTop: 4 }}>
            {simulado.questions.map((q, idx) => {
              const userAnswer = result.answers[idx];
              const correct = q.correctIndex;
              const isCorrect = userAnswer === correct;
              const notAnswered = userAnswer === -1;

              return (
                <View
                  key={idx}
                  style={[
                    styles.reviewCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: isCorrect ? '#22C55E44' : notAnswered ? colors.border : '#EF444444',
                    },
                  ]}
                >
                  {/* Question header */}
                  <View style={styles.reviewHeader}>
                    <View style={[styles.reviewNum, { backgroundColor: isCorrect ? '#22C55E18' : notAnswered ? colors.muted : '#EF444418' }]}>
                      <Text style={[styles.reviewNumText, { color: isCorrect ? '#22C55E' : notAnswered ? colors.mutedForeground : '#EF4444' }]}>
                        {idx + 1}
                      </Text>
                    </View>
                    {q.subject && (
                      <Text style={[styles.reviewSubject, { color: colors.mutedForeground }]}>
                        {q.subject.toUpperCase()}
                      </Text>
                    )}
                    <Feather
                      name={isCorrect ? 'check-circle' : notAnswered ? 'minus-circle' : 'x-circle'}
                      size={16}
                      color={isCorrect ? '#22C55E' : notAnswered ? colors.mutedForeground : '#EF4444'}
                    />
                  </View>

                  <Text style={[styles.reviewQText, { color: colors.text }]}>{q.text}</Text>

                  {/* Options */}
                  <View style={{ gap: 6, marginTop: 10 }}>
                    {q.options.map((opt, i) => {
                      const isSelected = userAnswer === i;
                      const isCorrectOpt = correct === i;
                      let bg = colors.background;
                      let border = colors.border;
                      let textColor = colors.mutedForeground;

                      if (isCorrectOpt) {
                        bg = '#22C55E18';
                        border = '#22C55E66';
                        textColor = colors.text;
                      } else if (isSelected && !isCorrectOpt) {
                        bg = '#EF444418';
                        border = '#EF444466';
                        textColor = '#EF4444';
                      }

                      return (
                        <View key={i} style={[styles.reviewOpt, { backgroundColor: bg, borderColor: border }]}>
                          <View style={[styles.optLetter, { backgroundColor: isCorrectOpt ? '#22C55E33' : isSelected ? '#EF444433' : colors.muted }]}>
                            <Text style={[styles.optLetterText, { color: isCorrectOpt ? '#22C55E' : isSelected ? '#EF4444' : colors.mutedForeground }]}>
                              {String.fromCharCode(65 + i)}
                            </Text>
                          </View>
                          <Text style={[styles.reviewOptText, { color: textColor, flex: 1 }]}>{opt}</Text>
                          {isCorrectOpt && <Feather name="check" size={14} color="#22C55E" />}
                          {isSelected && !isCorrectOpt && <Feather name="x" size={14} color="#EF4444" />}
                        </View>
                      );
                    })}
                  </View>

                  {/* Explanation */}
                  {q.explanation && (
                    <View style={[styles.explanation, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]}>
                      <Feather name="info" size={13} color={colors.primary} />
                      <Text style={[styles.explanationText, { color: colors.text }]}>{q.explanation}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actions}>
          <Pressable
            style={[styles.actionBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.replace({ pathname: '/simulado/[id]', params: { id: simuladoId } })}
          >
            <Feather name="refresh-cw" size={16} color="#FFFFFF" />
            <Text style={styles.actionBtnText}>Refazer</Text>
          </Pressable>
          <Pressable
            style={[styles.actionBtn, { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }]}
            onPress={() => router.replace('/(tabs)/simulados')}
          >
            <Feather name="list" size={16} color={colors.text} />
            <Text style={[styles.actionBtnText, { color: colors.text }]}>Simulados</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 16, gap: 14 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontFamily: 'Inter_700Bold', fontSize: 18 },
  scoreCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  scoreCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scorePct: { fontFamily: 'Inter_700Bold', fontSize: 30 },
  scoreLabel: { fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: -4 },
  simuladoTitle: { fontFamily: 'Inter_700Bold', fontSize: 16, textAlign: 'center' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 16,
    marginTop: 4,
    justifyContent: 'space-around',
  },
  statItem: { alignItems: 'center', gap: 4 },
  statIconBox: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 11 },
  reviewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  reviewToggleText: { fontFamily: 'Inter_600SemiBold', fontSize: 14, flex: 1 },
  reviewCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
    gap: 6,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  reviewNum: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewNumText: { fontFamily: 'Inter_700Bold', fontSize: 13 },
  reviewSubject: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 0.8, flex: 1 },
  reviewQText: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20 },
  reviewOpt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  optLetter: { width: 24, height: 24, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  optLetterText: { fontFamily: 'Inter_700Bold', fontSize: 11 },
  reviewOptText: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 18 },
  explanation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  explanationText: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18, flex: 1 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 4 },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  actionBtnText: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#FFFFFF' },
});
