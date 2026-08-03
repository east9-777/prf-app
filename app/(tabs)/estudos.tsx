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
import { MOCK_SUBJECTS } from "@/lib/mockData";
import { getData, STORAGE_KEYS } from "@/lib/storage";
import type { Subject } from "@/lib/types";

type ProgressMap = Record<string, boolean>;

export default function EstudosScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState<ProgressMap>({});

  useFocusEffect(
    useCallback(() => {
      getData<ProgressMap>(STORAGE_KEYS.STUDY_PROGRESS).then((p) => {
        if (p) setProgress(p);
      });
    }, [])
  );

  const getSubjectProgress = (subject: Subject) => {
    const total = subject.topics.length;
    const done = subject.topics.filter((t) => !!progress[t.id]).length;
    return { done, total, pct: total > 0 ? done / total : 0 };
  };

  const totalProgress = useMemo(() => {
    let done = 0;
    let total = 0;
    MOCK_SUBJECTS.forEach((s) => {
      const p = getSubjectProgress(s);
      done += p.done;
      total += p.total;
    });
    return { done, total, pct: total > 0 ? done / total : 0 };
  }, [progress]);

  const renderSubject = ({ item }: { item: Subject }) => {
    const { done, total, pct } = getSubjectProgress(item);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.subjectCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            opacity: pressed ? 0.92 : 1,
          },
        ]}
        onPress={() => router.push(`/subject/${item.id}` as any)}
      >
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: item.color + "20" },
          ]}
        >
          <Feather name={item.icon as any} size={22} color={item.color} />
        </View>
        <View style={styles.subjectInfo}>
          <Text style={[styles.subjectName, { color: colors.text }]}>
            {item.name}
          </Text>
          <View style={styles.progressRow}>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: colors.border },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  { width: `${pct * 100}%`, backgroundColor: item.color },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.mutedForeground }]}>
              {done}/{total}
            </Text>
          </View>
        </View>
        <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={MOCK_SUBJECTS}
        keyExtractor={(item) => item.id}
        renderItem={renderSubject}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View
              style={[
                styles.summaryCard,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryNum, { color: colors.primary }]}>
                    {totalProgress.done}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
                    Assuntos concluídos
                  </Text>
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryNum, { color: colors.text }]}>
                    {totalProgress.total - totalProgress.done}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
                    Pendentes
                  </Text>
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryNum, { color: "#3FB950" }]}>
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
                    {
                      width: `${totalProgress.pct * 100}%`,
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              </View>
            </View>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              MATÉRIAS
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
  listHeader: { padding: 16, gap: 16 },
  summaryCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  summaryNum: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
  },
  summaryLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    textAlign: "center",
  },
  divider: {
    width: 1,
    height: 36,
    marginHorizontal: 4,
  },
  totalBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  totalFill: {
    height: "100%",
    borderRadius: 3,
  },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
  },
  subjectCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  subjectInfo: {
    flex: 1,
    gap: 6,
  },
  subjectName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    minWidth: 30,
    textAlign: "right",
  },
});
