import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { useColors } from "@/hooks/useColors";

/**
 * Small uppercase eyebrow label used to introduce a section
 * ("MATÉRIAS", "ACESSO RÁPIDO", etc). Consolidates a style that
 * was previously copy-pasted into every screen's StyleSheet.
 */
export function SectionLabel({ style, ...props }: TextProps) {
  const colors = useColors();
  return (
    <Text
      style={[styles.label, { color: colors.mutedForeground }, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});
