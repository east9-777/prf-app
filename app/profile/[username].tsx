import React, { useMemo } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "@/components/Avatar";
import { PostCard } from "@/components/PostCard";
import { RoleBadge } from "@/components/RoleBadge";
import { EmptyState } from "@/components/EmptyState";
import { usePosts } from "@/context/PostsContext";
import { useColors } from "@/hooks/useColors";

export default function UserProfileScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { novelPosts, communityPosts, toggleLike, toggleSave } = usePosts();

  const allPosts = useMemo(
    () => [...novelPosts, ...communityPosts],
    [novelPosts, communityPosts]
  );

  const userPosts = useMemo(
    () => allPosts.filter((p) => p.authorName.replace("@", "").toLowerCase() === username?.toLowerCase()),
    [allPosts, username]
  );

  const samplePost = userPosts[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: `@${username}`,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
        }}
      />

      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={toggleLike}
            onSave={toggleSave}
          />
        )}
        ListHeaderComponent={
          <View
            style={[
              styles.profileHeader,
              { backgroundColor: colors.card, borderBottomColor: colors.border },
            ]}
          >
            <Avatar uri={samplePost?.authorPhoto} name={username} size="xl" />
            <Text style={[styles.username, { color: colors.text }]}>
              @{username}
            </Text>
            {samplePost?.authorRole && (
              <RoleBadge role={samplePost.authorRole} size="md" />
            )}
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={[styles.statNum, { color: colors.text }]}>
                  {userPosts.length}
                </Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                  Posts
                </Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="edit-3"
            title="Nenhuma publicação"
            subtitle="Este usuário ainda não publicou nada"
          />
        }
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {},
  profileHeader: {
    padding: 24,
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  username: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    letterSpacing: -0.3,
  },
  stats: { flexDirection: "row", gap: 24, marginTop: 4 },
  stat: { alignItems: "center", gap: 2 },
  statNum: { fontFamily: "Inter_700Bold", fontSize: 18 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 12 },
});
