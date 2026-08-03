import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { MOCK_SUBJECTS } from "@/lib/mockData";
import { getData, storeData, STORAGE_KEYS } from "@/lib/storage";
import type { Topic } from "@/lib/types";

type ProgressMap = Record<string, boolean>;

export default function SubjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [progress, setProgress] = useState<ProgressMap>({});

  const subject = useMemo(
    () => MOCK_SUBJECTS.find((s) => s.id === id),
    [id]
  );

  useFocusEffect(
    useCallback(() => {
      getData<ProgressMap>(STORAGE_KEYS.STUDY_PROGRESS).then((p) => {
        if (p) setProgress(p);
      });
    }, [])
  );

  const toggleTopic = async (topicId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updated = {
      ...progress,
      [topicId]: !progress[topicId],
    };
    setProgress(updated);
    await storeData(STORAGE_KEYS.STUDY_PROGRESS, updated);
  };

  const markAll = async () => {
    if (!subject) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const allDone = subject.topics.every((t) => progress[t.id]);
    const updated = { ...progress };
    subject.topics.forEach((t) => {
      updated[t.id] = !allDone;
    });
    setProgress(updated);
    await storeData(STORAGE_KEYS.STUDY_PROGRESS, updated);
  };

  if (!subject) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: "Matéria" }} />
        <Text style={{ color: colors.text, textAlign: "center", marginTop: 40 }}>
          Matéria não encontrada.
        </Text>
      </View>
    );
  }

  const done = subject.topics.filter((t) => !!progress[t.id]).length;
  const total = subject.topics.length;
  const pct = total > 0 ? done / total : 0;

  const renderTopic = ({ item }: { item: Topic }) => {
    const isChecked = !!progress[item.id];
    return (
      <TouchableOpacity
        style={[
          styles.topicRow,
          { borderBottomColor: colors.border },
        ]}
        onPress={() => toggleTopic(item.id)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: isChecked ? subject.color : "transparent",
              borderColor: isChecked ? subject.color : colors.border,
            },
          ]}
        >
          {isChecked && (
            <Feather name="check" size={13} color="#FFFFFF" />
          )}
        </View>
        <Text
          style={[
            styles.topicName,
            {
              color: isChecked ? colors.mutedForeground : colors.text,
              textDecorationLine: isChecked ? "line-through" : "none",
            },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: subject.name,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Estudos",
        }}
      />

      <FlatList
        data={subject.topics}
        keyExtractor={(item) => item.id}
        renderItem={renderTopic}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View
              style={[
                styles.progressCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderLeftColor: subject.color,
                },
              ]}
            >
              <View style={styles.progressTop}>
                <View>
                  <Text style={[styles.progressCount, { color: colors.text }]}>
                    {done}
                    <Text style={{ color: colors.mutedForeground, fontSize: 16 }}>
                      /{total}
                    </Text>
                  </Text>
                  <Text style={[styles.progressLabel, { color: colors.mutedForeground }]}>
                    assuntos estudados
                  </Text>
                </View>
                <Text style={[styles.pctText, { color: subject.color }]}>
                  {Math.round(pct * 100)}%
                </Text>
              </View>
              <View style={[styles.bar, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${pct * 100}%`, backgroundColor: subject.color },
                  ]}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.markAllBtn,
                {
                  borderColor: subject.color,
                  backgroundColor: subject.color + "12",
                },
              ]}
              onPress={markAll}
            >
              <Feather
                name={pct === 1 ? "x-square" : "check-square"}
                size={16}
                color={subject.color}
              />
              <Text style={[styles.markAllText, { color: subject.color }]}>
                {pct === 1
                  ? "Desmarcar todos"
                  : "Marcar todos como estudados"}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              ASSUNTOS
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
  list: {},
  listHeader: { padding: 16, gap: 12 },
  progressCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: 16,
    gap: 12,
  },
  progressTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  progressCount: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
  },
  progressLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
  },
  pctText: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
  },
  bar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
  markAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  markAllText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
  },
  topicRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  topicName: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    flex: 1,
  },
});
