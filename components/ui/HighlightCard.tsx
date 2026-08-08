import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface HighlightCardProps {
  eyebrow: string;
  title: string;
  progressLabel?: string;
  progress?: number;
  onPress?: () => void;
}

/**
 * Filled brand-colored card used to draw the eye to a single
 * "keep going" action (e.g. overall study progress, next simulado).
 * Mirrors the black "current item" card pattern seen in reference
 * apps, adapted to this app's green identity instead of black.
 */
export function HighlightCard({
  eyebrow,
  title,
  progressLabel,
  progress,
  onPress,
}: HighlightCardProps) {
  const colors = useColors();

  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      style={({ pressed }: any) => [
        styles.card,
        { backgroundColor: colors.primary },
        pressed && onPress ? { opacity: 0.92 } : null,
      ]}
      onPress={onPress}
    >
      <View style={styles.top}>
        <Text style={[styles.eyebrow, { color: colors.primaryForeground + "CC" }]}>
          {eyebrow}
        </Text>
        {onPress && (
          <Feather name="arrow-right" size={16} color={colors.primaryForeground} />
        )}
      </View>
      <Text style={[styles.title, { color: colors.primaryForeground }]}>{title}</Text>
      {progress !== undefined && (
        <View style={styles.progressWrap}>
          <ProgressBar
            progress={progress}
            color={colors.primaryForeground}
            height={6}
          />
          {progressLabel && (
            <Text style={[styles.progressLabel, { color: colors.primaryForeground + "DD" }]}>
              {progressLabel}
            </Text>
          )}
        </View>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 18,
    gap: 10,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eyebrow: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 19,
    lineHeight: 25,
  },
  progressWrap: {
    gap: 4,
  },
  progressLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
});
