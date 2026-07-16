import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Platform,
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
import { getData, storeData, STORAGE_KEYS } from '@/lib/storage';
import { formatTime } from '@/lib/dateUtils';
import type { SimuladoResult } from '@/lib/types';

export default function SimuladoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const simulado = MOCK_SIMULADOS.find((s) => s.id === id);
  const [answers, setAnswers] = useState<(number | null)[]>(
    simulado ? Array(simulado.questions.length).fill(null) : []
  );
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(simulado ? simulado.timeLimit * 60 : 0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const startTime = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!started || finished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleFinish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [started, finished]);

  const handleFinish = useCallback(async () => {
    if (!simulado) return;
    clearInterval(timerRef.current!);
    const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
    const score = answers.reduce((acc: number, a, i) => {
      return acc + (a === simulado.questions[i].correctIndex ? 1 : 0);
    }, 0);

    const result: SimuladoResult = {
      simuladoId: simulado.id,
      simuladoTitle: simulado.title,
      completedAt: new Date().toISOString(),
      score,
      total: simulado.questions.length,
      timeSpent,
      answers: answers.map((a) => a ?? -1),
    };

    const existing = (await getData<SimuladoResult[]>(STORAGE_KEYS.SIMULADO_RESULTS)) ?? [];
    const updated = [result, ...existing.filter((r) => r.simuladoId !== simulado.id)];
    await storeData(STORAGE_KEYS.SIMULADO_RESULTS, updated);

    setFinished(true);
    router.replace({
      pathname: '/simulado/results',
      params: { simuladoId: simulado.id },
    });
  }, [answers, simulado]);

  const confirmFinish = () => {
    const unanswered = answers.filter((a) => a === null).length;
    if (unanswered > 0) {
      Alert.alert(
        'Finalizar',
        `Você deixou ${unanswered} questão(ões) sem responder. Deseja finalizar mesmo assim?`,
        [
          { text: 'Continuar', style: 'cancel' },
          { text: 'Finalizar', style: 'destructive', onPress: handleFinish },
        ]
      );
    } else {
      handleFinish();
    }
  };

  if (!simulado) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={{ color: colors.text }}>Simulado não encontrado.</Text>
      </View>
    );
  }

  const q = simulado.questions[current];
  const answered = answers[current] !== null;
  const timerColor = timeLeft < 300 ? '#EF4444' : timeLeft < 600 ? '#F59E0B' : colors.primary;

  // ── Start screen ──────────────────────────────────────────────────────────
  if (!started) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView
          contentContainerStyle={[
            styles.startScroll,
            { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 40 },
          ]}
        >
          <View style={[styles.startCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.startIcon, { backgroundColor: colors.primary + '18' }]}>
              <Feather name="clipboard" size={36} color={colors.primary} />
            </View>
            <Text style={[styles.startTitle, { color: colors.text }]}>{simulado.title}</Text>
            <Text style={[styles.startDesc, { color: colors.mutedForeground }]}>{simulado.description}</Text>

            {[
              { icon: 'list', label: 'Questões', value: `${simulado.questions.length}` },
              { icon: 'clock', label: 'Tempo limite', value: `${simulado.timeLimit} minutos` },
              { icon: 'alert-circle', label: 'Estilo', value: 'CEBRASPE (Certo/Errado + múltipla escolha)' },
            ].map((row) => (
              <View key={row.label} style={[styles.infoRow, { borderColor: colors.border }]}>
                <Feather name={row.icon as any} size={16} color={colors.primary} />
                <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>{row.label}</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{row.value}</Text>
              </View>
            ))}

            <Pressable
              style={[styles.startBtn, { backgroundColor: colors.primary }]}
              onPress={() => { startTime.current = Date.now(); setStarted(true); }}
            >
              <Text style={styles.startBtnText}>Iniciar Simulado</Text>
              <Feather name="play" size={18} color="#FFFFFF" />
            </Pressable>
            <Pressable onPress={() => router.back()} style={styles.cancelBtn}>
              <Text style={[styles.cancelText, { color: colors.mutedForeground }]}>Cancelar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  // ── Question screen ────────────────────────────────────────────────────────
  const pct = (answers.filter((a) => a !== null).length / simulado.questions.length) * 100;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + 8, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.qCounter, { color: colors.mutedForeground }]}>
          {current + 1}/{simulado.questions.length}
        </Text>
        <View style={[styles.timerBadge, { backgroundColor: timerColor + '18' }]}>
          <Feather name="clock" size={13} color={timerColor} />
          <Text style={[styles.timerText, { color: timerColor }]}>{formatTime(timeLeft)}</Text>
        </View>
        <Pressable
          style={[styles.finishTopBtn, { borderColor: '#EF4444' }]}
          onPress={confirmFinish}
        >
          <Text style={styles.finishTopText}>Finalizar</Text>
        </Pressable>
      </View>

      {/* Progress */}
      <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
        <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: colors.primary }]} />
      </View>

      {/* Question */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.qScroll, { paddingBottom: insets.bottom + 100 }]}
      >
        {q.subject && (
          <Text style={[styles.qSubject, { color: colors.mutedForeground }]}>
            {q.subject.toUpperCase()}
          </Text>
        )}
        <Text style={[styles.qText, { color: colors.text }]}>{q.text}</Text>

        <View style={{ gap: 10, marginTop: 16 }}>
          {q.options.map((opt, i) => {
            const isSelected = answers[current] === i;
            return (
              <Pressable
                key={i}
                onPress={() => {
                  if (answered) return;
                  const updated = [...answers];
                  updated[current] = i;
                  setAnswers(updated);
                }}
                style={({ pressed }) => [
                  styles.optionBtn,
                  {
                    backgroundColor: isSelected ? colors.primary + '14' : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                    opacity: pressed ? 0.88 : 1,
                  },
                ]}
              >
                <View style={[styles.optionLetter, { backgroundColor: isSelected ? colors.primary : colors.muted }]}>
                  <Text style={[styles.optionLetterText, { color: isSelected ? '#FFFFFF' : colors.mutedForeground }]}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: colors.text }]}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 12, backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <Pressable
          onPress={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          style={[styles.navBtn, { borderColor: colors.border, opacity: current === 0 ? 0.4 : 1 }]}
        >
          <Feather name="arrow-left" size={18} color={colors.text} />
          <Text style={[styles.navBtnText, { color: colors.text }]}>Anterior</Text>
        </Pressable>

        {current < simulado.questions.length - 1 ? (
          <Pressable
            onPress={() => setCurrent((c) => Math.min(simulado.questions.length - 1, c + 1))}
            style={[styles.nextBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.nextBtnText}>Próxima</Text>
            <Feather name="arrow-right" size={18} color="#FFFFFF" />
          </Pressable>
        ) : (
          <Pressable
            onPress={confirmFinish}
            style={[styles.nextBtn, { backgroundColor: '#2E7D32' }]}
          >
            <Text style={styles.nextBtnText}>Finalizar</Text>
            <Feather name="check" size={18} color="#FFFFFF" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  startScroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  startCard: { borderRadius: 18, borderWidth: 1, padding: 24, gap: 16, alignItems: 'center' },
  startIcon: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  startTitle: { fontFamily: 'Inter_700Bold', fontSize: 20, textAlign: 'center' },
  startDesc: { fontFamily: 'Inter_400Regular', fontSize: 13, textAlign: 'center', lineHeight: 19 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  infoLabel: { fontFamily: 'Inter_400Regular', fontSize: 13, flex: 1 },
  infoValue: { fontFamily: 'Inter_500Medium', fontSize: 13 },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 4,
  },
  startBtnText: { fontFamily: 'Inter_700Bold', fontSize: 16, color: '#FFFFFF' },
  cancelBtn: { paddingVertical: 10 },
  cancelText: { fontFamily: 'Inter_400Regular', fontSize: 14 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  qCounter: { fontFamily: 'Inter_500Medium', fontSize: 14 },
  timerBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  timerText: { fontFamily: 'Inter_700Bold', fontSize: 14 },
  finishTopBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  finishTopText: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: '#EF4444' },
  progressBar: { height: 3 },
  progressFill: { height: '100%' },
  qScroll: { padding: 20, gap: 8 },
  qSubject: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase' },
  qText: { fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 23, marginTop: 4 },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionLetter: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  optionLetterText: { fontFamily: 'Inter_700Bold', fontSize: 13 },
  optionText: { fontFamily: 'Inter_400Regular', fontSize: 14, flex: 1, lineHeight: 20 },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  navBtnText: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  nextBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  nextBtnText: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#FFFFFF' },
});
