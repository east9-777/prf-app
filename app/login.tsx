import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

WebBrowser.maybeCompleteAuthSession();

const ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? "";
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? "";

type BtnProps = { colors: ReturnType<typeof useColors> };

// --- Botão para WEB: usa signInWithPopup do Firebase (não precisa de proxy) ---
function WebGoogleButton({ colors, onSignIn }: BtnProps & { onSignIn: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setLoading(true);
      await onSignIn();
    } catch (err: any) {
      Alert.alert("Erro ao entrar", err?.message ?? "Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.googleBtn,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={handlePress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.primary} size="small" />
      ) : (
        <>
          <View style={styles.googleIconWrapper}>
            <Text style={styles.googleIconG}>G</Text>
          </View>
          <Text style={[styles.googleText, { color: colors.text }]}>
            Entrar com Google
          </Text>
        </>
      )}
    </Pressable>
  );
}

// --- Botão para NATIVO (Android/iOS): usa expo-auth-session ---
function NativeGoogleButton({ colors, onSignIn }: BtnProps & { onSignIn: (token: string) => Promise<void> }) {
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const token = response.authentication?.accessToken;
      if (token) {
        onSignIn(token).finally(() => setLoading(false));
      } else {
        setLoading(false);
        Alert.alert("Erro", "Token não recebido. Tente novamente.");
      }
    } else if (response?.type === "error") {
      setLoading(false);
      Alert.alert(
        "Acesso bloqueado pelo Google",
        "O Expo Go não é mais suportado para login com Google. Para usar o app no celular, instale o APK gerado pelo EAS Build.",
        [{ text: "Entendi" }]
      );
    } else if (response?.type === "cancel" || response?.type === "dismiss") {
      setLoading(false);
    }
  }, [response]);

  const handlePress = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setLoading(true);
      await promptAsync({ additionalParameters: { prompt: "select_account" } });
    } catch {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível iniciar o login.");
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.googleBtn,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={handlePress}
      disabled={loading || !request}
    >
      {loading ? (
        <ActivityIndicator color={colors.primary} size="small" />
      ) : (
        <>
          <View style={styles.googleIconWrapper}>
            <Text style={styles.googleIconG}>G</Text>
          </View>
          <Text style={[styles.googleText, { color: colors.text }]}>
            Entrar com Google
          </Text>
        </>
      )}
    </Pressable>
  );
}

// --- Tela principal de login ---
export default function LoginScreen() {
  const colors = useColors();
  const { signInWithGoogle } = useAuth();
  const insets = useSafeAreaInsets();

  const handleWebSignIn = async () => {
    await signInWithGoogle();
  };

  const handleNativeSignIn = async (accessToken: string) => {
    try {
      await signInWithGoogle(accessToken);
    } catch {
      Alert.alert("Erro ao entrar", "Não foi possível autenticar. Tente novamente.");
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + (Platform.OS === "web" ? 67 : 0),
          paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0),
        },
      ]}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.logoSection}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.textSection}>
          <Text style={[styles.title, { color: colors.text }]}>Project P.R.F</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Preparatório completo para o concurso da Polícia Rodoviária Federal
          </Text>
        </View>

        <View style={styles.features}>
          {[
            { icon: "book-open" as const, text: "Materiais e estudos organizados" },
            { icon: "clipboard" as const, text: "Simulados com questões reais" },
            { icon: "users" as const, text: "Comunidade de candidatos" },
            { icon: "trending-up" as const, text: "Acompanhe seu progresso" },
          ].map((f) => (
            <View key={f.text} style={styles.featureItem}>
              <Feather name={f.icon} size={16} color={colors.primary} />
              <Text style={[styles.featureText, { color: colors.mutedForeground }]}>
                {f.text}
              </Text>
            </View>
          ))}
        </View>

        {Platform.OS === "web" ? (
          <WebGoogleButton colors={colors} onSignIn={handleWebSignIn} />
        ) : (
          <NativeGoogleButton colors={colors} onSignIn={handleNativeSignIn} />
        )}

        <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
          Ao entrar, você concorda com os termos de uso e política de privacidade do Project P.R.F
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between" },
  logoSection: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 40 },
  logo: { width: 200, height: 240 },
  bottomSection: { padding: 28, gap: 24 },
  textSection: { gap: 8 },
  title: { fontFamily: "Inter_700Bold", fontSize: 30, letterSpacing: -0.5 },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 15, lineHeight: 22 },
  features: { gap: 10 },
  featureItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  featureText: { fontFamily: "Inter_400Regular", fontSize: 14 },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    minHeight: 56,
  },
  googleIconWrapper: { width: 24, height: 24, alignItems: "center", justifyContent: "center" },
  googleIconG: { fontSize: 20, fontFamily: "Inter_700Bold", color: "#4285F4" },
  googleText: { fontFamily: "Inter_600SemiBold", fontSize: 16 },
  disclaimer: { fontFamily: "Inter_400Regular", fontSize: 11, textAlign: "center", lineHeight: 16 },
});
