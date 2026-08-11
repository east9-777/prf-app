import React from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useAppUpdate } from "@/hooks/useAppUpdate";

export default function NovidadesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { currentVersion, info, loading, updateAvailable, openUpdate } =
    useAppUpdate();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Novidades",
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
        <View style={[styles.versionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.versionLabel, { color: colors.mutedForeground }]}>
            Versão instalada
          </Text>
          <Text style={[styles.versionValue, { color: colors.text }]}>
            {currentVersion}
          </Text>
        </View>

        {loading && (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.mutedForeground }]}>
              Verificando atualizações...
            </Text>
          </View>
        )}

        {!loading && !info && (
          <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="wifi-off" size={20} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Não foi possível verificar novidades agora. Confira sua conexão e tente novamente mais tarde.
            </Text>
          </View>
        )}

        {!loading && info && updateAvailable && (
          <Pressable
            style={[styles.updateCard, { backgroundColor: colors.primary }]}
            onPress={openUpdate}
          >
            <Feather name="download" size={18} color={colors.primaryForeground} />
            <Text style={[styles.updateText, { color: colors.primaryForeground }]}>
              Atualizar para a versão {info.versaoMaisRecente}
            </Text>
          </Pressable>
        )}

        {!loading && info && (
          <>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              {updateAvailable ? "O que mudou nessa versão" : "Última atualização"}
            </Text>
            <View style={[styles.changesCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.changesHeader}>
                <Text style={[styles.changesVersion, { color: colors.text }]}>
                  Versão {info.versaoMaisRecente}
                </Text>
                <Text style={[styles.changesDate, { color: colors.mutedForeground }]}>
                  {info.dataLancamento}
                </Text>
              </View>
              {info.novidades.map((item, i) => (
                <View key={i} style={styles.changeItem}>
                  <Text style={{ color: colors.primary }}>•</Text>
                  <Text style={[styles.changeText, { color: colors.foreground }]}>{item}</Text>
                </View>
              ))}
            </View>

            {info.historico?.length > 0 && (
              <>
                <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
                  Histórico de versões
                </Text>
                {info.historico.map((entry) => (
                  <View
                    key={entry.versao}
                    style={[styles.changesCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  >
                    <View style={styles.changesHeader}>
                      <Text style={[styles.changesVersion, { color: colors.text }]}>
                        Versão {entry.versao}
                      </Text>
                      <Text style={[styles.changesDate, { color: colors.mutedForeground }]}>
                        {entry.data}
                      </Text>
                    </View>
                    {entry.novidades.map((item, i) => (
                      <View key={i} style={styles.changeItem}>
                        <Text style={{ color: colors.mutedForeground }}>•</Text>
                        <Text style={[styles.changeText, { color: colors.foreground }]}>{item}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 16 },
  versionCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 4,
  },
  versionLabel: { fontFamily: "Inter_500Medium", fontSize: 12 },
  versionValue: { fontFamily: "Inter_700Bold", fontSize: 22 },
  loadingWrap: { alignItems: "center", gap: 8, paddingVertical: 20 },
  loadingText: { fontFamily: "Inter_400Regular", fontSize: 13 },
  emptyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  emptyText: { flex: 1, fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 19 },
  updateCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    padding: 14,
  },
  updateText: { fontFamily: "Inter_700Bold", fontSize: 14 },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
    marginLeft: 4,
  },
  changesCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  changesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changesVersion: { fontFamily: "Inter_700Bold", fontSize: 15 },
  changesDate: { fontFamily: "Inter_400Regular", fontSize: 12 },
  changeItem: { flexDirection: "row", gap: 8 },
  changeText: { flex: 1, fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 19 },
});
