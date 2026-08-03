import React from "react";
import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Avatar } from "@/components/Avatar";
import { RoleBadge } from "@/components/RoleBadge";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import type { Post } from "@/lib/types";
import { formatRelative } from "@/lib/dateUtils";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  showMenu?: boolean;
  onMenu?: (postId: string) => void;
}

export function PostCard({ post, onLike, onSave, showMenu, onMenu }: PostCardProps) {
  const colors = useColors();
  const { user } = useAuth();
  const router = useRouter();

  const isLiked = user ? post.likedBy.includes(user.id) : false;
  const isSaved = user ? post.savedBy.includes(user.id) : false;

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLike(post.id);
  };

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSave(post.id);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${post.title}\n\nProject P.R.F – Preparatório para o concurso da PRF`,
      });
    } catch {}
  };

  const handlePress = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.95 : 1,
        },
      ]}
    >
      {post.isPinned && (
        <View style={[styles.pinnedBanner, { backgroundColor: colors.primary + "18" }]}>
          <Feather name="bookmark" size={11} color={colors.primary} />
          <Text style={[styles.pinnedText, { color: colors.primary }]}>
            Publicação fixada
          </Text>
        </View>
      )}

      <View style={styles.header}>
        <Avatar uri={post.authorPhoto} name={post.authorName} size="sm" />
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={[styles.authorName, { color: colors.text }]}>
              {post.authorName}
            </Text>
            <RoleBadge role={post.authorRole} />
          </View>
          <Text style={[styles.time, { color: colors.mutedForeground }]}>
            {formatRelative(post.createdAt)}
          </Text>
        </View>
        {showMenu && (
          <TouchableOpacity
            onPress={() => onMenu?.(post.id)}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <Feather name="more-vertical" size={18} color={colors.mutedForeground} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
        {post.title}
      </Text>

      {post.text ? (
        <Text
          style={[styles.body, { color: colors.mutedForeground }]}
          numberOfLines={3}
        >
          {post.text}
        </Text>
      ) : null}

      {post.imageURL ? (
        <Image
          source={{ uri: post.imageURL }}
          style={[styles.image, { borderColor: colors.border }]}
          resizeMode="cover"
        />
      ) : null}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={handleLike}>
          <Feather
            name={isLiked ? "heart" : "heart"}
            size={17}
            color={isLiked ? colors.destructive : colors.mutedForeground}
            style={isLiked ? { opacity: 1 } : undefined}
          />
          <Text
            style={[
              styles.actionText,
              { color: isLiked ? colors.destructive : colors.mutedForeground },
            ]}
          >
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={handlePress}>
          <Feather name="message-circle" size={17} color={colors.mutedForeground} />
          <Text style={[styles.actionText, { color: colors.mutedForeground }]}>
            {post.commentCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={handleShare}>
          <Feather name="share-2" size={17} color={colors.mutedForeground} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={handleSave}>
          <Feather
            name="bookmark"
            size={17}
            color={isSaved ? colors.primary : colors.mutedForeground}
            style={isSaved ? styles.savedIcon : undefined}
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 12,
    marginBottom: 10,
    overflow: "hidden",
  },
  pinnedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  pinnedText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  authorName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  time: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 14,
    paddingBottom: 6,
  },
  body: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 180,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    minWidth: 36,
  },
  actionText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  savedIcon: {
    opacity: 1,
  },
});
