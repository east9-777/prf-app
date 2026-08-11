import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useDisplayName } from "@/hooks/useDisplayName";
import { UpdateBanner } from "@/components/UpdateBanner";

export default function InicioScreen() {
  const colors = useColors();
  const { displayName } = useDisplayName();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const cards = [
    {
      icon: "book-open" as const,
      title: "Estudos",
      desc: "Acesse os conteúdos e materiais de estudo",
      route: "/(tabs)/estudos",
      color: "#3B82F6",
    },
    {
      icon: "layers" as const,
      title: "Conteúdo",
      desc: "Teoria completa das matérias do edital",
      route: "/(tabs)/conteudo",
      color: "#6366F1",
    },
    {
      icon: "clipboard" as const,
      title: "Simulados",
      desc: "Teste seus conhecimentos com simulados",
      route: "/(tabs)/simulados",
      color: "#10B981",
    },
    {
      icon: "calendar" as const,
      title: "Cronograma",
      desc: "Organize sua rotina de estudos",
      route: "/cronograma",
      color: "#F59E0B",
    },
    {
      icon: "flag" as const,
      title: "Etapas do Concurso",
      desc: "Conheça todas as fases do concurso",
      route: "/etapas",
      color: "#8B5CF6",
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
        <View style={[styles.welcome, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.greeting, { color: colors.mutedForeground }]}>
            Olá, {displayName || "candidato"} 👋
          </Text>
          <Text style={[styles.welcomeTitle, { color: colors.text }]}>
            Bem-vindo ao{"\n"}
            <Text style={{ color: colors.primary }}>Aprovação PRF</Text>
          </Text>
          <Text style={[styles.welcomeDesc, { color: colors.mutedForeground }]}>
            Sinta o orgulho do dia da sua posse! 👮‍♂️ Estude hoje para vencer amanhã! ⚡
          </Text>
        </View>

        <UpdateBanner />

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          ACESSO RÁPIDO
        </Text>

        <View style={styles.grid}>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.route}
              style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => router.push(card.route as any)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconWrap, { backgroundColor: card.color + "22" }]}>
                <Feather name={card.icon} size={22} color={card.color} />
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
  welcome: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 6,
  },
  greeting: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
  welcomeTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  welcomeDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase",
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
