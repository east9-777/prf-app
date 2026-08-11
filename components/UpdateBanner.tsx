import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { useAppUpdate } from "@/hooks/useAppUpdate";

export function UpdateBanner() {
  const colors = useColors();
  const router = useRouter();
  const { info, updateAvailable, openUpdate } = useAppUpdate();
  const [dismissed, setDismissed] = useState(false);

  if (!updateAvailable || dismissed || !info) return null;

  return (
    <View style={[styles.card, { backgroundColor: colors.primary }]}>
      <View style={styles.iconWrap}>
        <Feather name="download" size={18} color={colors.primaryForeground} />
      </View>
      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: colors.primaryForeground }]}>
          Nova versão disponível ({info.versaoMaisRecente})
        </Text>
        <Pressable onPress={() => router.push("/novidades" as any)}>
          <Text style={[styles.link, { color: colors.primaryForeground + "DD" }]}>
            Ver o que mudou
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={[styles.actionBtn, { backgroundColor: colors.primaryForeground }]}
        onPress={openUpdate}
      >
        <Text style={[styles.actionText, { color: colors.primary }]}>Atualizar</Text>
      </Pressable>
      <Pressable
        style={styles.closeBtn}
        onPress={() => setDismissed(true)}
        hitSlop={10}
      >
        <Feather name="x" size={16} color={colors.primaryForeground + "CC"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
    padding: 12,
    paddingRight: 30,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: { flex: 1, gap: 2 },
  title: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  link: { fontFamily: "Inter_400Regular", fontSize: 12, textDecorationLine: "underline" },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  actionText: { fontFamily: "Inter_700Bold", fontSize: 12 },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
