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
import { StatSummaryCard } from "@/components/ui/StatSummaryCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProgressBar } from "@/components/ui/ProgressBar";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <View style={[styles.iconWrap, { backgroundColor: colors.primarySoft }]}>
          <Feather name={item.icon as any} size={22} color={colors.primary} />
        </View>
        <View style={styles.subjectInfo}>
          <Text style={[styles.subjectName, { color: colors.text }]}>
            {item.name}
          </Text>
          <ProgressBar progress={pct} label={`${done}/${total}`} />
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
            <StatSummaryCard
              progress={totalProgress.pct}
              stats={[
                {
                  value: String(totalProgress.done),
                  label: "Assuntos concluídos",
                  color: colors.primary,
                },
                {
                  value: String(totalProgress.total - totalProgress.done),
                  label: "Pendentes",
                },
                {
                  value: `${Math.round(totalProgress.pct * 100)}%`,
                  label: "Progresso",
                  color: colors.success,
                },
              ]}
            />
            <SectionLabel>Matérias</SectionLabel>
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
});
