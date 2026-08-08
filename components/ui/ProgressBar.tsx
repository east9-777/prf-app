import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
  label?: string;
}

/**
 * Thin rounded progress bar, matching the pattern used across
 * Estudos, Simulados and Início (a slim green fill + a small
 * percentage/fraction label next to it).
 */
export function ProgressBar({ progress, color, height = 6, label }: ProgressBarProps) {
  const colors = useColors();
  const pct = Math.max(0, Math.min(1, progress));
  const fillColor = color ?? colors.primary;

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.track,
          { height, borderRadius: height / 2, backgroundColor: colors.border },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${pct * 100}%`,
              borderRadius: height / 2,
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
      {label ? (
        <Text style={[styles.label, { color: colors.mutedForeground }]}>{label}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  track: {
    flex: 1,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
  label: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    minWidth: 30,
    textAlign: "right",
  },
});
