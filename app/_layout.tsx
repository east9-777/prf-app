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
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

async function requestPermissions() {
  if (Platform.OS === "web") return;

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
              <RootLayoutNav />
            </AuthProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
