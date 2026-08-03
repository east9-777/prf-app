import React, { useMemo } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { MOCK_SIMULADOS } from "@/lib/mockData";
import { formatTime } from "@/lib/dateUtils";

export default function SimuladoResultsScreen() {
  const params = useLocalSearchParams<{
    score: string;
    total: string;
    timeSpent: string;
    simuladoTitle: string;
    answers: string;
    simuladoId: string;
  }>();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const score = Number(params.score ?? 0);
  const total = Number(params.total ?? 0);
  const timeSpent = Number(params.timeSpent ?? 0);
  const answers: number[] = JSON.parse(params.answers ?? "[]");
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const simulado = MOCK_SIMULADOS.find((s) => s.id === params.simuladoId);

  const gradeColor =
    pct >= 70 ? "#3FB950" : pct >= 50 ? "#D29922" : "#F85149";
  const gradeLabel =
    pct >= 70 ? "Aprovado!" : pct >= 50 ? "Regular" : "Precisa melhorar";
  const gradeIcon: keyof typeof Feather.glyphMap =
    pct >= 70 ? "award" : pct >= 50 ? "target" : "trending-up";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Resultado",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          gestureEnabled: false,
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.scoreCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View
            style={[
              styles.scoreCircle,
              { borderColor: gradeColor, backgroundColor: gradeColor + "15" },
            ]}
          >
            <Feather name={gradeIcon} size={28} color={gradeColor} />
            <Text style={[styles.scorePct, { color: gradeColor }]}>{pct}%</Text>
          </View>
          <Text style={[styles.gradeLabel, { color: gradeColor }]}>{gradeLabel}</Text>
          <Text style={[styles.simuladoTitle, { color: colors.mutedForeground }]}>
            {params.simuladoTitle}
          </Text>
        </View>

        <View style={styles.statsRow}>
          {[
            { icon: "check-circle" as const, label: "Acertos", value: String(score), color: "#3FB950" },
            { icon: "x-circle" as const, label: "Erros", value: String(total - score), color: "#F85149" },
            { icon: "clock" as const, label: "Tempo", value: formatTime(timeSpent), color: colors.primary },
          ].map((stat) => (
            <View
              key={stat.label}
              style={[
                styles.statCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Feather name={stat.icon} size={20} color={stat.color} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {simulado && (
          <View>
            <Text style={[styles.reviewTitle, { color: colors.text }]}>
              Revisão das questões
            </Text>
            {simulado.questions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correctIndex;
              const isUnanswered = userAnswer === -1;

              return (
                <View
                  key={q.id}
                  style={[
                    styles.reviewItem,
                    {
                      backgroundColor: colors.card,
                      borderColor: isCorrect
                        ? "#3FB95040"
                        : isUnanswered
                        ? colors.border
                        : "#F8514940",
                      borderLeftColor: isCorrect ? "#3FB950" : isUnanswered ? colors.border : "#F85149",
                    },
                  ]}
                >
                  <View style={styles.reviewHeader}>
                    <View
                      style={[
                        styles.reviewBadge,
                        {
                          backgroundColor: isCorrect
                            ? "#3FB95022"
                            : isUnanswered
                            ? colors.muted
                            : "#F8514922",
                        },
                      ]}
                    >
                      <Feather
                        name={isCorrect ? "check" : isUnanswered ? "minus" : "x"}
                        size={13}
                        color={
                          isCorrect ? "#3FB950" : isUnanswered ? colors.mutedForeground : "#F85149"
                        }
                      />
                      <Text
                        style={[
                          styles.reviewBadgeText,
                          {
                            color: isCorrect
                              ? "#3FB950"
                              : isUnanswered
                              ? colors.mutedForeground
                              : "#F85149",
                          },
                        ]}
                      >
                        {isCorrect ? "Correta" : isUnanswered ? "Não respondida" : "Errada"}
                      </Text>
                    </View>
                    <Text style={[styles.qNum, { color: colors.mutedForeground }]}>
                      Q{idx + 1}
                    </Text>
                  </View>
                  <Text style={[styles.reviewQText, { color: colors.text }]} numberOfLines={2}>
                    {q.text}
                  </Text>
                  {!isCorrect && !isUnanswered && (
                    <Text style={[styles.reviewCorrect, { color: "#3FB950" }]}>
                      Correta: {q.options[q.correctIndex]}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.primary }]}
            onPress={() => router.replace(`/simulado/${params.simuladoId}` as any)}
          >
            <Feather name="refresh-cw" size={16} color="#FFFFFF" />
            <Text style={styles.btnText}>Refazer simulado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnSecondary, { borderColor: colors.border }]}
            onPress={() => router.replace("/(tabs)/simulados")}
          >
            <Text style={[styles.btnSecondaryText, { color: colors.text }]}>
              Ver todos os simulados
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 16 },
  scoreCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  scorePct: { fontFamily: "Inter_700Bold", fontSize: 22 },
  gradeLabel: { fontFamily: "Inter_700Bold", fontSize: 20 },
  simuladoTitle: { fontFamily: "Inter_400Regular", fontSize: 13 },
  statsRow: { flexDirection: "row", gap: 8 },
  statCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
    gap: 4,
  },
  statValue: { fontFamily: "Inter_700Bold", fontSize: 18 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 11 },
  reviewTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    marginBottom: 8,
  },
  reviewItem: {
    borderRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: 12,
    marginBottom: 8,
    gap: 6,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  reviewBadgeText: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
  qNum: { fontFamily: "Inter_500Medium", fontSize: 11 },
  reviewQText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  reviewCorrect: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  actions: { gap: 10 },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnText: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: "#FFFFFF" },
  btnSecondary: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
  },
  btnSecondaryText: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
});
