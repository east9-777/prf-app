import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const STAGES = [
  {
    id: "objetiva",
    number: "01",
    title: "Prova Objetiva",
    icon: "edit-2" as const,
    color: "#1565C0",
    description: "Prova de múltipla escolha abrangendo todas as matérias do edital. Realizada pelo CEBRASPE com o método certo-errado.",
    criteria: [
      "Questões de múltipla escolha (Certo/Errado)",
      "Organizada pelo CEBRASPE",
      "Questões erradas anulam questões certas",
      "Nota mínima de 50% para aprovação",
    ],
    tips: [
      "Leia atentamente cada assertiva",
      "Fique atento às palavras 'sempre', 'nunca', 'apenas', 'somente'",
      "Essas palavras frequentemente tornam a alternativa errada",
      "Resolva muitas questões de provas anteriores",
    ],
  },
  {
    id: "discursiva",
    number: "02",
    title: "Prova Discursiva",
    icon: "file-text" as const,
    color: "#6366F1",
    description: "Redação dissertativa sobre tema relevante às atribuições da PRF. Avalia capacidade de argumentação e domínio da língua portuguesa.",
    criteria: [
      "Dissertação sobre tema proposto",
      "Extensão entre 20 e 30 linhas",
      "Avalia argumentação, coesão e gramática",
      "Nota mínima de 30% para prosseguir",
    ],
    tips: [
      "Leia muitos artigos sobre segurança pública",
      "Pratique redação regularmente",
      "Organize: Introdução, Desenvolvimento, Conclusão",
      "Use vocabulário técnico da área policial",
    ],
  },
  {
    id: "taf",
    number: "03",
    title: "TAF – Teste de Aptidão Física",
    icon: "activity" as const,
    color: "#EF4444",
    description: "Avaliação da aptidão física dos candidatos. Testes específicos para homens e mulheres. Caráter eliminatório.",
    criteria: [
      "Corrida de 12 minutos (Teste de Cooper)",
      "Homens: mínimo 2.301 metros",
      "Mulheres: mínimo 2.001 metros",
      "Barra fixa (homens): mínimo 3 repetições",
      "Suspensão na barra fixa (mulheres): queixo acima da barra por, no mínimo, 10 segundos",
      "Abdominal em 1 minuto: mínimo varia por sexo e faixa etária (consulte a tabela do edital vigente)",
      "Shuttle run (teste de ir e vir): avalia agilidade",
      "Impulsão horizontal (salto em distância parado): avalia potência muscular",
    ],
    tips: [
      "Comece o treino com pelo menos 6 meses de antecedência",
      "Treine corrida 3-4x por semana",
      "Combine aeróbico com força",
      "Faça treinos de simulação do teste para adaptar ao formato",
    ],
    eliminationReasons: [
      "Não completar a distância mínima na corrida",
      "Não completar as repetições mínimas",
      "Descumprir as normas de execução dos exercícios",
      "Não comparecer ou se retirar antes do término",
    ],
  },
  {
    id: "medica",
    number: "04",
    title: "Avaliação Médica",
    icon: "heart" as const,
    color: "#EC4899",
    description: "Exame médico para verificar se o candidato possui condições físicas e mentais compatíveis com as atribuições da PRF.",
    criteria: [
      "Exames laboratoriais completos",
      "Avaliação cardiorrespiratória",
      "Avaliação oftalmológica",
      "Avaliação psicológica",
      "Exame toxicológico",
    ],
    tips: [
      "Mantenha hábitos saudáveis durante toda a preparação",
      "Evite consumo de álcool e substâncias ilícitas",
      "Faça check-up médico preventivo",
      "Informe quaisquer condições médicas preexistentes",
    ],
  },
  {
    id: "investigacao",
    number: "05",
    title: "Investigação Social",
    icon: "search" as const,
    color: "#F59E0B",
    description: "Investigação da vida pregressa do candidato para verificar se possui conduta compatível com o cargo de Policial Rodoviário Federal.",
    criteria: [
      "Verificação de antecedentes criminais",
      "Análise de conduta moral e social",
      "Verificação de vínculos com organizações criminosas",
      "Análise de histórico financeiro",
      "Entrevistas com referências pessoais",
    ],
    tips: [
      "Mantenha um histórico limpo e transparente",
      "Evite envolvimento em situações comprometedoras",
      "Declare todos os bens e rendimentos corretamente",
      "Seja honesto em todas as declarações",
    ],
  },
  {
    id: "cfp",
    number: "06",
    title: "CFP – Curso de Formação Profissional",
    icon: "shield" as const,
    color: "#059669",
    description: "Curso de formação realizado na Academia Nacional da PRF (ANPRF) em Florianópolis/SC. Duração de aproximadamente 6 meses.",
    criteria: [
      "Curso presencial e em regime de internato",
      "Avaliações teóricas e práticas",
      "Treinamento com armamento",
      "Direção defensiva e em emergência",
      "Aprovação em todas as disciplinas",
    ],
    tips: [
      "Mantenha o condicionamento físico durante toda a preparação",
      "Estude legislação policial básica antecipadamente",
      "Organize suas finanças para o período de formação",
      "Prepare-se mentalmente para o regime disciplinar",
    ],
  },
  {
    id: "posse",
    number: "07",
    title: "Posse e Exercício",
    icon: "award" as const,
    color: "#0891B2",
    description: "Etapa final. Após aprovação em todas as fases anteriores, o candidato é empossado e entra em efetivo exercício como Policial Rodoviário Federal.",
    criteria: [
      "Apresentação dos documentos exigidos",
      "Assinatura do termo de posse",
      "Início do estágio probatório de 3 anos",
      "Lotação em uma das unidades da PRF no Brasil",
    ],
    tips: [
      "Organize toda a documentação com antecedência",
      "Esteja preparado para ser lotado em qualquer UF do país",
      "Inicie o período de estágio probatório com dedicação",
      "A carreira PRF é uma das mais bem remuneradas da segurança pública",
    ],
  },
];

export default function EtapasScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<string | null>("objetiva");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Etapas do Concurso",
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
        <View style={[styles.banner, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="flag" size={18} color={colors.primary} />
          <Text style={[styles.bannerText, { color: colors.mutedForeground }]}>
            O concurso da PRF possui {STAGES.length} etapas. Todas são eliminatórias.
          </Text>
        </View>

        {STAGES.map((stage, idx) => {
          const isOpen = expanded === stage.id;
          return (
            <View key={stage.id}>
              {idx > 0 && (
                <View style={[styles.connector, { backgroundColor: colors.border }]} />
              )}
              <TouchableOpacity
                style={[
                  styles.stageHeader,
                  {
                    backgroundColor: isOpen ? colors.card : colors.background,
                    borderColor: isOpen ? stage.color : colors.border,
                  },
                ]}
                onPress={() => setExpanded(isOpen ? null : stage.id)}
              >
                <View
                  style={[
                    styles.numberBadge,
                    { backgroundColor: stage.color + "20", borderColor: stage.color + "40" },
                  ]}
                >
                  <Text style={[styles.numberText, { color: stage.color }]}>
                    {stage.number}
                  </Text>
                </View>
                <View style={styles.stageTitleWrap}>
                  <Feather name={stage.icon} size={16} color={stage.color} />
                  <Text style={[styles.stageTitle, { color: colors.text }]}>
                    {stage.title}
                  </Text>
                </View>
                <Feather
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={colors.mutedForeground}
                />
              </TouchableOpacity>

              {isOpen && (
                <View
                  style={[
                    styles.stageBody,
                    {
                      backgroundColor: colors.card,
                      borderColor: stage.color,
                    },
                  ]}
                >
                  <Text style={[styles.bodyDesc, { color: colors.foreground }]}>
                    {stage.description}
                  </Text>

                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: stage.color }]}>
                      Critérios
                    </Text>
                    {stage.criteria.map((c, i) => (
                      <View key={i} style={styles.bullet}>
                        <Feather name="check-circle" size={13} color={stage.color} />
                        <Text style={[styles.bulletText, { color: colors.foreground }]}>
                          {c}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {stage.eliminationReasons && (
                    <View style={styles.section}>
                      <Text style={[styles.sectionTitle, { color: "#F85149" }]}>
                        Motivos de eliminação
                      </Text>
                      {stage.eliminationReasons.map((r, i) => (
                        <View key={i} style={styles.bullet}>
                          <Feather name="x-circle" size={13} color="#F85149" />
                          <Text style={[styles.bulletText, { color: colors.foreground }]}>
                            {r}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                  <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: "#D29922" }]}>
                      Dicas
                    </Text>
                    {stage.tips.map((t, i) => (
                      <View key={i} style={styles.bullet}>
                        <Feather name="star" size={13} color="#D29922" />
                        <Text style={[styles.bulletText, { color: colors.foreground }]}>
                          {t}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 0 },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
  bannerText: { fontFamily: "Inter_400Regular", fontSize: 13, flex: 1, lineHeight: 18 },
  connector: {
    width: 2,
    height: 16,
    marginLeft: 27,
  },
  stageHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  numberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: { fontFamily: "Inter_700Bold", fontSize: 14 },
  stageTitleWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stageTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  stageBody: {
    borderLeftWidth: 3,
    borderRadius: 0,
    marginLeft: 8,
    padding: 16,
    gap: 14,
    borderWidth: 0,
    marginBottom: 2,
  },
  bodyDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
  section: { gap: 8 },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  bulletText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
  },
});
