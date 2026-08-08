import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

type PillTone = "neutral" | "primary" | "warning" | "destructive";

interface PillProps {
  label: string;
  tone?: PillTone;
  icon?: React.ComponentProps<typeof Feather>["name"];
}

/**
 * Small rounded status badge, used for things like "Peso 3",
 * "Alta incidência", subject tags, etc. Keeps a single consistent
 * shape/typography for every badge in the app instead of each screen
 * re-implementing its own badge styles.
 */
export function Pill({ label, tone = "neutral", icon }: PillProps) {
  const colors = useColors();

  const toneColor =
    tone === "primary"
      ? colors.primary
      : tone === "warning"
      ? colors.warning
      : tone === "destructive"
      ? colors.destructive
      : colors.mutedForeground;

  const toneBg =
    tone === "neutral" ? colors.muted : toneColor + "1F";

  return (
    <View style={[styles.pill, { backgroundColor: toneBg }]}>
      {icon && <Feather name={icon} size={11} color={toneColor} />}
      <Text style={[styles.label, { color: toneColor }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    letterSpacing: 0.2,
  },
});
