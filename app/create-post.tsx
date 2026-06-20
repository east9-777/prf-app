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
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostsContext";
import { useColors } from "@/hooks/useColors";
import { storage, isFirebaseConfigured } from "@/lib/firebase";

export default function CreatePostScreen() {
  const colors = useColors();
  const { user, canPost } = useAuth();
  const { addPost } = usePosts();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ type?: string }>();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageURI, setImageURI] = useState("");
  const [publishing, setPublishing] = useState(false);
  const postType = (params.type === "comunidade" ? "comunidade" : "novidades") as "novidades" | "comunidade";

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à sua galeria para adicionar imagens.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setImageURI(result.assets[0].uri);
    }
  };

  const uploadImage = async (localUri: string): Promise<string | undefined> => {
    if (!isFirebaseConfigured || !storage) return undefined;
    try {
      const response = await fetch(localUri);
      const blob = await response.blob();
      const filename = `posts/${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch {
      return undefined;
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) return;
    if (!user) return;
    if (postType === "novidades" && !canPost()) {
      Alert.alert("Sem permissão", "Apenas instrutores e administradores podem publicar em Novidades.");
      return;
    }

    try {
      setPublishing(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      let finalImageURL: string | undefined;
      if (imageURI) {
        finalImageURL = await uploadImage(imageURI);
      }

      await addPost({
        authorId: user.id,
        authorName: user.role === "usuario" ? `@${user.username}` : `${user.username}`,
        authorPhoto: user.photoURL,
        authorRole: user.role,
        title: title.trim(),
        text: text.trim() || undefined,
        imageURL: finalImageURL,
        isPinned: false,
        type: postType,
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    } catch (err: any) {
      Alert.alert("Erro ao publicar", err?.message ?? "Não foi possível publicar. Tente novamente.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: postType === "comunidade" ? "Nova Publicação" : "Nova Notícia",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={handlePublish}
              disabled={!title.trim() || publishing}
              style={[
                styles.publishBtn,
                { backgroundColor: title.trim() ? colors.primary : colors.muted },
              ]}
            >
              {publishing ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.publishText}>Publicar</Text>
              )}
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingBottom:
              insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.authorRow,
            { borderBottomColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.avatar,
              { backgroundColor: colors.primary + "20" },
            ]}
          >
            <Text style={[styles.avatarText, { color: colors.primary }]}>
              {user?.username?.[0]?.toUpperCase() ?? "U"}
            </Text>
          </View>
          <View>
            <Text style={[styles.authorName, { color: colors.text }]}>
              {user?.username}
            </Text>
            <Text style={[styles.authorRole, { color: colors.mutedForeground }]}>
              {postType === "comunidade" ? "Chat Livre" : "Novidades da PRF"}
            </Text>
          </View>
        </View>

        <TextInput
          style={[styles.titleInput, { color: colors.text }]}
          placeholder="Título (obrigatório)"
          placeholderTextColor={colors.mutedForeground}
          value={title}
          onChangeText={setTitle}
          multiline
          maxLength={150}
        />

        <TextInput
          style={[styles.bodyInput, { color: colors.text }]}
          placeholder="Texto (opcional)"
          placeholderTextColor={colors.mutedForeground}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={2000}
          textAlignVertical="top"
        />

        {imageURI ? (
          <View style={styles.imagePreview}>
            <Image
              source={{ uri: imageURI }}
              style={[styles.previewImg, { borderColor: colors.border }]}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={[styles.removeImg, { backgroundColor: colors.destructive }]}
              onPress={() => setImageURI("")}
            >
              <Feather name="x" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={[styles.toolbar, { borderTopColor: colors.border }]}>
          <TouchableOpacity style={styles.toolbarBtn} onPress={pickImage}>
            <Feather name="image" size={20} color={colors.mutedForeground} />
            <Text style={[styles.toolbarText, { color: colors.mutedForeground }]}>
              Imagem
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1, padding: 16, gap: 4 },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 16,
    marginBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
  },
  authorName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  authorRole: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  titleInput: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    lineHeight: 28,
    paddingVertical: 8,
  },
  bodyInput: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    lineHeight: 23,
    minHeight: 120,
    paddingVertical: 8,
  },
  imagePreview: {
    position: "relative",
    alignSelf: "flex-start",
  },
  previewImg: {
    width: 200,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
  },
  removeImg: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  toolbar: {
    flexDirection: "row",
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 16,
  },
  toolbarBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  toolbarText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
  publishBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 4,
    minWidth: 70,
    alignItems: "center",
  },
  publishText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
