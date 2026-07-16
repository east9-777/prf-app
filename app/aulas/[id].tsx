import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import {
  CONTEUDO_SUBJECTS,
  type ExemploItem,
  type Exercicio,
  type HighlightBox,
  type TableData,
  type TopicItem,
} from '@/lib/conteudoData';

/* ── Color tokens type ────────────────────────────────────────────────── */
type Colors = ReturnType<typeof useColors>;

/* ── Highlight configs ────────────────────────────────────────────────── */
const HIGHLIGHT_CONFIG: Record<
  string,
  { label: string; bg: string; border: string; icon: string; text: string }
> = {
  atencao:      { label: '⚠️ Atenção',        bg: '#FFF9C4', border: '#F9A825', icon: 'alert-circle',  text: '#795548' },
  pegadinha:    { label: '🪤 Pegadinha',       bg: '#FDECEA', border: '#E53935', icon: 'alert-triangle', text: '#B71C1C' },
  muito_cobrado:{ label: '🔥 Muito Cobrado',   bg: '#FFF3E0', border: '#FB8C00', icon: 'trending-up',   text: '#E65100' },
  memorize:     { label: '💡 Memorize',        bg: '#E8F5E9', border: '#43A047', icon: 'zap',           text: '#1B5E20' },
  dica_banca:   { label: '🎯 Dica da Banca',   bg: '#E8EAF6', border: '#3949AB', icon: 'target',        text: '#1A237E' },
};

/* ── Sub-components ───────────────────────────────────────────────────── */
function HighlightCard({ box }: { box: HighlightBox }) {
  const cfg = HIGHLIGHT_CONFIG[box.type] ?? HIGHLIGHT_CONFIG.atencao;
  return (
    <View style={[styles.highlightCard, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <Text style={[styles.highlightLabel, { color: cfg.text }]}>{cfg.label}</Text>
      <Text style={[styles.highlightText, { color: cfg.text }]}>{box.text}</Text>
    </View>
  );
}

function ExemploCard({ ex, colors }: { ex: ExemploItem; colors: Colors }) {
  return (
    <View style={[styles.exemploCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {ex.title && <Text style={[styles.exemploTitle, { color: colors.text }]}>{ex.title}</Text>}
      {ex.correct && (
        <View style={styles.exemploRow}>
          <Feather name="check-circle" size={14} color="#22C55E" />
          <Text style={[styles.exemploCorrect]}>{ex.correct}</Text>
        </View>
      )}
      {ex.incorrect && (
        <View style={styles.exemploRow}>
          <Feather name="x-circle" size={14} color="#EF4444" />
          <Text style={[styles.exemploIncorrect]}>{ex.incorrect}</Text>
        </View>
      )}
      <View style={[styles.exemploExplanRow, { borderTopColor: colors.border }]}>
        <Feather name="info" size={13} color="#5C6BC0" style={{ marginTop: 1 }} />
        <Text style={styles.exemploExplan}>{ex.explanation}</Text>
      </View>
    </View>
  );
}

function TableCard({ table, colors }: { table: TableData; colors: Colors }) {
  return (
    <View style={styles.tableWrap}>
      <Text style={[styles.tableTitle, { color: colors.text }]}>{table.title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header */}
          <View style={[styles.tableRow, { backgroundColor: colors.primary + '18' }]}>
            {table.headers.map((h) => (
              <View key={h} style={[styles.tableCell, { borderColor: colors.border }]}>
                <Text style={[styles.tableHeader, { color: colors.text }]}>{h}</Text>
              </View>
            ))}
          </View>
          {/* Rows */}
          {table.rows.map((row, ri) => (
            <View
              key={ri}
              style={[
                styles.tableRow,
                { backgroundColor: ri % 2 === 0 ? colors.card : colors.muted },
              ]}
            >
              {row.map((cell, ci) => (
                <View key={ci} style={[styles.tableCell, { borderColor: colors.border }]}>
                  <Text style={[styles.tableCellText, { color: colors.text }]}>{cell}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function ExercicioCard({ ex, index, colors }: { ex: Exercicio; index: number; colors: Colors }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <View style={[styles.exercicioCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.exercicioNum, { color: colors.primary }]}>Questão {index + 1}</Text>
      {ex.fonte && (
        <Text style={[styles.exercicioFonte, { color: colors.mutedForeground }]}>{ex.fonte}</Text>
      )}
      <Text style={[styles.exercicioEnunciado, { color: colors.text }]}>{ex.enunciado}</Text>

      <View style={{ gap: 8, marginTop: 12 }}>
        {ex.options.map((opt, i) => {
          const isCorrect = i === ex.correctIndex;
          const isSelected = i === selected;
          let bg = colors.background;
          let border = colors.border;
          let textColor = colors.text;
          if (answered && isCorrect) { bg = '#22C55E18'; border = '#22C55E66'; textColor = '#22C55E'; }
          if (answered && isSelected && !isCorrect) { bg = '#EF444418'; border = '#EF444466'; textColor = '#EF4444'; }
          return (
            <Pressable
              key={i}
              onPress={() => !answered && setSelected(i)}
              style={[styles.optionBtn, { backgroundColor: bg, borderColor: border }]}
            >
              <View style={[styles.optionLetterBox, {
                backgroundColor: answered && isCorrect
                  ? '#22C55E33'
                  : answered && isSelected && !isCorrect
                  ? '#EF444433'
                  : colors.muted,
              }]}>
                <Text style={[styles.optionLetter, { color: textColor }]}>
                  {String.fromCharCode(65 + i)}
                </Text>
              </View>
              <Text style={[styles.optionLabel, { color: textColor, flex: 1 }]}>{opt}</Text>
              {answered && isCorrect && <Feather name="check-circle" size={14} color="#22C55E" />}
              {answered && isSelected && !isCorrect && <Feather name="x-circle" size={14} color="#EF4444" />}
            </Pressable>
          );
        })}
      </View>

      {answered && (
        <View style={[styles.explanationBox, { backgroundColor: colors.primary + '12', borderColor: colors.primary + '30' }]}>
          <Feather name="message-circle" size={14} color={colors.primary} />
          <Text style={[styles.explanationText, { color: colors.text }]}>{ex.explanation}</Text>
        </View>
      )}
      {!answered && (
        <Text style={[styles.tapHint, { color: colors.mutedForeground }]}>
          Toque em uma opção para responder
        </Text>
      )}
    </View>
  );
}

/* ── Topic section (expandable) ──────────────────────────────────────── */
function TopicSection({
  topic,
  subjectColor,
  colors,
}: {
  topic: TopicItem;
  subjectColor: string;
  colors: Colors;
}) {
  const [expanded, setExpanded] = useState(false);
  const incidenciaColor =
    topic.incidencia === 'alta' ? '#EF4444' : topic.incidencia === 'média' ? '#F59E0B' : '#6B7280';
  const incidenciaLabel =
    topic.incidencia === 'alta' ? '🔥 Alta' : topic.incidencia === 'média' ? '⚡ Média' : 'Baixa';

  return (
    <View style={styles.topicSection}>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        style={[
          styles.topicHeader,
          {
            borderColor: expanded ? subjectColor : colors.border,
            backgroundColor: expanded ? subjectColor + '10' : colors.card,
          },
        ]}
      >
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={[styles.topicTitle, { color: colors.text }]}>{topic.title}</Text>
          <View style={[styles.incidenciaBadge, { backgroundColor: incidenciaColor + '18' }]}>
            <Text style={[styles.incidenciaText, { color: incidenciaColor }]}>
              Incidência: {incidenciaLabel}
            </Text>
          </View>
        </View>
        <Feather
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.mutedForeground}
        />
      </Pressable>

      {expanded && (
        <View style={[styles.topicBody, { backgroundColor: colors.background }]}>
          {/* Content */}
          <Text style={[styles.topicContent, { color: colors.text }]}>{topic.content}</Text>

          {/* Key Points */}
          {topic.keyPoints && topic.keyPoints.length > 0 && (
            <View style={styles.keyPointsWrap}>
              <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
                PONTOS-CHAVE
              </Text>
              {topic.keyPoints.map((kp, i) => (
                <View key={i} style={styles.keyPointRow}>
                  <View style={[styles.dot, { backgroundColor: subjectColor }]} />
                  <Text style={[styles.keyPointText, { color: colors.text }]}>{kp}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Highlights */}
          {topic.highlights?.map((box, i) => <HighlightCard key={i} box={box} />)}

          {/* Tables */}
          {topic.tables?.map((t, i) => <TableCard key={i} table={t} colors={colors} />)}

          {/* Examples */}
          {topic.examples && topic.examples.length > 0 && (
            <View>
              <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>EXEMPLOS</Text>
              {topic.examples.map((ex, i) => (
                <ExemploCard key={i} ex={ex} colors={colors} />
              ))}
            </View>
          )}

          {/* Exercises */}
          {topic.exercises && topic.exercises.length > 0 && (
            <View>
              <View style={[styles.exerciseLabelRow, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '25' }]}>
                <Feather name="edit-3" size={13} color={colors.primary} />
                <Text style={[styles.sectionLabel, { color: colors.primary, marginBottom: 0 }]}>
                  EXERCÍCIOS COMENTADOS (CEBRASPE)
                </Text>
              </View>
              {topic.exercises.map((ex, i) => (
                <ExercicioCard key={i} ex={ex} index={i} colors={colors} />
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

/* ── Main screen ──────────────────────────────────────────────────────── */
export default function AulaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const subject = CONTEUDO_SUBJECTS.find((s) => s.id === id);

  if (!subject) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Stack.Screen options={{ title: 'Aula' }} />
        <Text style={{ color: colors.text, fontFamily: 'Inter_400Regular' }}>
          Matéria não encontrada.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: subject.name,
          headerTintColor: subject.color,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + (Platform.OS === 'web' ? 34 : 16) + 80 },
        ]}
      >
        {/* Subject header */}
        <View
          style={[
            styles.subjectBanner,
            { backgroundColor: subject.color + '14', borderColor: subject.color + '30' },
          ]}
        >
          <View style={[styles.bannerIcon, { backgroundColor: subject.color + '22' }]}>
            <Feather name={subject.icon as any} size={28} color={subject.color} />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text style={[styles.bannerTitle, { color: subject.color }]}>{subject.name}</Text>
            <Text style={[styles.bannerDesc, { color: colors.mutedForeground }]}>
              {subject.description}
            </Text>
            <Text style={[styles.bannerTopicCount, { color: colors.mutedForeground }]}>
              {subject.topics.length} tópicos
            </Text>
          </View>
        </View>

        {/* Content disclaimer */}
        <View style={[styles.disclaimerBox, { backgroundColor: '#F59E0B18', borderColor: '#F59E0B44' }]}>
          <Feather name="alert-circle" size={14} color="#F59E0B" />
          <Text style={[styles.disclaimerText, { color: colors.text }]}>
            <Text style={{ fontFamily: 'Inter_600SemiBold' }}>Conteúdo de referência: </Text>
            este material cobre os principais pontos do edital, mas não é exaustivo. Complemente com o edital oficial, legislação e outras fontes.
          </Text>
        </View>

        {/* Topics */}
        {subject.topics.map((topic) => (
          <TopicSection
            key={topic.id}
            topic={topic}
            subjectColor={subject.color}
            colors={colors}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12 },

  // Banner
  subjectBanner: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bannerIcon: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  bannerTitle: { fontFamily: 'Inter_700Bold', fontSize: 16 },
  bannerDesc: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17 },
  bannerTopicCount: { fontFamily: 'Inter_500Medium', fontSize: 11 },

  // Disclaimer
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 4,
  },
  disclaimerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    lineHeight: 17,
    flex: 1,
  },

  // Topic section
  topicSection: { borderRadius: 12, overflow: 'hidden', marginBottom: 2 },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
  },
  topicTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  incidenciaBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  incidenciaText: { fontFamily: 'Inter_500Medium', fontSize: 10 },

  // Topic body
  topicBody: { paddingHorizontal: 4, gap: 14, paddingBottom: 8, marginTop: 8 },
  topicContent: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
  },

  // Section labels
  sectionLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },

  // Exercise label row
  exerciseLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },

  // Key points
  keyPointsWrap: { gap: 6 },
  keyPointRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  keyPointText: { fontFamily: 'Inter_400Regular', fontSize: 13, flex: 1, lineHeight: 20 },

  // Highlight
  highlightCard: {
    padding: 13,
    borderRadius: 10,
    borderLeftWidth: 4,
    gap: 4,
  },
  highlightLabel: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  highlightText: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 19 },

  // Example
  exemploCard: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 13,
    gap: 7,
    marginBottom: 6,
  },
  exemploTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  exemploRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  exemploCorrect: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#22C55E', flex: 1, lineHeight: 19 },
  exemploIncorrect: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#EF4444', flex: 1, lineHeight: 19 },
  exemploExplanRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    alignItems: 'flex-start',
  },
  exemploExplan: { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#5C6BC0', flex: 1, lineHeight: 18 },

  // Table
  tableWrap: { gap: 8 },
  tableTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 12, marginBottom: 4 },
  tableRow: { flexDirection: 'row' },
  tableCell: { width: 160, padding: 8, borderWidth: StyleSheet.hairlineWidth },
  tableHeader: { fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  tableCellText: { fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 15 },

  // Exercise
  exercicioCard: {
    borderRadius: 12,
    padding: 14,
    gap: 4,
    borderWidth: 1,
    marginBottom: 8,
  },
  exercicioNum: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  exercicioFonte: { fontFamily: 'Inter_400Regular', fontSize: 10 },
  exercicioEnunciado: { fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20, marginTop: 4 },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
  },
  optionLetterBox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetter: { fontFamily: 'Inter_700Bold', fontSize: 12 },
  optionLabel: { fontFamily: 'Inter_400Regular', fontSize: 13 },
  explanationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginTop: 8,
  },
  explanationText: { fontFamily: 'Inter_400Regular', fontSize: 12, flex: 1, lineHeight: 18 },
  tapHint: { fontFamily: 'Inter_400Regular', fontSize: 11, textAlign: 'center', marginTop: 6 },
});
