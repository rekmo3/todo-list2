import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync().catch(() => {});

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error(
    "Не задано EXPO_PUBLIC_CONVEX_URL. Додайте URL деплою у .env і перезапустіть: npx expo start -c",
  );
}

const convex = new ConvexReactClient(convexUrl, {
  unsavedChangesWarning: false,
});

function AppShell() {
  const { isDarkMode, colors, loaded: themeLoaded } = useTheme();

  useEffect(() => {
    if (themeLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [themeLoaded]);

  if (!themeLoaded) return null;

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <AppShell />
        </ThemeProvider>
      </ConvexProvider>
    </SafeAreaProvider>
  );
}
