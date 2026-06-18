import React, { useCallback, useMemo, useRef, useState } from "react";
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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PostCard } from "@/components/PostCard";
import { EmptyState } from "@/components/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostsContext";
import { useColors } from "@/hooks/useColors";
import type { Post } from "@/lib/types";

export default function NovidadesScreen() {
  const colors = useColors();
  const { canPost, isAdmin, isInstructor, user } = useAuth();
  const { novelPosts, isLoading, toggleLike, toggleSave, togglePin, deletePost, refreshPosts } = usePosts();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const sortedPosts = useMemo(() => {
    const pinned = novelPosts.filter((p) => p.isPinned && !p.isHidden);
    const rest = novelPosts.filter((p) => !p.isPinned && !p.isHidden);
    return [...pinned, ...rest];
  }, [novelPosts]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshPosts();
    setRefreshing(false);
  };

  const handleMenu = (postId: string) => {
    const post = novelPosts.find((p) => p.id === postId);
    if (!post) return;

    const isOwner = post.authorId === user?.id;
    const isModeratorOrAbove = isAdmin();

    const options: string[] = [];
    if (isOwner || isModeratorOrAbove) {
      if (isInstructor()) options.push(post.isPinned ? "Desafixar" : "Fixar publicação");
      options.push("Excluir publicação");
    }
    options.push("Salvar");
    options.push("Cancelar");

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: options.length - 1,
          destructiveButtonIndex: options.includes("Excluir publicação")
            ? options.indexOf("Excluir publicação")
            : undefined,
        },
        (idx) => {
          const chosen = options[idx];
          if (chosen === "Fixar publicação" || chosen === "Desafixar") togglePin(postId);
          else if (chosen === "Excluir publicação") {
            Alert.alert("Excluir?", "Essa ação não pode ser desfeita.", [
              { text: "Cancelar", style: "cancel" },
              { text: "Excluir", style: "destructive", onPress: () => deletePost(postId) },
            ]);
          } else if (chosen === "Salvar") toggleSave(postId);
        }
      );
    } else {
      Alert.alert("Opções", "", [
        ...(isInstructor() ? [{ text: post.isPinned ? "Desafixar" : "Fixar publicação", onPress: () => togglePin(postId) }] : []),
        ...(isOwner || isModeratorOrAbove
          ? [{ text: "Excluir publicação", style: "destructive" as const, onPress: () => deletePost(postId) }]
          : []),
        { text: "Salvar", onPress: () => toggleSave(postId) },
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
    [toggleLike, toggleSave, handleMenu]
  );

  const Header = useMemo(
    () => (
      <View style={[styles.sectionHeader, { borderBottomColor: colors.border }]}>
        <Feather name="rss" size={15} color={colors.mutedForeground} />
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
          Novidades da PRF
        </Text>
      </View>
    ),
    [colors]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        ListHeaderComponent={Header}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              icon="rss"
              title="Nenhuma publicação ainda"
              subtitle="Em breve os instrutores publicarão novidades sobre o concurso da PRF"
            />
          ) : null
        }
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 80 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />

      {canPost() && (
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push("/create-post");
          }}
        >
          <Feather name="plus" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingTop: 8 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
