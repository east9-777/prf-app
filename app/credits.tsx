import React from "react";
import {
  Image,
  Linking,
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

export default function CreditsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Créditos",
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
        <View style={styles.logoSection}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.appName, { color: colors.text }]}>
            Project P.R.F
          </Text>
          <Text style={[styles.version, { color: colors.mutedForeground }]}>
            Versão 1.0.0
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.mutedForeground }]}>
            DESENVOLVIDO POR
          </Text>

          <View style={styles.devSection}>
            <View
              style={[
                styles.devAvatar,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <Text style={[styles.devInitial, { color: colors.primary }]}>L</Text>
            </View>
            <View>
              <Text style={[styles.devName, { color: colors.text }]}>
                Leivison
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://instagram.com/leivison_7")
                }
                style={styles.instaRow}
              >
                <Feather name="instagram" size={14} color={colors.primary} />
                <Text style={[styles.instaText, { color: colors.primary }]}>
                  @leivison_7
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.mutedForeground }]}>
            SOBRE O PROJETO
          </Text>
          <Text style={[styles.description, { color: colors.foreground }]}>
            "Projeto desenvolvido para auxiliar candidatos da Polícia Rodoviária Federal em sua preparação para o concurso."
          </Text>
        </View>

        <View style={styles.features}>
          {[
            "Conteúdo de estudo organizado por matérias",
            "Simulados com questões reais",
            "Acompanhamento das etapas do concurso",
            "Cronograma de estudos personalizado",
          ].map((f) => (
            <View key={f} style={styles.featureItem}>
              <Feather name="check" size={14} color={colors.primary} />
              <Text style={[styles.featureText, { color: colors.mutedForeground }]}>
                {f}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.copyright, { color: colors.mutedForeground }]}>
          © 2025 Project P.R.F{"\n"}Todos os direitos reservados
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 24, gap: 20 },
  logoSection: { alignItems: "center", gap: 10, paddingVertical: 8 },
  logo: { width: 100, height: 120 },
  appName: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    letterSpacing: -0.5,
  },
  version: { fontFamily: "Inter_400Regular", fontSize: 13 },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    gap: 12,
  },
  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
  },
  devSection: { flexDirection: "row", alignItems: "center", gap: 14 },
  devAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  devInitial: { fontFamily: "Inter_700Bold", fontSize: 22 },
  devName: { fontFamily: "Inter_700Bold", fontSize: 17 },
  instaRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 4 },
  instaText: { fontFamily: "Inter_500Medium", fontSize: 13 },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    lineHeight: 23,
    fontStyle: "italic",
  },
  features: { gap: 8 },
  featureItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureText: { fontFamily: "Inter_400Regular", fontSize: 14, flex: 1 },
  copyright: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
