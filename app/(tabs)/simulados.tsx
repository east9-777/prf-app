import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { MOCK_SIMULADOS } from "@/lib/mockData";
import { getData, STORAGE_KEYS } from "@/lib/storage";
import type { Simulado, SimuladoResult } from "@/lib/types";

export default function SimuladosScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [results, setResults] = useState<SimuladoResult[]>([]);

  useFocusEffect(
    useCallback(() => {
      getData<SimuladoResult[]>(STORAGE_KEYS.SIMULADO_RESULTS).then((r) => {
        setResults(r ?? []);
      });
    }, [])
  );

  const stats = useMemo(() => {
    const completed = results.length;
    const avg =
      completed > 0
        ? Math.round(
            (results.reduce((sum, r) => sum + r.score / r.total, 0) /
              completed) *
              100
          )
        : 0;
    return { completed, avg };
  }, [results]);

  const getResultForSimulado = (id: string) =>
    results.find((r) => r.simuladoId === id);

  const renderSimulado = ({ item }: { item: Simulado }) => {
    const result = getResultForSimulado(item.id);
    const pct = result ? Math.round((result.score / result.total) * 100) : null;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            opacity: pressed ? 0.92 : 1,
          },
        ]}
        onPress={() => router.push(`/simulado/${item.id}` as any)}
      >
        <View style={styles.cardTop}>
          <View
            style={[styles.simuladoIcon, { backgroundColor: colors.primary + "20" }]}
          >
            <Feather name="clipboard" size={20} color={colors.primary} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {item.title}
            </Text>
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
          {pct !== null ? (
            <View
              style={[
                styles.resultBadge,
                {
                  backgroundColor:
                    pct >= 70 ? colors.success + "22" : pct >= 50 ? colors.warning + "22" : colors.destructive + "22",
                },
              ]}
            >
              <Text
                style={[
                  styles.resultText,
                  {
                    color:
                      pct >= 70 ? colors.success : pct >= 50 ? colors.warning : colors.destructive,
                  },
                ]}
              >
                {pct}% — Refazer
              </Text>
            </View>
          ) : (
            <View style={[styles.resultBadge, { backgroundColor: colors.primary + "22" }]}>
              <Text style={[styles.resultText, { color: colors.primary }]}>
                Iniciar
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={MOCK_SIMULADOS}
        keyExtractor={(item) => item.id}
        renderItem={renderSimulado}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View style={styles.statsRow}>
              <View
                style={[
                  styles.statCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.statNum, { color: colors.primary }]}>
                  {MOCK_SIMULADOS.length}
                </Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                  Disponíveis
                </Text>
              </View>
              <View
                style={[
                  styles.statCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.statNum, { color: colors.success }]}>
                  {stats.completed}
                </Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                  Realizados
                </Text>
              </View>
              <View
                style={[
                  styles.statCard,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.statNum,
                    {
                      color:
                        stats.avg >= 70
                          ? colors.success
                          : stats.avg >= 50
                          ? colors.warning
                          : stats.completed > 0
                          ? colors.destructive
                          : colors.mutedForeground,
                    },
                  ]}
                >
                  {stats.completed > 0 ? `${stats.avg}%` : "--"}
                </Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                  Média geral
                </Text>
              </View>
            </View>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              LISTA DE SIMULADOS
            </Text>
          </View>
        }
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { gap: 0 },
  listHeader: { padding: 16, gap: 14 },
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statNum: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
  },
  statLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    textAlign: "center",
  },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardTop: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    alignItems: "flex-start",
  },
  simuladoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: { flex: 1, gap: 4 },
  cardTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
  },
  cardDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 17,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 12,
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  resultBadge: {
    marginLeft: "auto",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  resultText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
  },
});
