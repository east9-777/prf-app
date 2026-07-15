import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { CONTEUDO_SUBJECTS, type TopicItem } from "@/lib/conteudoData";

const INCIDENCIA_CONFIG = {
  alta: { label: "Alta incidência", color: "#EF4444", bg: "#EF444418" },
  média: { label: "Média incidência", color: "#F59E0B", bg: "#F59E0B18" },
  baixa: { label: "Baixa incidência", color: "#6B7280", bg: "#6B728018" },
};

function TopicCard({ topic, subjectColor }: { topic: TopicItem; subjectColor: string }) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(false);
  const inc = INCIDENCIA_CONFIG[topic.incidencia];

  return (
    <View
      style={[
        styles.topicCard,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Pressable
        style={styles.topicHeader}
        onPress={() => setExpanded((v) => !v)}
      >
        <View style={styles.topicTitleRow}>
          <View
            style={[
              styles.topicDot,
              { backgroundColor: subjectColor },
            ]}
          />
          <Text style={[styles.topicTitle, { color: colors.text }]}>
            {topic.title}
          </Text>
        </View>
        <View style={styles.topicMeta}>
          <View style={[styles.incBadge, { backgroundColor: inc.bg }]}>
            <Text style={[styles.incText, { color: inc.color }]}>
              {inc.label}
            </Text>
          </View>
          <Feather
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            color={colors.mutedForeground}
          />
        </View>
      </Pressable>

      {expanded && (
        <View style={styles.topicBody}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Text style={[styles.contentText, { color: colors.foreground }]}>
            {topic.content}
          </Text>

          <View
            style={[
              styles.keyPointsBox,
              { backgroundColor: subjectColor + "0F", borderColor: subjectColor + "30" },
            ]}
          >
            <View style={styles.keyPointsHeader}>
              <Feather name="check-circle" size={14} color={subjectColor} />
              <Text style={[styles.keyPointsTitle, { color: subjectColor }]}>
                Pontos-chave para a prova
              </Text>
            </View>
            {topic.keyPoints.map((point, i) => (
              <View key={i} style={styles.keyPointItem}>
                <View
                  style={[styles.bullet, { backgroundColor: subjectColor }]}
                />
                <Text
                  style={[styles.keyPointText, { color: colors.foreground }]}
                >
                  {point}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

export default function ConteudoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const subject = CONTEUDO_SUBJECTS.find((s) => s.id === id);

  if (!subject) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: "Não encontrado" }} />
        <Text style={[styles.errorText, { color: colors.mutedForeground }]}>
          Matéria não encontrada
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: subject.name,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Conteúdo",
        }}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingBottom:
              insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View
          style={[
            styles.hero,
            { backgroundColor: subject.color + "15", borderColor: subject.color + "30" },
          ]}
        >
          <View
            style={[
              styles.heroIcon,
              { backgroundColor: subject.color + "25" },
            ]}
          >
            <Feather
              name={subject.icon as any}
              size={32}
              color={subject.color}
            />
          </View>
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            {subject.name}
          </Text>
          <Text style={[styles.heroDesc, { color: colors.mutedForeground }]}>
            {subject.description}
          </Text>
          <View style={styles.heroStats}>
            <View style={[styles.statItem, { backgroundColor: subject.color + "20" }]}>
              <Feather name="list" size={13} color={subject.color} />
              <Text style={[styles.statText, { color: subject.color }]}>
                {subject.topics.length} tópicos
              </Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: "#EF444420" }]}>
              <Feather name="trending-up" size={13} color="#EF4444" />
              <Text style={[styles.statText, { color: "#EF4444" }]}>
                {subject.topics.filter((t) => t.incidencia === "alta").length} de alta incidência
              </Text>
            </View>
          </View>
        </View>

        {/* Tip */}
        <View
          style={[
            styles.tipBox,
            { backgroundColor: colors.card, borderColor: colors.border, borderLeftColor: subject.color },
          ]}
        >
          <Feather name="info" size={14} color={subject.color} />
          <Text style={[styles.tipText, { color: colors.mutedForeground }]}>
            Toque em cada tópico para expandir o conteúdo e os pontos-chave para a prova.
          </Text>
        </View>

        {/* Tópicos */}
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          TÓPICOS
        </Text>

        {subject.topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            subjectColor={subject.color}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12 },
  errorText: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  hero: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    letterSpacing: -0.3,
    textAlign: "center",
  },
  heroDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
  },
  heroStats: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  tipBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 12,
  },
  tipText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
    marginLeft: 2,
    marginTop: 4,
  },
  topicCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  topicHeader: {
    padding: 14,
    gap: 8,
  },
  topicTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  topicDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  topicTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    flex: 1,
  },
  topicMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 18,
  },
  incBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  incText: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
  },
  topicBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 12,
  },
  divider: {
    height: 1,
    marginBottom: 4,
  },
  contentText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 21,
  },
  keyPointsBox: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  keyPointsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  keyPointsTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
  },
  keyPointItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 6,
  },
  keyPointText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 19,
    flex: 1,
  },
});
