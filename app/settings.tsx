import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const colors = useColors();
  const { user, logout } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [newPostsNotif, setNewPostsNotif] = useState(true);
  const [commentsNotif, setCommentsNotif] = useState(true);

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const handleClearData = () => {
    Alert.alert(
      "Limpar dados",
      "Isso irá remover todo o seu progresso de estudos e resultados de simulados. Sua conta será mantida.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.multiRemove([
              "@prf/study_progress",
              "@prf/simulado_results",
              "@prf/schedule",
            ]);
            Alert.alert("Dados limpos", "Seu progresso foi removido.");
          },
        },
      ]
    );
  };

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
        {title}
      </Text>
      <View
        style={[
          styles.sectionBody,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        {children}
      </View>
    </View>
  );

  const Row = ({
    icon,
    label,
    value,
    onPress,
    toggle,
    toggleValue,
    onToggle,
    color,
    isLast,
  }: {
    icon: keyof typeof Feather.glyphMap;
    label: string;
    value?: string;
    onPress?: () => void;
    toggle?: boolean;
    toggleValue?: boolean;
    onToggle?: (v: boolean) => void;
    color?: string;
    isLast?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.row,
        !isLast && { borderBottomColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth },
      ]}
      onPress={onPress}
      disabled={toggle}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Feather name={icon} size={18} color={color ?? colors.mutedForeground} />
      <Text style={[styles.rowLabel, { color: color ?? colors.text }]}>
        {label}
      </Text>
      {toggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          thumbColor={toggleValue ? colors.primary : colors.mutedForeground}
          trackColor={{ false: colors.border, true: colors.primary + "80" }}
        />
      ) : value ? (
        <Text style={[styles.rowValue, { color: colors.mutedForeground }]}>
          {value}
        </Text>
      ) : (
        <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Configurações",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
        }}
      />
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.profileCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.profileAvatar,
              { backgroundColor: colors.primary + "20" },
            ]}
          >
            <Text style={[styles.profileInitial, { color: colors.primary }]}>
              {user?.username?.[0]?.toUpperCase() ?? "U"}
            </Text>
          </View>
          <View>
            <Text style={[styles.profileName, { color: colors.text }]}>
              @{user?.username}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.mutedForeground }]}>
              {user?.email}
            </Text>
          </View>
        </View>

        <Section title="NOTIFICAÇÕES">
          <Row
            icon="bell"
            label="Notificações"
            toggle
            toggleValue={notificationsEnabled}
            onToggle={setNotificationsEnabled}
          />
          <Row
            icon="rss"
            label="Novas publicações"
            toggle
            toggleValue={newPostsNotif}
            onToggle={setNewPostsNotif}
          />
          <Row
            icon="message-circle"
            label="Comentários e respostas"
            toggle
            toggleValue={commentsNotif}
            onToggle={setCommentsNotif}
            isLast
          />
        </Section>

        <Section title="CONTA">
          <Row
            icon="user"
            label="Cargo atual"
            value={
              user?.role === "administrador"
                ? "Administrador"
                : user?.role === "instrutor"
                ? "Instrutor"
                : "Usuário"
            }
          />
          <Row
            icon="info"
            label="Créditos"
            onPress={() => router.push("/credits" as any)}
            isLast={user?.role !== "administrador"}
          />
          {user?.role === "administrador" && (
            <Row
              icon="shield"
              label="Painel de Administração"
              onPress={() => router.push("/admin" as any)}
              color={colors.primary}
              isLast
            />
          )}
        </Section>

        <Section title="DADOS">
          <Row
            icon="trash-2"
            label="Limpar progresso de estudos"
            onPress={handleClearData}
            color={colors.destructive}
            isLast
          />
        </Section>

        <TouchableOpacity
          style={[
            styles.logoutBtn,
            { backgroundColor: colors.destructive + "18", borderColor: colors.destructive + "40" },
          ]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={18} color={colors.destructive} />
          <Text style={[styles.logoutText, { color: colors.destructive }]}>
            Sair da conta
          </Text>
        </TouchableOpacity>

        <Text style={[styles.footer, { color: colors.mutedForeground }]}>
          Aprovação PRF v1.0.0{"\n"}Desenvolvido por Leivison
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 20 },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: { fontFamily: "Inter_700Bold", fontSize: 22 },
  profileName: { fontFamily: "Inter_700Bold", fontSize: 16 },
  profileEmail: { fontFamily: "Inter_400Regular", fontSize: 13, marginTop: 2 },
  section: { gap: 8 },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
    paddingHorizontal: 4,
  },
  sectionBody: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLabel: { fontFamily: "Inter_500Medium", fontSize: 15, flex: 1 },
  rowValue: { fontFamily: "Inter_400Regular", fontSize: 14 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  logoutText: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  footer: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
