import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Avatar } from "@/components/Avatar";
import { useColors } from "@/hooks/useColors";
import type { Comment } from "@/lib/types";
import { formatRelative } from "@/lib/dateUtils";

interface CommentItemProps {
  comment: Comment;
  replies?: Comment[];
  onLike: (commentId: string) => void;
  onReply: (commentId: string, username: string) => void;
  currentUserId?: string;
  isNested?: boolean;
}

export function CommentItem({
  comment,
  replies = [],
  onLike,
  onReply,
  currentUserId,
  isNested = false,
}: CommentItemProps) {
  const colors = useColors();
  const [showReplies, setShowReplies] = useState(true);
  const isLiked = currentUserId ? comment.likedBy.includes(currentUserId) : false;

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLike(comment.id);
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          isNested && styles.nested,
          isNested && { borderLeftColor: colors.border },
        ]}
      >
        <Avatar uri={comment.authorPhoto} name={comment.authorName} size="xs" />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.author, { color: colors.text }]}>
              {comment.authorName}
            </Text>
            <Text style={[styles.time, { color: colors.mutedForeground }]}>
              {formatRelative(comment.createdAt)}
            </Text>
          </View>
          <Text style={[styles.text, { color: colors.foreground }]}>
            {comment.text}
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={handleLike}>
              <Feather
                name="heart"
                size={13}
                color={isLiked ? "#F85149" : colors.mutedForeground}
              />
              {comment.likes > 0 && (
                <Text
                  style={[
                    styles.actionText,
                    { color: isLiked ? "#F85149" : colors.mutedForeground },
                  ]}
                >
                  {comment.likes}
                </Text>
              )}
            </TouchableOpacity>
            {!isNested && (
              <TouchableOpacity
                style={styles.action}
                onPress={() => onReply(comment.id, comment.authorName)}
              >
                <Feather name="corner-down-right" size={13} color={colors.mutedForeground} />
                <Text style={[styles.actionText, { color: colors.mutedForeground }]}>
                  Responder
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {replies.length > 0 && !isNested && (
        <>
          {showReplies
            ? replies.map((r) => (
                <CommentItem
                  key={r.id}
                  comment={r}
                  onLike={onLike}
                  onReply={onReply}
                  currentUserId={currentUserId}
                  isNested
                />
              ))
            : null}
          {replies.length > 0 && (
            <TouchableOpacity
              onPress={() => setShowReplies((v) => !v)}
              style={[styles.toggleReplies, { marginLeft: 54 }]}
            >
              <Text style={[styles.toggleText, { color: colors.primary }]}>
                {showReplies
                  ? "Ocultar respostas"
                  : `Ver ${replies.length} resposta${replies.length > 1 ? "s" : ""}`}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  nested: {
    paddingLeft: 46,
    borderLeftWidth: 2,
    marginLeft: 28,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  author: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  time: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
  },
  text: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 2,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  toggleReplies: {
    paddingVertical: 6,
    paddingBottom: 10,
  },
  toggleText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
});
