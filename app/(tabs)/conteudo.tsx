import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { CONTEUDO_SUBJECTS, type ConteudoSubject } from "@/lib/conteudoData";

export default function ConteudoScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const filtered = CONTEUDO_SUBJECTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: ConteudoSubject }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      onPress={() => router.push(`/conteudo/${item.id}` as any)}
    >
      <View style={[styles.iconWrap, { backgroundColor: item.color + "22" }]}>
        <Feather name={item.icon as any} size={22} color={item.color} />
      </View>
      <View style={styles.cardInfo}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text
          style={[styles.cardDesc, { color: colors.mutedForeground }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: colors.muted }]}>
            <Feather name="list" size={11} color={colors.mutedForeground} />
            <Text style={[styles.badgeText, { color: colors.mutedForeground }]}>
              {item.topics.length} tópicos
            </Text>
          </View>
          {item.topics.some((t) => t.incidencia === "alta") && (
            <View style={[styles.badge, { backgroundColor: colors.destructive + "22" }]}>
              <Feather name="trending-up" size={11} color={colors.destructive} />
              <Text style={[styles.badgeText, { color: colors.destructive }]}>
                Alta incidência
              </Text>
            </View>
          )}
        </View>
      </View>
      <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Feather name="search" size={16} color={colors.mutedForeground} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar matéria..."
                placeholderTextColor={colors.mutedForeground}
                style={[styles.searchInput, { color: colors.text }]}
              />
              {search.length > 0 && (
                <Pressable onPress={() => setSearch("")}>
                  <Feather name="x" size={16} color={colors.mutedForeground} />
                </Pressable>
              )}
            </View>
            <Text
              style={[styles.sectionLabel, { color: colors.mutedForeground }]}
            >
              {filtered.length} MATÉRIAS
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="search" size={40} color={colors.border} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Nenhuma matéria encontrada
            </Text>
          </View>
        }
        contentContainerStyle={[
          styles.list,
          {
            paddingBottom:
              insets.bottom + (Platform.OS === "web" ? 34 : 0) + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { gap: 0 },
  header: { padding: 16, gap: 12 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    padding: 0,
  },
  sectionLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 1,
    marginLeft: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: { flex: 1, gap: 5 },
  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  cardDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 17,
  },
  badgeRow: { flexDirection: "row", gap: 6, marginTop: 2 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
  },
  empty: {
    alignItems: "center",
    gap: 12,
    paddingTop: 60,
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
});
