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
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { CONTEUDO_SUBJECTS } from "@/lib/conteudoData";
import { getOrdemMateria } from "@/lib/ordemEstudo";

const MEDALHAS = ["🥇", "🥈", "🥉"];

function SubjectOrderCard({ subjectId }: { subjectId: string }) {
  const colors = useColors();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const subject = CONTEUDO_SUBJECTS.find((s) => s.id === subjectId);
  const ordem = getOrdemMateria(subjectId);
  if (!subject || !ordem) return null;

  const sorted = [...ordem].sort((a, b) => a.ordem - b.ordem);
  const withTitles = sorted.map((o) => ({
    ...o,
    title: subject.topics.find((t) => t.id === o.topicId)?.title ?? o.topicId,
  }));

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Pressable style={styles.cardHeader} onPress={() => setExpanded((v) => !v)}>
        <View style={[styles.iconWrap, { backgroundColor: subject.color + "1F" }]}>
          <Feather name={subject.icon as any} size={18} color={subject.color} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={[styles.subjectName, { color: colors.text }]}>{subject.name}</Text>
          <Text style={[styles.subjectMeta, { color: colors.mutedForeground }]}>
            {withTitles.length} assuntos, na ordem recomendada
          </Text>
        </View>
        <Feather
          name={expanded ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.mutedForeground}
        />
      </Pressable>

      {expanded && (
        <View style={styles.stepsWrap}>
          {withTitles.map((item, i) => (
            <Pressable
              key={item.topicId}
              style={[styles.step, { borderTopColor: colors.border }]}
              onPress={() => router.push(`/conteudo/${subjectId}` as any)}
            >
              <View style={styles.stepRank}>
                {i < 3 ? (
                  <Text style={styles.medal}>{MEDALHAS[i]}</Text>
                ) : (
                  <View style={[styles.rankCircle, { backgroundColor: subject.color + "1F" }]}>
                    <Text style={[styles.rankNumber, { color: subject.color }]}>{item.ordem}</Text>
                  </View>
                )}
              </View>
              <View style={styles.stepText}>
                <Text style={[styles.stepTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.stepMotivo, { color: colors.mutedForeground }]}>
                  {item.motivo}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

export default function OrdemEstudoScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Ordem de Estudo",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
        }}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.introBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="compass" size={18} color={colors.primary} />
          <Text style={[styles.introText, { color: colors.foreground }]}>
            Não sabe por onde começar dentro de uma matéria? Toque numa matéria abaixo pra ver a
            sequência recomendada de assuntos — do que serve de base pro resto até o que fica melhor
            pra estudar por último.
          </Text>
        </View>

        {CONTEUDO_SUBJECTS.map((s) => (
          <SubjectOrderCard key={s.id} subjectId={s.id} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12 },
  introBox: {
    flexDirection: "row",
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 4,
  },
  introText: { flex: 1, fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 19 },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeaderText: { flex: 1, gap: 2 },
  subjectName: { fontFamily: "Inter_700Bold", fontSize: 15 },
  subjectMeta: { fontFamily: "Inter_400Regular", fontSize: 12 },
  stepsWrap: { paddingHorizontal: 14, paddingBottom: 6 },
  step: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  stepRank: { width: 30, alignItems: "center" },
  medal: { fontSize: 18 },
  rankCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  rankNumber: { fontFamily: "Inter_700Bold", fontSize: 11 },
  stepText: { flex: 1, gap: 2 },
  stepTitle: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  stepMotivo: { fontFamily: "Inter_400Regular", fontSize: 12, lineHeight: 17 },
});
