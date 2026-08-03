import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyState } from "@/components/EmptyState";
import { useColors } from "@/hooks/useColors";
import { MOCK_NOTIFICATIONS } from "@/lib/mockData";
import { getData, storeData, STORAGE_KEYS } from "@/lib/storage";
import type { Notification } from "@/lib/types";
import { formatRelative } from "@/lib/dateUtils";

const ICON_MAP: Record<string, keyof typeof Feather.glyphMap> = {
  like: "heart",
  comment: "message-circle",
  reply: "corner-down-right",
  new_post: "rss",
  system: "info",
};

export default function NotificacoesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getData<Notification[]>(STORAGE_KEYS.NOTIFICATIONS).then((n) => {
      if (n && n.length > 0) {
        setNotifications(n);
      } else {
        setNotifications(MOCK_NOTIFICATIONS);
        storeData(STORAGE_KEYS.NOTIFICATIONS, MOCK_NOTIFICATIONS);
      }
    });
  }, []);

  const markAllRead = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
    storeData(STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  const markRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      );
      storeData(STORAGE_KEYS.NOTIFICATIONS, updated);
      return updated;
    });
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: item.isRead ? colors.background : colors.card,
          borderBottomColor: colors.border,
        },
      ]}
      onPress={() => markRead(item.id)}
    >
      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor:
              item.type === "like"
                ? colors.destructive + "22"
                : item.type === "comment" || item.type === "reply"
                ? colors.primary + "22"
                : colors.muted,
          },
        ]}
      >
        <Feather
          name={ICON_MAP[item.type] ?? "bell"}
          size={18}
          color={
            item.type === "like"
              ? colors.destructive
              : item.type === "comment" || item.type === "reply"
              ? colors.primary
              : colors.mutedForeground
          }
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.body, { color: colors.mutedForeground }]}>
          {item.body}
        </Text>
        <Text style={[styles.time, { color: colors.mutedForeground }]}>
          {formatRelative(item.createdAt)}
        </Text>
      </View>
      {!item.isRead && (
        <View style={[styles.dot, { backgroundColor: colors.primary }]} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          unreadCount > 0 ? (
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
              <Text style={[styles.unread, { color: colors.mutedForeground }]}>
                {unreadCount} não lida{unreadCount > 1 ? "s" : ""}
              </Text>
              <TouchableOpacity onPress={markAllRead}>
                <Text style={[styles.markAll, { color: colors.primary }]}>
                  Marcar todas como lidas
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <EmptyState
            icon="bell"
            title="Sem notificações"
            subtitle="Quando houver novidades, elas aparecerão aqui"
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  unread: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
  },
  markAll: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  content: { flex: 1, gap: 3 },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  body: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  time: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    marginTop: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
});
