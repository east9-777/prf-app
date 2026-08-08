import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface Stat {
  value: string;
  label: string;
  color?: string;
}

interface StatSummaryCardProps {
  stats: Stat[];
  progress?: number; // 0 to 1, renders a bar under the stats when provided
}

/**
 * Card with N stat columns (number + label) separated by dividers,
 * with an optional progress bar underneath. Used by Estudos
 * (concluídos/pendentes/%) and Simulados (concluídos/média).
 */
export function StatSummaryCard({ stats, progress }: StatSummaryCardProps) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.row}>
        {stats.map((stat, i) => (
          <React.Fragment key={stat.label}>
            {i > 0 && (
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            )}
            <View style={styles.item}>
              <Text style={[styles.value, { color: stat.color ?? colors.text }]}>
                {stat.value}
              </Text>
              <Text style={[styles.label, { color: colors.mutedForeground }]}>
                {stat.label}
              </Text>
            </View>
          </React.Fragment>
        ))}
      </View>
      {progress !== undefined && (
        <ProgressBar progress={progress} height={6} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  value: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
  },
  label: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    textAlign: "center",
  },
  divider: {
    width: 1,
    height: 36,
    marginHorizontal: 4,
  },
});
