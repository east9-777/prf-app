import { Redirect } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Aprovação PRF</Text>
        <ActivityIndicator size="large" color="#1565C0" style={styles.spinner} />
      </View>
    );
  }

  if (!user) return <Redirect href="/login" />;
  if (!user.username) return <Redirect href="/setup-username" />;
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: "#E6EDF3",
    letterSpacing: -0.3,
  },
  spinner: {
    marginTop: 16,
  },
});
