import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { MOCK_SIMULADOS } from "@/lib/mockData";
import { getData, storeData, STORAGE_KEYS } from "@/lib/storage";
import type { SimuladoResult } from "@/lib/types";
import { formatTime } from "@/lib/dateUtils";

export default function SimuladoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const simulado = MOCK_SIMULADOS.find((s) => s.id === id);

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(simulado?.questions.length ?? 0).fill(-1)
  );
  const [timeLeft, setTimeLeft] = useState((simulado?.timeLimit ?? 15) * 60);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTime = useRef(Date.now());

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleFinish(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleFinish = useCallback(
    async (auto = false) => {
      if (finished) return;
      if (!auto) {
        const hasUnanswered = answers.some((a) => a === -1);
        if (hasUnanswered) {
          const confirmed = await new Promise<boolean>((res) => {
            Alert.alert(
              "Questões sem resposta",
              "Você tem questões sem resposta. Deseja finalizar mesmo assim?",
              [
                { text: "Continuar", style: "cancel", onPress: () => res(false) },
                { text: "Finalizar", onPress: () => res(true) },
              ]
            );
          });
          if (!confirmed) return;
        }
      }

      if (timerRef.current) clearInterval(timerRef.current);
      setFinished(true);

      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      const score = simulado!.questions.reduce(
        (sum, q, i) => sum + (answers[i] === q.correctIndex ? 1 : 0),
        0
      );

      const result: SimuladoResult = {
        simuladoId: id,
        simuladoTitle: simulado!.title,
        completedAt: new Date().toISOString(),
        score,
        total: simulado!.questions.length,
        timeSpent,
        answers,
      };

      const existing = (await getData<SimuladoResult[]>(STORAGE_KEYS.SIMULADO_RESULTS)) ?? [];
      const filtered = existing.filter((r) => r.simuladoId !== id);
      await storeData(STORAGE_KEYS.SIMULADO_RESULTS, [...filtered, result]);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace({
        pathname: "/simulado/results",
        params: {
          score: String(score),
          total: String(simulado!.questions.length),
          timeSpent: String(timeSpent),
          simuladoTitle: simulado!.title,
          answers: JSON.stringify(answers),
          simuladoId: id,
        },
      });
    },
    [answers, finished, id, simulado, router]
  );

  if (!simulado) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Stack.Screen options={{ title: "Simulado" }} />
        <Text style={{ color: colors.text, textAlign: "center", marginTop: 40 }}>
          Simulado não encontrado.
        </Text>
      </View>
    );
  }

  const question = simulado.questions[currentQ];
  const answeredCount = answers.filter((a) => a !== -1).length;
  const pct = (currentQ + 1) / simulado.questions.length;
  const isAnswered = answers[currentQ] !== -1;
  const isLow = timeLeft < 120;

  const selectAnswer = (idx: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const next = [...answers];
    next[currentQ] = idx;
    setAnswers(next);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: simulado.title,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Sair",
          headerRight: () => (
            <View style={[styles.timer, { backgroundColor: isLow ? "#F8514922" : colors.card }]}>
              <Feather
                name="clock"
                size={13}
                color={isLow ? "#F85149" : colors.mutedForeground}
              />
              <Text
                style={[
                  styles.timerText,
                  { color: isLow ? "#F85149" : colors.mutedForeground },
                ]}
              >
                {formatTime(timeLeft)}
              </Text>
            </View>
          ),
        }}
      />

      <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
        <View
          style={[styles.progressFill, { width: `${pct * 100}%`, backgroundColor: colors.primary }]}
        />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionMeta}>
          <Text style={[styles.qNum, { color: colors.mutedForeground }]}>
            Questão {currentQ + 1} de {simulado.questions.length}
          </Text>
          <Text style={[styles.answered, { color: colors.mutedForeground }]}>
            {answeredCount} respondida{answeredCount !== 1 ? "s" : ""}
          </Text>
        </View>

        <Text style={[styles.qText, { color: colors.text }]}>
          {question.text}
        </Text>

        <View style={styles.options}>
          {question.options.map((option, idx) => {
            const isSelected = answers[currentQ] === idx;
            return (
              <Pressable
                key={idx}
                style={({ pressed }) => [
                  styles.option,
                  {
                    backgroundColor: isSelected ? colors.primary + "18" : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
                onPress={() => selectAnswer(idx)}
              >
                <View
                  style={[
                    styles.optionLetter,
                    {
                      backgroundColor: isSelected ? colors.primary : colors.muted,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.letterText,
                      {
                        color: isSelected ? "#FFFFFF" : colors.mutedForeground,
                      },
                    ]}
                  >
                    {["A", "B", "C", "D"][idx]}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionText,
                    { color: isSelected ? colors.text : colors.foreground },
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={[
          styles.nav,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 8,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.navBtn,
            { borderColor: colors.border, opacity: currentQ === 0 ? 0.4 : 1 },
          ]}
          onPress={() => setCurrentQ((q) => Math.max(0, q - 1))}
          disabled={currentQ === 0}
        >
          <Feather name="chevron-left" size={20} color={colors.text} />
          <Text style={[styles.navText, { color: colors.text }]}>Anterior</Text>
        </TouchableOpacity>

        {currentQ < simulado.questions.length - 1 ? (
          <TouchableOpacity
            style={[styles.navBtnPrimary, { backgroundColor: colors.primary }]}
            onPress={() => setCurrentQ((q) => Math.min(simulado.questions.length - 1, q + 1))}
          >
            <Text style={styles.navTextPrimary}>Próxima</Text>
            <Feather name="chevron-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navBtnPrimary, { backgroundColor: "#3FB950" }]}
            onPress={() => handleFinish(false)}
          >
            <Text style={styles.navTextPrimary}>Finalizar</Text>
            <Feather name="check" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  progressBar: { height: 3 },
  progressFill: { height: "100%" },
  scroll: { padding: 20, gap: 20 },
  questionMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  qNum: { fontFamily: "Inter_500Medium", fontSize: 13 },
  answered: { fontFamily: "Inter_400Regular", fontSize: 13 },
  qText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
  },
  options: { gap: 10 },
  option: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  letterText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
  },
  optionText: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
  nav: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  navBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
  },
  navText: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  navBtnPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 13,
    borderRadius: 12,
  },
  navTextPrimary: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 4,
  },
  timerText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
});
