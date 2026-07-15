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

const HIGHLIGHT_CONFIG = {
  atencao:      { label: "⚠️  Atenção",       bg: "#FEF3C7", border: "#F59E0B", text: "#92400E" },
  pegadinha:    { label: "🪤  Pegadinha",      bg: "#FEE2E2", border: "#EF4444", text: "#991B1B" },
  "muito-cobrado": { label: "🎯  Muito cobrado", bg: "#EDE9FE", border: "#7C3AED", text: "#4C1D95" },
  memorize:     { label: "🧠  Memorize",       bg: "#DBEAFE", border: "#3B82F6", text: "#1E3A8A" },
  dica:         { label: "💡  Dica da banca",  bg: "#D1FAE5", border: "#10B981", text: "#064E3B" },
};

function HighlightBox({ type, text }: { type: keyof typeof HIGHLIGHT_CONFIG; text: string }) {
  const cfg = HIGHLIGHT_CONFIG[type] ?? HIGHLIGHT_CONFIG.atencao;
  return (
    <View style={[hStyles.box, { backgroundColor: cfg.bg, borderLeftColor: cfg.border }]}>
      <Text style={[hStyles.label, { color: cfg.border }]}>{cfg.label}</Text>
      <Text style={[hStyles.text, { color: cfg.text }]}>{text}</Text>
    </View>
  );
}

const hStyles = StyleSheet.create({
  box: { borderLeftWidth: 3, borderRadius: 8, padding: 10, gap: 3 },
  label: { fontFamily: "Inter_700Bold", fontSize: 11, letterSpacing: 0.4 },
  text:  { fontFamily: "Inter_400Regular", fontSize: 12, lineHeight: 18 },
});

function ExampleRow({ label, sentence, explanation }: { label: string; sentence: string; explanation?: string }) {
  const isCerto = label === "CERTO" || label === "Correto" || label === "Exemplo";
  const isErrado = label === "ERRADO" || label === "Incorreto";
  const bg    = isCerto ? "#D1FAE5" : isErrado ? "#FEE2E2" : "#F3F4F6";
  const color = isCerto ? "#065F46" : isErrado ? "#991B1B"  : "#374151";
  const badgeBg = isCerto ? "#10B981" : isErrado ? "#EF4444" : "#6B7280";

  return (
    <View style={[eStyles.row, { backgroundColor: bg, borderColor: badgeBg + "40" }]}>
      <View style={[eStyles.badge, { backgroundColor: badgeBg }]}>
        <Text style={eStyles.badgeText}>{label}</Text>
      </View>
      <Text style={[eStyles.sentence, { color }]}>{sentence}</Text>
      {!!explanation && (
        <Text style={[eStyles.explanation, { color: color + "CC" }]}>↳ {explanation}</Text>
      )}
    </View>
  );
}

const eStyles = StyleSheet.create({
  row:         { borderWidth: 1, borderRadius: 8, padding: 10, gap: 4 },
  badge:       { alignSelf: "flex-start", paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4 },
  badgeText:   { fontFamily: "Inter_700Bold", fontSize: 10, color: "#FFFFFF" },
  sentence:    { fontFamily: "Inter_500Medium", fontSize: 12, lineHeight: 18 },
  explanation: { fontFamily: "Inter_400Regular", fontSize: 11, lineHeight: 17 },
});

function DataTable({ title, headers, rows }: { title?: string; headers: string[]; rows: string[][] }) {
  return (
    <View style={tStyles.wrap}>
      {!!title && <Text style={tStyles.title}>{title}</Text>}
      <View style={tStyles.table}>
        <View style={[tStyles.row, tStyles.headerRow]}>
          {headers.map((h, i) => (
            <Text key={i} style={[tStyles.cell, tStyles.headerCell, { flex: i === 0 ? 1.4 : 1 }]}>{h}</Text>
          ))}
        </View>
        {rows.map((row, ri) => (
          <View key={ri} style={[tStyles.row, ri % 2 === 1 && tStyles.altRow]}>
            {row.map((cell, ci) => (
              <Text key={ci} style={[tStyles.cell, { flex: ci === 0 ? 1.4 : 1, fontFamily: ci === 0 ? "Inter_600SemiBold" : "Inter_400Regular" }]}>{cell}</Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const tStyles = StyleSheet.create({
  wrap:       { gap: 6 },
  title:      { fontFamily: "Inter_600SemiBold", fontSize: 12, color: "#374151" },
  table:      { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, overflow: "hidden" },
  row:        { flexDirection: "row" },
  headerRow:  { backgroundColor: "#F3F4F6" },
  altRow:     { backgroundColor: "#F9FAFB" },
  cell:       { fontSize: 11, lineHeight: 15, padding: 7, color: "#374151", fontFamily: "Inter_400Regular" },
  headerCell: { fontFamily: "Inter_700Bold", color: "#111827" },
});

function ExerciseCardFixed({ question, answer, explanation }: { question: string; answer: string; explanation: string }) {
  const [revealed, setRevealed] = useState(false);
  const isC = answer === "CERTO";
  return (
    <View style={exStyles.wrap}>
      <Text style={exStyles.tag}>📝  Exercício Comentado (CEBRASPE)</Text>
      <Text style={exStyles.question}>{question}</Text>
      <Pressable onPress={() => setRevealed((v) => !v)} style={[exStyles.btn, { backgroundColor: revealed ? (isC ? "#D1FAE5" : "#FEE2E2") : "#EEF2FF" }]}>
        {!revealed ? (
          <Text style={[exStyles.btnText, { color: "#4338CA" }]}>Toque para ver o gabarito</Text>
        ) : (
          <View style={exStyles.answer}>
            <Text style={[exStyles.verdict, { color: isC ? "#065F46" : "#991B1B" }]}>Gabarito: {answer}</Text>
            <Text style={exStyles.exp}>{explanation}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const exStyles = StyleSheet.create({
  wrap:     { gap: 6 },
  tag:      { fontFamily: "Inter_600SemiBold", fontSize: 10, color: "#6B7280", letterSpacing: 0.3 },
  question: { fontFamily: "Inter_400Regular", fontSize: 12, lineHeight: 18, color: "#1F2937" },
  btn:      { borderRadius: 8, padding: 10, minHeight: 40, justifyContent: "center" },
  btnText:  { fontFamily: "Inter_600SemiBold", fontSize: 12, textAlign: "center" },
  answer:   { gap: 4 },
  verdict:  { fontFamily: "Inter_700Bold", fontSize: 13 },
  exp:      { fontFamily: "Inter_400Regular", fontSize: 12, lineHeight: 18, color: "#374151" },
});

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

          {/* Conteúdo principal */}
          <Text style={[styles.contentText, { color: colors.foreground }]}>
            {topic.content}
          </Text>

          {/* Highlight boxes */}
          {topic.highlights && topic.highlights.length > 0 && (
            <View style={styles.section}>
              {topic.highlights.map((h, i) => (
                <HighlightBox key={i} type={h.type} text={h.text} />
              ))}
            </View>
          )}

          {/* Tabelas */}
          {topic.tables && topic.tables.length > 0 && (
            <View style={styles.section}>
              {topic.tables.map((t, i) => (
                <DataTable key={i} title={t.title} headers={t.headers} rows={t.rows} />
              ))}
            </View>
          )}

          {/* Pontos-chave */}
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

          {/* Exemplos CERTO/ERRADO */}
          {topic.examples && topic.examples.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionHeading, { color: colors.mutedForeground }]}>
                EXEMPLOS CERTO / ERRADO
              </Text>
              {topic.examples.map((ex, i) => (
                <ExampleRow key={i} label={ex.label} sentence={ex.sentence} explanation={ex.explanation} />
              ))}
            </View>
          )}

          {/* Exercícios comentados */}
          {topic.exercises && topic.exercises.length > 0 && (
            <View style={styles.section}>
              {topic.exercises.map((ex, i) => (
                <ExerciseCardFixed key={i} question={ex.question} answer={ex.answer} explanation={ex.explanation} />
              ))}
            </View>
          )}
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
          headerBackTitle: "Aula",
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
            Toque em cada tópico para expandir o conteúdo, pontos-chave, exemplos e exercícios comentados.
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
  sectionHeading: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    letterSpacing: 0.8,
  },
  section: {
    gap: 8,
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
