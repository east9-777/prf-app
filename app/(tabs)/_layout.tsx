import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerMenu } from "@/components/DrawerMenu";
import { useColors } from "@/hooks/useColors";

function PRFHeader({ onMenuPress, onSearchPress }: { onMenuPress: () => void; onSearchPress: () => void }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top + 8 + (Platform.OS === "web" ? 67 : 0),
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onMenuPress}
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
      >
        <Feather name="menu" size={22} color={colors.text} />
      </TouchableOpacity>

      <Text style={[styles.headerTitle, { color: colors.text }]}>
        Project <Text style={{ color: colors.primary }}>P.R.F</Text>
      </Text>

      <TouchableOpacity
        onPress={onSearchPress}
        hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
      >
        <Feather name="search" size={22} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

export default function TabLayout() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const TAB_BAR_HEIGHT = 56;

  return (
    <>
      <DrawerMenu
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.mutedForeground,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            elevation: 0,
            shadowOpacity: 0,
            height: Platform.OS === "web"
              ? 84
              : TAB_BAR_HEIGHT + insets.bottom,
            paddingBottom: Platform.OS === "web" ? 0 : insets.bottom,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontFamily: "Inter_500Medium",
            fontSize: 10,
            marginBottom: 2,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            header: () => (
              <PRFHeader
                onMenuPress={() => setDrawerOpen(true)}
                onSearchPress={() => router.push("/search" as any)}
              />
            ),
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="estudos"
          options={{
            title: "Estudos",
            header: () => (
              <PRFHeader
                onMenuPress={() => setDrawerOpen(true)}
                onSearchPress={() => router.push("/search" as any)}
              />
            ),
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <Feather name="book-open" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="simulados"
          options={{
            title: "Simulados",
            header: () => (
              <PRFHeader
                onMenuPress={() => setDrawerOpen(true)}
                onSearchPress={() => router.push("/search" as any)}
              />
            ),
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <Feather name="clipboard" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="conteudo"
          options={{
            title: "Conteúdo",
            header: () => (
              <PRFHeader
                onMenuPress={() => setDrawerOpen(true)}
                onSearchPress={() => router.push("/search" as any)}
              />
            ),
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <Feather name="layers" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            header: () => (
              <PRFHeader
                onMenuPress={() => setDrawerOpen(true)}
                onSearchPress={() => router.push("/search" as any)}
              />
            ),
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notificacoes"
          options={{ href: null }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    letterSpacing: -0.3,
  },
});
