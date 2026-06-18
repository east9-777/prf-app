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
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";
import { PostsProvider } from "@/context/PostsContext";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

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
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <KeyboardProvider>
              <AuthProvider>
                <PostsProvider>
                  <RootLayoutNav />
                </PostsProvider>
              </AuthProvider>
            </KeyboardProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
