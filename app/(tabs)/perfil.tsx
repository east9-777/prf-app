import React, { useMemo, useState } from "react";
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
import { PostCard } from "@/components/PostCard";
import { RoleBadge } from "@/components/RoleBadge";
import { EmptyState } from "@/components/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostsContext";
import { useColors } from "@/hooks/useColors";
import { formatDate } from "@/lib/dateUtils";

type ProfileTab = "posts" | "salvos" | "sobre";

export default function PerfilScreen() {
  const colors = useColors();
  const { user, updateUser } = useAuth();
  const { novelPosts, communityPosts, toggleLike, toggleSave } = usePosts();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
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

  const allPosts = useMemo(
    () => [...novelPosts, ...communityPosts],
    [novelPosts, communityPosts]
  );

  const userPosts = useMemo(
    () => allPosts.filter((p) => p.authorId === user?.id),
    [allPosts, user]
  );

  const savedPosts = useMemo(
    () => allPosts.filter((p) => user && p.savedBy.includes(user.id)),
    [allPosts, user]
  );

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: "posts", label: "Posts" },
    { key: "salvos", label: "Salvos" },
    { key: "sobre", label: "Sobre" },
  ];

  const displayPosts = activeTab === "posts" ? userPosts : savedPosts;

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

          {user?.role && <RoleBadge role={user.role} size="md" />}

          <View style={styles.statsRow}>
            {[
              { label: "Posts", value: userPosts.length },
              { label: "Salvos", value: savedPosts.length },
            ].map((stat) => (
              <View key={stat.label} style={styles.stat}>
                <Text style={[styles.statNum, { color: colors.text }]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color:
                      activeTab === tab.key ? colors.primary : colors.mutedForeground,
                    fontFamily:
                      activeTab === tab.key
                        ? "Inter_600SemiBold"
                        : "Inter_400Regular",
                  },
                ]}
              >
                {tab.label}
              </Text>
              {activeTab === tab.key && (
                <View
                  style={[styles.tabIndicator, { backgroundColor: colors.primary }]}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "sobre" ? (
          <View style={[styles.aboutSection, { borderColor: colors.border }]}>
            <View style={styles.aboutItem}>
              <Feather name="calendar" size={16} color={colors.mutedForeground} />
              <Text style={[styles.aboutText, { color: colors.mutedForeground }]}>
                Membro desde{" "}
                {user?.createdAt ? formatDate(user.createdAt) : "—"}
              </Text>
            </View>
            <View style={styles.aboutItem}>
              <Feather name="mail" size={16} color={colors.mutedForeground} />
              <Text style={[styles.aboutText, { color: colors.mutedForeground }]}>
                {user?.email ?? "—"}
              </Text>
            </View>
          </View>
        ) : displayPosts.length === 0 ? (
          <EmptyState
            icon={activeTab === "posts" ? "edit-3" : "bookmark"}
            title={
              activeTab === "posts" ? "Nenhum post ainda" : "Nenhuma publicação salva"
            }
            subtitle={
              activeTab === "posts"
                ? "Suas publicações aparecerão aqui"
                : "Salve publicações para acessá-las rapidamente"
            }
          />
        ) : (
          <View style={{ marginTop: 8 }}>
            {displayPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={toggleLike}
                onSave={toggleSave}
              />
            ))}
          </View>
        )}
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
  statsRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 4,
  },
  stat: {
    alignItems: "center",
    gap: 2,
  },
  statNum: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
  },
  statLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    position: "relative",
  },
  tabLabel: {
    fontSize: 14,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: "20%",
    right: "20%",
    height: 2,
    borderRadius: 1,
  },
  aboutSection: {
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  aboutItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  aboutText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
});
