import React, { useState, useMemo } from "react";
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
import { MOCK_SUBJECTS, MOCK_SIMULADOS } from "@/lib/mockData";

type ResultType = "materia" | "simulado";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: ResultType;
  icon: string;
  route: string;
}

export default function SearchScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  const allItems: SearchResult[] = useMemo(() => {
    const subjects: SearchResult[] = MOCK_SUBJECTS.map((s) => ({
      id: s.id,
      title: s.name,
      subtitle: `${s.topics.length} tópicos`,
      type: "materia",
      icon: s.icon,
      route: `/subject/${s.id}`,
    }));

    const simulados: SearchResult[] = MOCK_SIMULADOS.map((s) => ({
      id: s.id,
      title: s.title,
      subtitle: `${s.questions.length} questões · ${s.timeLimit} min`,
      type: "simulado",
      icon: "clipboard",
      route: `/simulado/${s.id}`,
    }));

    return [...subjects, ...simulados];
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.subtitle.toLowerCase().includes(lower)
    );
  }, [query, allItems]);

  const typeLabel: Record<ResultType, string> = {
    materia: "Matéria",
    simulado: "Simulado",
  };

  const typeColor: Record<ResultType, string> = {
    materia: colors.primary,
    simulado: "#6366F1",
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + (Platform.OS === "web" ? 67 : 0),
        },
      ]}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: colors.border },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          style={styles.backBtn}
        >
          <Feather name="arrow-left" size={22} color={colors.text} />
        </Pressable>

        <View
          style={[
            styles.inputWrapper,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Feather name="search" size={16} color={colors.mutedForeground} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Buscar matérias, simulados..."
            placeholderTextColor={colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <Feather name="x" size={16} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>
      </View>

      {query.trim() === "" ? (
        <View style={styles.emptyState}>
          <Feather name="search" size={48} color={colors.mutedForeground} style={{ opacity: 0.4 }} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            O que você procura?
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
            Digite o nome de uma matéria ou simulado
          </Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="frown" size={48} color={colors.mutedForeground} style={{ opacity: 0.4 }} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Nenhum resultado
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
            Tente buscar por outro termo
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.resultItem,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.75 : 1,
                },
              ]}
              onPress={() => router.push(item.route as any)}
            >
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: typeColor[item.type] + "22" },
                ]}
              >
                <Feather
                  name={item.icon as any}
                  size={18}
                  color={typeColor[item.type]}
                />
              </View>
              <View style={styles.resultText}>
                <Text
                  style={[styles.resultTitle, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text
                  style={[styles.resultSubtitle, { color: colors.mutedForeground }]}
                  numberOfLines={1}
                >
                  {item.subtitle}
                </Text>
              </View>
              <View
                style={[
                  styles.typeBadge,
                  { backgroundColor: typeColor[item.type] + "22" },
                ]}
              >
                <Text style={[styles.typeBadgeText, { color: typeColor[item.type] }]}>
                  {typeLabel[item.type]}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: { padding: 4 },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    padding: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    textAlign: "center",
  },
  emptySubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    textAlign: "center",
  },
  list: { padding: 16, gap: 10 },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: { flex: 1, gap: 2 },
  resultTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  resultSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
  },
});
