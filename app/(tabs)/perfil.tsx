import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "@/components/Avatar";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { formatDate } from "@/lib/dateUtils";

export default function PerfilScreen() {
  const colors = useColors();
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [changingPhoto, setChangingPhoto] = useState(false);

  const handleChangePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à sua galeria para trocar a foto.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.25,
      base64: true,
    });
    if (!result.canceled && result.assets[0]?.base64) {
      try {
        setChangingPhoto(true);
        const dataUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
        await updateUser({ photoURL: dataUri });
      } catch {
        Alert.alert("Erro", "Não foi possível trocar a foto. Tente novamente.");
      } finally {
        setChangingPhoto(false);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24 },
        ]}
      >
        <View
          style={[
            styles.profileHeader,
            { backgroundColor: colors.card, borderBottomColor: colors.border },
          ]}
        >
          <View style={styles.avatarRow}>
            <TouchableOpacity onPress={handleChangePhoto} disabled={changingPhoto} style={styles.avatarWrapper}>
              <Avatar uri={user?.photoURL} name={user?.username} size="xl" />
              <View style={[styles.cameraOverlay, { backgroundColor: colors.primary }]}>
                {changingPhoto
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <Feather name="camera" size={14} color="#fff" />
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editBtn, { borderColor: colors.border }]}
              onPress={() => router.push("/settings" as any)}
            >
              <Feather name="settings" size={15} color={colors.mutedForeground} />
              <Text style={[styles.editBtnText, { color: colors.mutedForeground }]}>
                Configurações
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.username, { color: colors.text }]}>
            @{user?.username}
          </Text>
        </View>

        <View style={[styles.infoSection, { borderColor: colors.border }]}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>Informações</Text>

          <View style={styles.infoItem}>
            <Feather name="calendar" size={16} color={colors.mutedForeground} />
            <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
              Membro desde{" "}
              {user?.createdAt ? formatDate(user.createdAt) : "—"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Feather name="mail" size={16} color={colors.mutedForeground} />
            <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
              {user?.email ?? "—"}
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
  profileHeader: {
    padding: 20,
    paddingTop: 24,
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  avatarWrapper: {
    position: "relative",
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0D1117",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  editBtnText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
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
  infoTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    marginBottom: 4,
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
