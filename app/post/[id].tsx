import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "@/components/Avatar";
import { CommentItem } from "@/components/CommentItem";
import { EmptyState } from "@/components/EmptyState";
import { PostCard } from "@/components/PostCard";
import { RoleBadge } from "@/components/RoleBadge";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostsContext";
import { useColors } from "@/hooks/useColors";
import type { Comment } from "@/lib/types";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const { user } = useAuth();
  const { novelPosts, communityPosts, toggleLike, toggleSave, comments, addComment, toggleCommentLike } = usePosts();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const allPosts = useMemo(
    () => [...novelPosts, ...communityPosts],
    [novelPosts, communityPosts]
  );

  const post = useMemo(
    () => allPosts.find((p) => p.id === id),
    [allPosts, id]
  );

  const postComments = useMemo(
    () => comments.filter((c) => c.postId === id && !c.parentId),
    [comments, id]
  );

  const getReplies = useCallback(
    (commentId: string) =>
      comments.filter((c) => c.postId === id && c.parentId === commentId),
    [comments, id]
  );

  const handleReply = (commentId: string, username: string) => {
    setReplyTo({ id: commentId, name: username });
    inputRef.current?.focus();
  };

  const cancelReply = () => {
    setReplyTo(null);
    setCommentText("");
  };

  const handleSubmit = async () => {
    if (!commentText.trim() || !user || !post) return;
    try {
      setSubmitting(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      addComment({
        postId: id,
        authorId: user.id,
        authorName: `@${user.username}`,
        authorPhoto: user.photoURL,
        text: commentText.trim(),
        parentId: replyTo?.id,
      });
      setCommentText("");
      setReplyTo(null);
    } finally {
      setSubmitting(false);
    }
  };

  if (!post) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: "Publicação" }} />
        <EmptyState icon="alert-circle" title="Publicação não encontrada" />
      </View>
    );
  }

  const renderComment = ({ item }: { item: Comment }) => (
    <CommentItem
      comment={item}
      replies={getReplies(item.id)}
      onLike={toggleCommentLike}
      onReply={handleReply}
      currentUserId={user?.id}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Publicação",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <FlatList
          data={postComments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          ListHeaderComponent={
            <View>
              <PostCard
                post={post}
                onLike={toggleLike}
                onSave={toggleSave}
              />
              <View
                style={[styles.commentHeader, { borderColor: colors.border }]}
              >
                <Feather name="message-circle" size={14} color={colors.mutedForeground} />
                <Text style={[styles.commentCount, { color: colors.mutedForeground }]}>
                  {post.commentCount} comentário{post.commentCount !== 1 ? "s" : ""}
                </Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <EmptyState
              icon="message-circle"
              title="Seja o primeiro a comentar"
              subtitle="Compartilhe sua opinião sobre esta publicação"
            />
          }
          contentContainerStyle={[
            styles.list,
            {
              paddingBottom:
                insets.bottom + (Platform.OS === "web" ? 34 : 0) + 80,
            },
          ]}
          showsVerticalScrollIndicator={false}
        />

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
              paddingBottom:
                insets.bottom + (Platform.OS === "web" ? 34 : 0) + 8,
            },
          ]}
        >
          {replyTo && (
            <View
              style={[styles.replyBanner, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.replyText, { color: colors.mutedForeground }]}>
                Respondendo a{" "}
                <Text style={{ color: colors.primary }}>{replyTo.name}</Text>
              </Text>
              <TouchableOpacity onPress={cancelReply}>
                <Feather name="x" size={16} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.inputRow}>
            <Avatar uri={user?.photoURL} name={user?.username} size="xs" />
            <TextInput
              ref={inputRef}
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
              placeholder="Adicionar comentário..."
              placeholderTextColor={colors.mutedForeground}
              value={commentText}
              onChangeText={setCommentText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendBtn,
                {
                  backgroundColor:
                    commentText.trim() ? colors.primary : colors.muted,
                },
              ]}
              onPress={handleSubmit}
              disabled={!commentText.trim() || submitting}
            >
              <Feather
                name="send"
                size={16}
                color={commentText.trim() ? "#FFFFFF" : colors.mutedForeground}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {},
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  commentCount: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
  inputContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 8,
  },
  replyBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  replyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxHeight: 100,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
