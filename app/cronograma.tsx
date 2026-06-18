import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyState } from "@/components/EmptyState";
import { useColors } from "@/hooks/useColors";
import { getData, storeData, STORAGE_KEYS } from "@/lib/storage";
import type { ScheduleItem } from "@/lib/types";

const COLORS = ["#1565C0", "#EF4444", "#F59E0B", "#10B981", "#6366F1", "#EC4899"];

export default function CronogramaScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  useEffect(() => {
    getData<ScheduleItem[]>(STORAGE_KEYS.SCHEDULE).then((d) => {
      if (d) setItems(d);
    });
  }, []);

  const resetForm = () => {
    setTitle("");
    setDate("");
    setTime("");
    setSubject("");
    setSelectedColor(COLORS[0]);
    setEditingItem(null);
  };

  const openCreate = () => {
    resetForm();
    setModalVisible(true);
  };

  const openEdit = (item: ScheduleItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDate(item.date);
    setTime(item.time);
    setSubject(item.subject ?? "");
    setSelectedColor(item.color);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !date.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    let updated: ScheduleItem[];
    if (editingItem) {
      updated = items.map((i) =>
        i.id === editingItem.id
          ? { ...i, title, date, time, subject: subject || undefined, color: selectedColor }
          : i
      );
    } else {
      const newItem: ScheduleItem = {
        id: `sch_${Date.now()}`,
        title,
        date,
        time,
        subject: subject || undefined,
        color: selectedColor,
      };
      updated = [...items, newItem].sort((a, b) =>
        (a.date + a.time).localeCompare(b.date + b.time)
      );
    }

    setItems(updated);
    await storeData(STORAGE_KEYS.SCHEDULE, updated);
    setModalVisible(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir evento?", "Essa ação não pode ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const updated = items.filter((i) => i.id !== id);
          setItems(updated);
          await storeData(STORAGE_KEYS.SCHEDULE, updated);
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: ScheduleItem }) => (
    <View
      style={[
        styles.itemCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderLeftColor: item.color,
        },
      ]}
    >
      <View style={styles.itemLeft}>
        <Text style={[styles.itemDate, { color: item.color }]}>{item.date}</Text>
        {item.time ? (
          <Text style={[styles.itemTime, { color: colors.mutedForeground }]}>
            {item.time}
          </Text>
        ) : null}
      </View>
      <View style={styles.itemInfo}>
        <Text style={[styles.itemTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        {item.subject ? (
          <Text style={[styles.itemSubject, { color: colors.mutedForeground }]}>
            {item.subject}
          </Text>
        ) : null}
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => openEdit(item)} hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}>
          <Feather name="edit-2" size={15} color={colors.mutedForeground} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}>
          <Feather name="trash-2" size={15} color={colors.destructive} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          title: "Meu Cronograma",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
          headerRight: () => (
            <TouchableOpacity onPress={openCreate} style={{ marginRight: 4 }}>
              <Feather name="plus-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyState
            icon="calendar"
            title="Nenhum evento no cronograma"
            subtitle="Adicione sessões de estudo e metas ao seu cronograma"
            actionLabel="Adicionar evento"
            onAction={openCreate}
          />
        }
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          openCreate();
        }}
      >
        <Feather name="plus" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.card,
                paddingBottom: insets.bottom + (Platform.OS === "web" ? 34 : 0) + 16,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {editingItem ? "Editar evento" : "Novo evento"}
              </Text>
              <TouchableOpacity onPress={() => { setModalVisible(false); resetForm(); }}>
                <Feather name="x" size={22} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              {[
                { label: "Título *", value: title, onChange: setTitle, placeholder: "Ex: Estudar Direito Constitucional" },
                { label: "Data *", value: date, onChange: setDate, placeholder: "DD/MM/AAAA" },
                { label: "Horário", value: time, onChange: setTime, placeholder: "HH:MM" },
                { label: "Matéria", value: subject, onChange: setSubject, placeholder: "Ex: Legislação de Trânsito" },
              ].map((f) => (
                <View key={f.label} style={styles.formGroup}>
                  <Text style={[styles.formLabel, { color: colors.mutedForeground }]}>
                    {f.label}
                  </Text>
                  <TextInput
                    style={[
                      styles.formInput,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        color: colors.text,
                      },
                    ]}
                    placeholder={f.placeholder}
                    placeholderTextColor={colors.mutedForeground}
                    value={f.value}
                    onChangeText={f.onChange}
                  />
                </View>
              ))}

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { color: colors.mutedForeground }]}>
                  Cor
                </Text>
                <View style={styles.colorRow}>
                  {COLORS.map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={[
                        styles.colorDot,
                        { backgroundColor: c },
                        selectedColor === c && styles.colorSelected,
                      ]}
                      onPress={() => setSelectedColor(c)}
                    >
                      {selectedColor === c && (
                        <Feather name="check" size={12} color="#fff" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.saveBtn,
                { backgroundColor: title.trim() && date.trim() ? colors.primary : colors.muted },
              ]}
              onPress={handleSave}
              disabled={!title.trim() || !date.trim()}
            >
              <Text style={styles.saveBtnText}>
                {editingItem ? "Salvar alterações" : "Adicionar ao cronograma"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, gap: 8 },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: 14,
    gap: 12,
  },
  itemLeft: { alignItems: "center", minWidth: 52 },
  itemDate: { fontFamily: "Inter_700Bold", fontSize: 13 },
  itemTime: { fontFamily: "Inter_400Regular", fontSize: 11, marginTop: 2 },
  itemInfo: { flex: 1, gap: 3 },
  itemTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  itemSubject: { fontFamily: "Inter_400Regular", fontSize: 12 },
  itemActions: { flexDirection: "row", gap: 12 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 16,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: { fontFamily: "Inter_700Bold", fontSize: 18 },
  form: { gap: 12 },
  formGroup: { gap: 6 },
  formLabel: { fontFamily: "Inter_500Medium", fontSize: 12 },
  formInput: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
  colorRow: { flexDirection: "row", gap: 10 },
  colorDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelected: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  saveBtn: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
