import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";
import { PostsProvider } from "@/context/PostsContext";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function requestPermissions() {
  if (Platform.OS === "web") return;

  const { status: notifStatus } = await Notifications.getPermissionsAsync();
  if (notifStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Notificações desativadas",
        "Você pode ativar as notificações a qualquer momento em Configurações > Project P.R.F.",
        [
          { text: "Agora não" },
          {
            text: "Abrir Configurações",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
  }

  const { status: mediaStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (mediaStatus !== "granted") {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  }
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="setup-username" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="post/[id]"
        options={{ headerShown: true, presentation: "card" }}
      />
      <Stack.Screen
        name="create-post"
        options={{ headerShown: true, presentation: "modal" }}
      />
      <Stack.Screen
        name="comunidade"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="subject/[id]"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="simulado/[id]"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="simulado/results"
        options={{ headerShown: true, presentation: "modal" }}
      />
      <Stack.Screen
        name="cronograma"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="etapas"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="credits"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="settings"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="profile/[username]"
        options={{ headerShown: true }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      requestPermissions();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
              <AuthProvider>
                <PostsProvider>
                  <RootLayoutNav />
                </PostsProvider>
              </AuthProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
