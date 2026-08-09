import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useIdTokenAuthRequest } from "expo-auth-session/providers/google";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

WebBrowser.maybeCompleteAuthSession();

const FEATURES = [
  { icon: "book-open" as const, text: "Materiais e estudos organizados" },
  { icon: "clipboard" as const, text: "Simulados com questões reais" },
  { icon: "users" as const, text: "Comunidade de candidatos" },
  { icon: "trending-up" as const, text: "Acompanhe seu progresso" },
];

function GoogleButton({
  onPress,
  loading,
}: {
  onPress: () => void;
  loading: boolean;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.googleBtn,
        { opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#1565C0" size="small" />
      ) : (
        <>
          <View style={styles.gIconBox}>
            <Text style={styles.gIconText}>G</Text>
          </View>
          <Text style={styles.googleBtnText}>Entrar com Google</Text>
        </>
      )}
    </Pressable>
  );
}

export default function LoginScreen() {
  const colors = useColors();
  const { signInWithGoogle, user } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleRequest, , promptGoogleAsync] = useIdTokenAuthRequest(
    {
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
      selectAccount: true,
    },
    { scheme: "project-prf" }
  );

  useEffect(() => {
    if (user) {
      if (user.username) {
        router.replace("/(tabs)");
      } else {
        router.replace("/setup-username");
      }
    }
  }, [user]);

  const handleSignIn = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setLoading(true);

      if (!googleRequest) {
        throw new Error("O login do Google ainda está carregando. Tente novamente.");
      }

      const result = await promptGoogleAsync();
      if (result.type === "success") {
        const idToken =
          result.params.id_token ?? result.authentication?.idToken;
        if (!idToken) throw new Error("ID token não recebido.");
        await signInWithGoogle(idToken);
      } else if (result.type !== "cancel") {
        throw new Error("Não foi possível concluir o login com o Google.");
      }
    } catch (err: any) {
      if (err?.code !== "SIGN_IN_CANCELLED" && err?.code !== -5) {
        Alert.alert("Erro ao entrar", err?.message ?? "Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={["#0A1628", "#0D1117", "#0D1117"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.logoSection, { paddingTop: insets.top + 32 }]}>
        <View style={styles.logoBadge}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.appName}>Aprovação PRF</Text>
        <Text style={styles.appSub}>Polícia Rodoviária Federal</Text>
      </View>

      <View
        style={[
          styles.card,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <View style={styles.divider} />

        <Text style={styles.cardTitle}>Preparatório completo</Text>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.text} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Feather name={f.icon} size={14} color="#1976D2" />
              </View>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>

        <GoogleButton onPress={handleSignIn} loading={loading} />

        <Text style={styles.disclaimer}>
          Ao entrar, você concorda com os termos de uso e política de
          privacidade do Aprovação PRF
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0D1117" },

  logoSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logoBadge: {
    width: 160,
    height: 160,
    borderRadius: 32,
    backgroundColor: "#161B22",
    borderWidth: 1,
    borderColor: "#1565C040",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1565C0",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  logo: { width: 130, height: 130 },
  appName: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: "#E6EDF3",
    letterSpacing: -0.5,
    marginTop: 8,
  },
  appSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#8B949E",
    letterSpacing: 0.3,
  },

  card: {
    backgroundColor: "#161B22",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 20,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: "#30363D",
  },
  divider: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#30363D",
    alignSelf: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: "#E6EDF3",
    letterSpacing: -0.3,
  },
  features: { gap: 10 },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#1565C018",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#8B949E",
  },

  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 15,
    minHeight: 54,
    marginTop: 4,
  },
  gIconBox: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  gIconText: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#4285F4",
  },
  googleBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#1a1a1a",
  },

  disclaimer: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#8B949E",
    textAlign: "center",
    lineHeight: 16,
  },
});
