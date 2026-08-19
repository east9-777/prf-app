import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useDisplayName } from "@/hooks/useDisplayName";
import { useAppUpdate } from "@/hooks/useAppUpdate";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 320);

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { icon: "calendar" as const, label: "Meu Cronograma", route: "/cronograma" },
  { icon: "compass" as const, label: "Ordem de Estudo", route: "/ordem-estudo" },
  { icon: "flag" as const, label: "Etapas do Concurso", route: "/etapas" },
  { icon: "bell" as const, label: "Novidades", route: "/novidades" },
  { icon: "settings" as const, label: "Configurações", route: "/settings" },
  { icon: "info" as const, label: "Créditos", route: "/credits" },
];

export function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const colors = useColors();
  const { displayName } = useDisplayName();
  const { updateAvailable } = useAppUpdate();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: -DRAWER_WIDTH,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const navigate = (route: string) => {
    onClose();
    setTimeout(() => router.push(route as any), 200);
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.drawer,
          {
            width: DRAWER_WIDTH,
            backgroundColor: colors.card,
            borderRightColor: colors.border,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View
          style={[
            styles.brandSection,
            {
              paddingTop: insets.top + 20,
              borderBottomColor: colors.border,
              backgroundColor: colors.background,
            },
          ]}
        >
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.brandTitle, { color: colors.text }]}>
            Project <Text style={{ color: colors.primary }}>P.R.F</Text>
          </Text>
          {!!displayName && (
            <Text style={[styles.greeting, { color: colors.mutedForeground }]}>
              Olá, {displayName}
            </Text>
          )}
        </View>

        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => navigate(item.route)}
            >
              <Feather name={item.icon} size={20} color={colors.mutedForeground} />
              <Text style={[styles.menuLabel, { color: colors.text }]}>
                {item.label}
              </Text>
              {item.route === "/novidades" && updateAvailable && (
                <View style={[styles.badgeDot, { backgroundColor: colors.destructive }]} />
              )}
              <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    borderRightWidth: 1,
    justifyContent: "flex-start",
  },
  brandSection: {
    padding: 20,
    paddingBottom: 20,
    gap: 4,
    borderBottomWidth: 1,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  brandTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
  },
  greeting: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
  },
  menu: {
    flex: 1,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuLabel: {
    flex: 1,
    fontFamily: "Inter_500Medium",
    fontSize: 15,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
});
