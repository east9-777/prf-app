import React, { useCallback, useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PostCard } from "@/components/PostCard";
import { EmptyState } from "@/components/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostsContext";
import { useColors } from "@/hooks/useColors";
import type { Post } from "@/lib/types";

export default function ComunidadeScreen() {
  const colors = useColors();
  const { user } = useAuth();
  const { communityPosts, toggleLike, toggleSave, deletePost, refreshPosts } = usePosts();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const visiblePosts = communityPosts.filter((p) => !p.isHidden);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshPosts();
    setRefreshing(false);
  };

  const handleMenu = (postId: string) => {
    const post = communityPosts.find((p) => p.id === postId);
    if (!post) return;
    const isOwner = post.authorId === user?.id;

    const options = [
      "Salvar",
      "Ocultar publicação",
      "Denunciar",
      ...(isOwner ? ["Excluir publicação"] : []),
      "Cancelar",
    ];

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: options.length - 1,
          destructiveButtonIndex: isOwner
            ? options.indexOf("Excluir publicação")
            : undefined,
        },
        (idx) => {
          const chosen = options[idx];
          if (chosen === "Salvar") toggleSave(postId);
          else if (chosen === "Excluir publicação") {
            Alert.alert("Excluir?", "Essa ação não pode ser desfeita.", [
              { text: "Cancelar", style: "cancel" },
              { text: "Excluir", style: "destructive", onPress: () => deletePost(postId) },
            ]);
          } else if (chosen === "Denunciar") {
            Alert.alert("Publicação denunciada", "Obrigado! Iremos analisar o conteúdo.", [{ text: "OK" }]);
          }
        }
      );
    } else {
      Alert.alert("Opções", "", [
        { text: "Salvar", onPress: () => toggleSave(postId) },
        ...(isOwner ? [{ text: "Excluir publicação", style: "destructive" as const, onPress: () => deletePost(postId) }] : []),
        { text: "Denunciar", onPress: () => Alert.alert("Denúncia enviada", "Obrigado pela sua colaboração.") },
        { text: "Cancelar", style: "cancel" as const },
      ]);
    }
  };

  const renderPost = useCallback(
    ({ item }: { item: Post }) => (
      <PostCard
        post={item}
        onLike={toggleLike}
        onSave={toggleSave}
        showMenu
        onMenu={handleMenu}
      />
    ),
    [toggleLike, toggleSave]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Comunidade",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
        }}
      />

      <FlatList
        data={visiblePosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        ListHeaderComponent={
          <View style={[styles.banner, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.bannerTitle, { color: colors.text }]}>
              📢 Chat Livre
            </Text>
            <Text style={[styles.bannerDesc, { color: colors.mutedForeground }]}>
              Tire dúvidas, compartilhe experiências e converse com outros candidatos da PRF.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="users"
            title="Nenhuma publicação ainda"
            subtitle="Seja o primeiro a compartilhar algo com a comunidade!"
            actionLabel="Criar publicação"
            onAction={() => router.push({ pathname: "/create-post", params: { type: "comunidade" } })}
          />
        }
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 80 },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push({ pathname: "/create-post", params: { type: "comunidade" } });
        }}
      >
        <Feather name="plus" size={26} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingTop: 8 },
  banner: {
    margin: 12,
    marginBottom: 4,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  bannerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
  },
  bannerDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
