import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

export default function SetupUsernameScreen() {
  const colors = useColors();
  const { user, registerUser, checkUsernameAvailable } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [username, setUsername] = useState("");
  const [photoURI, setPhotoURI] = useState("");
  const [checking, setChecking] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [saving, setSaving] = useState(false);

  const validateUsername = (value: string) => {
    const clean = value.replace(/[^a-zA-Z0-9_]/g, "");
    return clean;
  };

  const handleUsernameChange = (text: string) => {
    const clean = validateUsername(text);
    setUsername(clean);
    setUsernameError("");
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à sua galeria para escolher uma foto de perfil.",
        [{ text: "OK" }]
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setPhotoURI(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    if (!username.trim() || username.length < 3) {
      setUsernameError("O nome deve ter pelo menos 3 caracteres.");
      return;
    }
    if (username.length > 20) {
      setUsernameError("O nome não pode ter mais de 20 caracteres.");
      return;
    }

    try {
      setChecking(true);
      const available = await checkUsernameAvailable(username);
      if (!available) {
        setUsernameError("Este nome já está em uso. Escolha outro.");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        return;
      }
    } finally {
      setChecking(false);
    }

    try {
      setSaving(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (!user) return;
      await registerUser({
        ...user,
        username,
        photoURL: photoURI,
        role: "usuario",
      });
      router.replace("/(tabs)");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + 20 + (Platform.OS === "web" ? 67 : 0),
          paddingBottom: insets.bottom + 32 + (Platform.OS === "web" ? 34 : 0),
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.heading, { color: colors.text }]}>
        Configure seu perfil
      </Text>
      <Text style={[styles.sub, { color: colors.mutedForeground }]}>
        Escolha como você será identificado na comunidade
      </Text>

      <TouchableOpacity style={styles.photoSection} onPress={pickImage}>
        {photoURI ? (
          <Image source={{ uri: photoURI }} style={styles.photo} />
        ) : (
          <View
            style={[
              styles.photoPlaceholder,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Feather name="camera" size={32} color={colors.mutedForeground} />
          </View>
        )}
        <Text style={[styles.photoLabel, { color: colors.primary }]}>
          {photoURI ? "Alterar foto" : "Adicionar foto de perfil"}
        </Text>
        <Text style={[styles.photoHint, { color: colors.mutedForeground }]}>
          (opcional)
        </Text>
      </TouchableOpacity>

      <View style={styles.inputSection}>
        <Text style={[styles.label, { color: colors.text }]}>
          Nome de usuário
        </Text>
        <View
          style={[
            styles.inputRow,
            {
              backgroundColor: colors.card,
              borderColor: usernameError ? colors.destructive : colors.border,
            },
          ]}
        >
          <Text style={[styles.atSign, { color: colors.mutedForeground }]}>@</Text>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="seunome"
            placeholderTextColor={colors.mutedForeground}
            value={username}
            onChangeText={handleUsernameChange}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
          />
          {checking && (
            <ActivityIndicator size="small" color={colors.primary} />
          )}
        </View>
        {usernameError ? (
          <Text style={[styles.error, { color: colors.destructive }]}>
            {usernameError}
          </Text>
        ) : (
          <Text style={[styles.hint, { color: colors.mutedForeground }]}>
            Apenas letras, números e underscore. Sem espaços.
          </Text>
        )}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.btn,
          {
            backgroundColor: !username || username.length < 3
              ? colors.muted
              : colors.primary,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
        onPress={handleContinue}
        disabled={saving || checking || !username || username.length < 3}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Começar a estudar</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: 24, gap: 24 },
  heading: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    letterSpacing: -0.5,
  },
  sub: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    lineHeight: 22,
    marginTop: -12,
  },
  photoSection: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  photoLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
  photoHint: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  inputSection: { gap: 8 },
  label: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    height: 52,
    gap: 4,
  },
  atSign: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
  },
  input: {
    flex: 1,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
  },
  error: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  hint: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  btn: {
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  btnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
