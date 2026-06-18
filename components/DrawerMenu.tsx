import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
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
import { Avatar } from "@/components/Avatar";
import { RoleBadge } from "@/components/RoleBadge";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.78, 320);

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { icon: "user" as const, label: "Meu Perfil", route: "/(tabs)/perfil" },
  { icon: "calendar" as const, label: "Meu Cronograma", route: "/cronograma" },
  { icon: "flag" as const, label: "Etapas do Concurso", route: "/etapas" },
  { icon: "users" as const, label: "Comunidade", route: "/comunidade" },
  { icon: "settings" as const, label: "Configurações", route: "/settings" },
  { icon: "info" as const, label: "Créditos", route: "/credits" },
];

export function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const colors = useColors();
  const { user, logout } = useAuth();
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

  const handleLogout = async () => {
    onClose();
    setTimeout(async () => {
      await logout();
    }, 200);
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
            styles.profileSection,
            {
              paddingTop: insets.top + 20,
              borderBottomColor: colors.border,
              backgroundColor: colors.background,
            },
          ]}
        >
          <Avatar uri={user?.photoURL} name={user?.username} size="lg" />
          <Text style={[styles.username, { color: colors.text }]}>
            @{user?.username}
          </Text>
          {user?.role && <RoleBadge role={user.role} size="md" />}
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
              <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.logoutBtn,
            { borderTopColor: colors.border, paddingBottom: insets.bottom + 16 },
          ]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color={colors.destructive} />
          <Text style={[styles.logoutText, { color: colors.destructive }]}>
            Sair
          </Text>
        </TouchableOpacity>
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
    justifyContent: "space-between",
  },
  profileSection: {
    padding: 20,
    paddingBottom: 20,
    gap: 8,
    borderBottomWidth: 1,
  },
  username: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    marginTop: 4,
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
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 1,
  },
  logoutText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
  },
});
