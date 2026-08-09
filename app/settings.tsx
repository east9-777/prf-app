import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useDisplayName } from "@/hooks/useDisplayName";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { displayName, setDisplayName, loaded } = useDisplayName();

  const [nameInput, setNameInput] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [newPostsNotif, setNewPostsNotif] = useState(true);
  const [commentsNotif, setCommentsNotif] = useState(true);

  useEffect(() => {
    if (loaded) setNameInput(displayName);
  }, [loaded, displayName]);

  const nameChanged = nameInput.trim() !== displayName;

  const handleSaveName = async () => {
    await setDisplayName(nameInput);
  };

  const handleClearData = () => {
    Alert.alert(
      "Limpar dados",
      "Isso irá remover todo o seu progresso de estudos e resultados de simulados salvos neste aparelho. Seu nome de exibição será mantido.",
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
      ) : onPress ? (
        <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
      ) : null}
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
        <Section title="PERFIL">
          <View style={styles.nameRow}>
            <View
              style={[
                styles.profileAvatar,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <Text style={[styles.profileInitial, { color: colors.primary }]}>
                {nameInput?.[0]?.toUpperCase() ?? "?"}
              </Text>
            </View>
            <TextInput
              style={[styles.nameInput, { color: colors.text, borderColor: colors.border }]}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Como podemos te chamar?"
              placeholderTextColor={colors.mutedForeground}
              maxLength={30}
              returnKeyType="done"
              onSubmitEditing={handleSaveName}
            />
          </View>
          {nameChanged && (
            <TouchableOpacity
              style={[styles.saveNameBtn, { borderTopColor: colors.border }]}
              onPress={handleSaveName}
            >
              <Feather name="check" size={16} color={colors.primary} />
              <Text style={[styles.saveNameText, { color: colors.primary }]}>
                Salvar nome
              </Text>
            </TouchableOpacity>
          )}
        </Section>

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

        <Section title="SOBRE">
          <Row
            icon="info"
            label="Créditos"
            onPress={() => router.push("/credits" as any)}
            isLast
          />
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

        <Text style={[styles.footer, { color: colors.mutedForeground }]}>
          Project P.R.F v1.0.0{"\n"}Desenvolvido por Leivison
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 20 },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: { fontFamily: "Inter_700Bold", fontSize: 18 },
  nameInput: {
    flex: 1,
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  saveNameBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  saveNameText: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
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
  footer: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
