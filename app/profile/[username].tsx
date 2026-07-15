import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "@/components/Avatar";
import { useColors } from "@/hooks/useColors";

export default function UserProfileScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: username ? `@${username}` : "Perfil",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24 },
        ]}
      >
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Avatar uri={undefined} name={username} size="xl" />
          <Text style={[styles.username, { color: colors.text }]}>
            @{username}
          </Text>
        </View>

        <View style={[styles.infoSection, { borderColor: colors.border }]}>
          <View style={styles.infoItem}>
            <Feather name="user" size={16} color={colors.mutedForeground} />
            <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
              Candidato PRF
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {},
  header: {
    padding: 24,
    alignItems: "center",
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  username: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    letterSpacing: -0.3,
  },
  infoSection: {
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
});
