import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const SIZES = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80 };

export function Avatar({ uri, name, size = "md" }: AvatarProps) {
  const colors = useColors();
  const sz = SIZES[size];
  const initials = name
    ? name
        .replace("@", "")
        .split(/[\s_]/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("")
    : "?";

  const style = {
    width: sz,
    height: sz,
    borderRadius: sz / 2,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
  };

  if (uri) {
    return <Image source={{ uri }} style={[styles.base, style]} />;
  }

  return (
    <View style={[styles.base, style, styles.fallback, { backgroundColor: colors.primary + "22" }]}>
      <Text
        style={[
          styles.initials,
          { fontSize: sz * 0.35, color: colors.primary },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
  },
  fallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontFamily: "Inter_700Bold",
  },
});
