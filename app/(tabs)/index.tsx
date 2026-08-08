import React, { useCallback, useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { HighlightCard } from "@/components/ui/HighlightCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MOCK_SUBJECTS } from "@/lib/mockData";
import { getData, STORAGE_KEYS } from "@/lib/storage";
import type { Subject } from "@/lib/types";

type ProgressMap = Record<string, boolean>;

export default function InicioScreen() {
  const colors = useColors();
  const { user } = useAuth();
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

  const totalProgress = useMemo(() => {
    let done = 0;
    let total = 0;
    MOCK_SUBJECTS.forEach((s: Subject) => {
      total += s.topics.length;
      done += s.topics.filter((t) => !!progress[t.id]).length;
    });
    return { done, total, pct: total > 0 ? done / total : 0 };
  }, [progress]);

  const cards = [
    {
      icon: "book-open" as const,
      title: "Estudos",
      desc: "Acesse os conteúdos e materiais de estudo",
      route: "/(tabs)/estudos",
    },
    {
      icon: "layers" as const,
      title: "Conteúdo",
      desc: "Teoria completa das matérias do edital",
      route: "/(tabs)/conteudo",
    },
    {
      icon: "clipboard" as const,
      title: "Simulados",
      desc: "Teste seus conhecimentos com simulados",
      route: "/(tabs)/simulados",
    },
    {
      icon: "calendar" as const,
      title: "Cronograma",
      desc: "Organize sua rotina de estudos",
      route: "/cronograma",
    },
    {
      icon: "flag" as const,
      title: "Etapas do Concurso",
      desc: "Conheça todas as fases do concurso",
      route: "/etapas",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24 },
        ]}
      >
        <Text style={[styles.greeting, { color: colors.mutedForeground }]}>
          Olá, {user?.username ? `@${user.username}` : "candidato"} 👋
        </Text>
        <Text style={[styles.welcomeTitle, { color: colors.text }]}>
          Bem-vindo ao{" "}
          <Text style={{ color: colors.primary }}>Project P.R.F</Text>
        </Text>

        <HighlightCard
          eyebrow="Seu progresso"
          title={
            totalProgress.total > 0
              ? `Você já concluiu ${totalProgress.done} de ${totalProgress.total} assuntos`
              : "Comece agora seus estudos"
          }
          progress={totalProgress.pct}
          progressLabel={`${Math.round(totalProgress.pct * 100)}% do edital concluído`}
          onPress={() => router.push("/(tabs)/estudos" as any)}
        />

        <SectionLabel style={styles.sectionLabel}>Acesso rápido</SectionLabel>

        <View style={styles.grid}>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.route}
              style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push(card.route as any)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconWrap, { backgroundColor: colors.primarySoft }]}>
                <Feather name={card.icon} size={22} color={colors.primary} />
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{card.title}</Text>
              <Text style={[styles.cardDesc, { color: colors.mutedForeground }]} numberOfLines={2}>
                {card.desc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 16 },
  greeting: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    marginLeft: 2,
  },
  welcomeTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.5,
    marginLeft: 2,
    marginBottom: 4,
  },
  sectionLabel: {
    marginLeft: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "47%",
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  cardDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 17,
  },
});
