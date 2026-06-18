import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { UserRole } from "@/lib/types";
import { useColors } from "@/hooks/useColors";

interface RoleBadgeProps {
  role: UserRole;
  size?: "sm" | "md";
}

const LABELS: Record<UserRole, string> = {
  usuario: "Usuário",
  instrutor: "Instrutor",
  administrador: "Admin",
};

export function RoleBadge({ role, size = "sm" }: RoleBadgeProps) {
  const colors = useColors();

  const bgColor =
    role === "administrador"
      ? colors.admin + "22"
      : role === "instrutor"
      ? colors.instructor + "22"
      : colors.muted;

  const textColor =
    role === "administrador"
      ? colors.admin
      : role === "instrutor"
      ? colors.instructor
      : colors.mutedForeground;

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Text
        style={[
          styles.text,
          { color: textColor, fontSize: size === "sm" ? 10 : 12 },
        ]}
      >
        {LABELS[role]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
  },
  text: {
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.2,
  },
});
