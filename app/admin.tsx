import React, { useCallback, useEffect, useState } from "react";
import {
  ActionSheetIOS,
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "@/components/Avatar";
import { RoleBadge } from "@/components/RoleBadge";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import type { User, UserRole } from "@/lib/types";

const ROLE_LABELS: Record<UserRole, string> = {
  usuario: "Usuário",
  instrutor: "Instrutor",
  administrador: "Administrador",
};

const ROLES: UserRole[] = ["usuario", "instrutor", "administrador"];

export default function AdminScreen() {
  const colors = useColors();
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      if (!isFirebaseConfigured) {
        Alert.alert(
          "Firebase não configurado",
          "Configure as credenciais do Firebase para gerenciar usuários."
        );
        return;
      }
      const q = query(collection(db, "users"), orderBy("username"));
      const snap = await getDocs(q);
      const list = snap.docs.map(
        (d) => ({ ...(d.data() as User), id: d.id } as User)
      );
      setUsers(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin()) {
      router.back();
      return;
    }
    loadUsers();
  }, []);

  const changeRole = useCallback(
    async (targetUser: User, newRole: UserRole) => {
      if (newRole === targetUser.role) return;
      if (targetUser.id === user?.id && newRole !== "administrador") {
        Alert.alert(
          "Atenção",
          "Você está rebaixando sua própria conta. Perderá acesso ao painel de admin.",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Confirmar",
              style: "destructive",
              onPress: () => applyRoleChange(targetUser, newRole),
            },
          ]
        );
        return;
      }
      await applyRoleChange(targetUser, newRole);
    },
    [user]
  );

  const applyRoleChange = async (targetUser: User, newRole: UserRole) => {
    setUpdating(targetUser.id);
    try {
      await updateDoc(doc(db, "users", targetUser.id), { role: newRole });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === targetUser.id ? { ...u, role: newRole } : u
        )
      );
    } catch {
      Alert.alert("Erro", "Não foi possível alterar o cargo. Tente novamente.");
    } finally {
      setUpdating(null);
    }
  };

  const showRolePicker = useCallback(
    (targetUser: User) => {
      const options = ROLES.map((r) => ROLE_LABELS[r]);

      if (Platform.OS === "ios") {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            title: `Cargo de @${targetUser.username}`,
            options: [...options, "Cancelar"],
            cancelButtonIndex: options.length,
            destructiveButtonIndex: undefined,
          },
          (idx) => {
            if (idx < ROLES.length) {
              changeRole(targetUser, ROLES[idx]);
            }
          }
        );
      } else {
        Alert.alert(
          `Cargo de @${targetUser.username}`,
          `Cargo atual: ${ROLE_LABELS[targetUser.role]}`,
          [
            ...ROLES.filter((r) => r !== targetUser.role).map((r) => ({
              text: `→ ${ROLE_LABELS[r]}`,
              onPress: () => changeRole(targetUser, r),
            })),
            { text: "Cancelar", style: "cancel" as const },
          ]
        );
      }
    },
    [changeRole]
  );

  const toggleSuspend = useCallback(async (targetUser: User) => {
    const newVal = !targetUser.isSuspended;
    Alert.alert(
      newVal ? "Suspender usuário" : "Reativar usuário",
      newVal
        ? `@${targetUser.username} não poderá acessar o app enquanto suspenso.`
        : `@${targetUser.username} voltará a ter acesso normal.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: newVal ? "Suspender" : "Reativar",
          style: newVal ? "destructive" : "default",
          onPress: async () => {
            setUpdating(targetUser.id);
            try {
              await updateDoc(doc(db, "users", targetUser.id), {
                isSuspended: newVal,
              });
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setUsers((prev) =>
                prev.map((u) =>
                  u.id === targetUser.id
                    ? { ...u, isSuspended: newVal }
                    : u
                )
              );
            } finally {
              setUpdating(null);
            }
          },
        },
      ]
    );
  }, []);

  const filtered = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: User }) => {
    const isSelf = item.id === user?.id;
    const isUpdating = updating === item.id;

    return (
      <View
        style={[
          styles.userCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            opacity: item.isSuspended ? 0.6 : 1,
          },
        ]}
      >
        <Avatar uri={item.photoURL} name={item.username} size="md" />

        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={[styles.username, { color: colors.text }]}>
              @{item.username}
            </Text>
            {isSelf && (
              <View
                style={[
                  styles.selfBadge,
                  { backgroundColor: colors.primary + "22" },
                ]}
              >
                <Text style={[styles.selfBadgeText, { color: colors.primary }]}>
                  você
                </Text>
              </View>
            )}
            {item.isSuspended && (
              <View
                style={[
                  styles.selfBadge,
                  { backgroundColor: colors.destructive + "22" },
                ]}
              >
                <Text
                  style={[styles.selfBadgeText, { color: colors.destructive }]}
                >
                  suspenso
                </Text>
              </View>
            )}
          </View>
          <Text style={[styles.email, { color: colors.mutedForeground }]}>
            {item.email}
          </Text>
          <RoleBadge role={item.role} size="sm" />
        </View>

        <View style={styles.actions}>
          {isUpdating ? (
            <ActivityIndicator color={colors.primary} size="small" />
          ) : (
            <>
              <TouchableOpacity
                style={[styles.actionBtn, { borderColor: colors.border }]}
                onPress={() => showRolePicker(item)}
              >
                <Feather name="shield" size={14} color={colors.primary} />
                <Text style={[styles.actionBtnText, { color: colors.primary }]}>
                  Cargo
                </Text>
              </TouchableOpacity>

              {!isSelf && (
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    {
                      borderColor: item.isSuspended
                        ? colors.primary + "60"
                        : colors.destructive + "60",
                    },
                  ]}
                  onPress={() => toggleSuspend(item)}
                >
                  <Feather
                    name={item.isSuspended ? "user-check" : "user-x"}
                    size={14}
                    color={
                      item.isSuspended ? colors.primary : colors.destructive
                    }
                  />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Administração",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
        }}
      />

      <FlatList
        data={filtered}
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
          <View style={styles.header}>
            <View
              style={[
                styles.statsRow,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              {[
                {
                  label: "Total",
                  value: users.length,
                  icon: "users" as const,
                },
                {
                  label: "Instrutores",
                  value: users.filter((u) => u.role === "instrutor").length,
                  icon: "award" as const,
                },
                {
                  label: "Admins",
                  value: users.filter((u) => u.role === "administrador").length,
                  icon: "shield" as const,
                },
              ].map((stat, i, arr) => (
                <View
                  key={stat.label}
                  style={[
                    styles.stat,
                    i < arr.length - 1 && {
                      borderRightColor: colors.border,
                      borderRightWidth: StyleSheet.hairlineWidth,
                    },
                  ]}
                >
                  <Feather
                    name={stat.icon}
                    size={16}
                    color={colors.mutedForeground}
                  />
                  <Text style={[styles.statNum, { color: colors.text }]}>
                    {stat.value}
                  </Text>
                  <Text
                    style={[
                      styles.statLabel,
                      { color: colors.mutedForeground },
                    ]}
                  >
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.quickActions}>
              <TouchableOpacity
                style={[
                  styles.quickBtn,
                  { borderColor: colors.destructive + "50", backgroundColor: colors.destructive + "10" },
                ]}
                onPress={() => router.push("/moderacao" as any)}
              >
                <Feather name="flag" size={15} color={colors.destructive} />
                <Text style={[styles.quickBtnText, { color: colors.destructive }]}>
                  Moderação de posts
                </Text>
                <Feather name="chevron-right" size={15} color={colors.destructive} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.quickBtn,
                  { borderColor: colors.border, backgroundColor: colors.card },
                ]}
                onPress={loadUsers}
              >
                <Feather name="refresh-cw" size={15} color={colors.primary} />
                <Text style={[styles.quickBtnText, { color: colors.primary }]}>
                  Atualizar lista
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              {filtered.length} USUÁRIO{filtered.length !== 1 ? "S" : ""}
            </Text>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.center}>
              <ActivityIndicator color={colors.primary} size="large" />
              <Text
                style={[styles.loadingText, { color: colors.mutedForeground }]}
              >
                Carregando usuários...
              </Text>
            </View>
          ) : (
            <View style={styles.center}>
              <Feather name="users" size={40} color={colors.mutedForeground} />
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
                Nenhum usuário encontrado
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, gap: 10 },
  header: { gap: 12, marginBottom: 8 },
  statsRow: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    gap: 4,
  },
  statNum: { fontFamily: "Inter_700Bold", fontSize: 20 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 11 },
  quickActions: { gap: 8 },
  quickBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
  },
  quickBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 13, flex: 1 },
  refreshBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  refreshText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
    paddingHorizontal: 2,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  userInfo: { flex: 1, gap: 4 },
  userNameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  username: { fontFamily: "Inter_700Bold", fontSize: 15 },
  email: { fontFamily: "Inter_400Regular", fontSize: 12 },
  selfBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  selfBadgeText: { fontFamily: "Inter_600SemiBold", fontSize: 10 },
  actions: { gap: 6, alignItems: "flex-end" },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
  center: { alignItems: "center", justifyContent: "center", gap: 12, paddingTop: 60 },
  loadingText: { fontFamily: "Inter_400Regular", fontSize: 14 },
  emptyText: { fontFamily: "Inter_400Regular", fontSize: 14 },
});
