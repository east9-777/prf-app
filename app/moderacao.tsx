import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "@/components/Avatar";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { formatRelative } from "@/lib/dateUtils";
import type { Post } from "@/lib/types";

interface ReportedPost extends Post {
  collection: "posts" | "communityPosts";
}

export default function ModeracaoScreen() {
  const colors = useColors();
  const { isAdmin } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [reportedPosts, setReportedPosts] = useState<ReportedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState<string | null>(null);

  const loadReportedPosts = useCallback(async () => {
    setLoading(true);
    try {
      if (!isFirebaseConfigured) {
        Alert.alert(
          "Firebase não configurado",
          "Configure o Firebase para usar a moderação."
        );
        return;
      }

      const [novelSnap, communitySnap] = await Promise.all([
        getDocs(query(collection(db, "posts"), where("reportedBy", "!=", []))),
        getDocs(
          query(collection(db, "communityPosts"), where("reportedBy", "!=", []))
        ),
      ]);

      const novelPosts: ReportedPost[] = novelSnap.docs
        .filter((d) => (d.data().reportedBy?.length ?? 0) > 0)
        .map((d) => ({
          ...(d.data() as Post),
          id: d.id,
          createdAt: (d.data().createdAt?.toDate?.() ?? new Date()).toISOString(),
          collection: "posts",
        }));

      const communityPosts: ReportedPost[] = communitySnap.docs
        .filter((d) => (d.data().reportedBy?.length ?? 0) > 0)
        .map((d) => ({
          ...(d.data() as Post),
          id: d.id,
          createdAt: (d.data().createdAt?.toDate?.() ?? new Date()).toISOString(),
          collection: "communityPosts",
        }));

      const all = [...novelPosts, ...communityPosts].sort(
        (a, b) => b.reportedBy.length - a.reportedBy.length
      );
      setReportedPosts(all);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin()) {
      router.back();
      return;
    }
    loadReportedPosts();
  }, []);

  const deletePost = useCallback((post: ReportedPost) => {
    Alert.alert(
      "Deletar publicação",
      `Tem certeza que deseja deletar este post de @${post.authorName}? Esta ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            setActioning(post.id);
            try {
              await deleteDoc(doc(db, post.collection, post.id));
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              setReportedPosts((prev) => prev.filter((p) => p.id !== post.id));
            } catch {
              Alert.alert("Erro", "Não foi possível deletar o post.");
            } finally {
              setActioning(null);
            }
          },
        },
      ]
    );
  }, []);

  const dismissReports = useCallback(async (post: ReportedPost) => {
    Alert.alert(
      "Ignorar denúncias",
      `Limpar as ${post.reportedBy.length} denúncia${post.reportedBy.length > 1 ? "s" : ""} deste post e mantê-lo visível?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Ignorar",
          onPress: async () => {
            setActioning(post.id);
            try {
              const postRef = doc(db, post.collection, post.id);
              const updates: Record<string, any> = { reportedBy: [] };
              await updateDoc(postRef, updates);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setReportedPosts((prev) => prev.filter((p) => p.id !== post.id));
            } catch {
              Alert.alert("Erro", "Não foi possível limpar as denúncias.");
            } finally {
              setActioning(null);
            }
          },
        },
      ]
    );
  }, []);

  const renderItem = ({ item }: { item: ReportedPost }) => {
    const isActioning = actioning === item.id;
    const reportCount = item.reportedBy.length;

    return (
      <View
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.cardHeader}>
          <Avatar uri={item.authorPhoto} name={item.authorName} size="sm" />
          <View style={styles.authorInfo}>
            <Text style={[styles.authorName, { color: colors.text }]}>
              @{item.authorName}
            </Text>
            <Text style={[styles.time, { color: colors.mutedForeground }]}>
              {formatRelative(item.createdAt)} ·{" "}
              {item.collection === "posts" ? "Novidades" : "Comunidade"}
            </Text>
          </View>
          <View
            style={[
              styles.reportBadge,
              { backgroundColor: colors.destructive + "18" },
            ]}
          >
            <Feather name="flag" size={12} color={colors.destructive} />
            <Text
              style={[styles.reportCount, { color: colors.destructive }]}
            >
              {reportCount} denúncia{reportCount > 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        {item.title ? (
          <Text
            style={[styles.postTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
        ) : null}
        {item.text ? (
          <Text
            style={[styles.postText, { color: colors.mutedForeground }]}
            numberOfLines={3}
          >
            {item.text}
          </Text>
        ) : null}
        {item.imageURL ? (
          <Image
            source={{ uri: item.imageURL }}
            style={styles.postImage}
            resizeMode="cover"
          />
        ) : null}

        {isActioning ? (
          <View style={styles.actionsRow}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[
                styles.actionBtn,
                { borderColor: colors.border, backgroundColor: colors.muted },
              ]}
              onPress={() => dismissReports(item)}
            >
              <Feather name="check" size={15} color={colors.mutedForeground} />
              <Text
                style={[styles.actionText, { color: colors.mutedForeground }]}
              >
                Ignorar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionBtn,
                {
                  borderColor: colors.destructive + "50",
                  backgroundColor: colors.destructive + "12",
                },
              ]}
              onPress={() => deletePost(item)}
            >
              <Feather name="trash-2" size={15} color={colors.destructive} />
              <Text
                style={[styles.actionText, { color: colors.destructive }]}
              >
                Deletar post
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Moderação",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
        }}
      />

      <FlatList
        data={reportedPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.list,
          {
            paddingBottom:
              insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          reportedPosts.length > 0 ? (
            <View style={styles.listHeader}>
              <View
                style={[
                  styles.alertBanner,
                  {
                    backgroundColor: colors.destructive + "12",
                    borderColor: colors.destructive + "30",
                  },
                ]}
              >
                <Feather name="alert-triangle" size={16} color={colors.destructive} />
                <Text
                  style={[styles.alertText, { color: colors.destructive }]}
                >
                  {reportedPosts.length} post
                  {reportedPosts.length > 1 ? "s" : ""} aguardando revisão
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.refreshBtn,
                  { borderColor: colors.border, backgroundColor: colors.card },
                ]}
                onPress={loadReportedPosts}
              >
                <Feather name="refresh-cw" size={15} color={colors.primary} />
                <Text
                  style={[styles.refreshText, { color: colors.primary }]}
                >
                  Atualizar
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.center}>
              <ActivityIndicator color={colors.primary} size="large" />
              <Text
                style={[styles.emptyText, { color: colors.mutedForeground }]}
              >
                Verificando denúncias...
              </Text>
            </View>
          ) : (
            <View style={styles.center}>
              <Feather name="check-circle" size={48} color={colors.primary} />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                Tudo limpo!
              </Text>
              <Text
                style={[styles.emptyText, { color: colors.mutedForeground }]}
              >
                Nenhuma denúncia pendente no momento
              </Text>
              <TouchableOpacity
                style={[
                  styles.refreshBtn,
                  { borderColor: colors.border, backgroundColor: colors.card },
                ]}
                onPress={loadReportedPosts}
              >
                <Feather name="refresh-cw" size={15} color={colors.primary} />
                <Text
                  style={[styles.refreshText, { color: colors.primary }]}
                >
                  Verificar novamente
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, gap: 12 },
  listHeader: { gap: 10, marginBottom: 4 },
  alertBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  alertText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  refreshBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  refreshText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  authorInfo: { flex: 1 },
  authorName: { fontFamily: "Inter_700Bold", fontSize: 14 },
  time: { fontFamily: "Inter_400Regular", fontSize: 12 },
  reportBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reportCount: { fontFamily: "Inter_700Bold", fontSize: 12 },
  postTitle: { fontFamily: "Inter_700Bold", fontSize: 15, lineHeight: 22 },
  postText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  postImage: { width: "100%", height: 160, borderRadius: 10 },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 4,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  actionText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  center: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingTop: 80,
  },
  emptyTitle: { fontFamily: "Inter_700Bold", fontSize: 18 },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
