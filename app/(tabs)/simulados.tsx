import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { StatSummaryCard } from "@/components/ui/StatSummaryCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Pill } from "@/components/ui/Pill";
import { MOCK_SIMULADOS } from "@/lib/mockData";
import { getData, STORAGE_KEYS } from "@/lib/storage";
import type { Simulado, SimuladoResult } from "@/lib/types";

export default function SimuladosScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [results, setResults] = useState<SimuladoResult[]>([]);

  useEffect(() => {
    getData<SimuladoResult[]>(STORAGE_KEYS.SIMULADO_RESULTS).then((r) => {
      if (r) setResults(r);
    });
  }, []);

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

    const pillTone =
      pct === null
        ? "primary"
        : pct >= 70
        ? "primary"
        : pct >= 50
        ? "warning"
        : "destructive";

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
          <View style={[styles.simuladoIcon, { backgroundColor: colors.primarySoft }]}>
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
          <View style={styles.resultPill}>
            <Pill
              label={pct !== null ? `${pct}% — Refazer` : "Iniciar"}
              tone={pillTone}
            />
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
        renderItem={renderSimulado}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <StatSummaryCard
              stats={[
                {
                  value: String(MOCK_SIMULADOS.length),
                  label: "Disponíveis",
                  color: colors.primary,
                },
                {
                  value: String(stats.completed),
                  label: "Realizados",
                  color: colors.success,
                },
                {
                  value: stats.completed > 0 ? `${stats.avg}%` : "--",
                  label: "Média geral",
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
            />
            <SectionLabel>Lista de simulados</SectionLabel>
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
  listHeader: { padding: 16, gap: 16 },
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
  resultPill: {
    marginLeft: "auto",
  },
});
