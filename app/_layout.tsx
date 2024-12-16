import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Provider as PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LoginContext } from "@/contexts/loginContext";
import { supabase } from "@/lib/supabase";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Blank() {
  return <></>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function checkUser() {
      const resp = await supabase.auth.getUser();
      setIsLoggedIn(resp.data.user ? true : false);
      console.log(resp.data.user);
    }
    checkUser();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Slot />;
  }

  if (isLoggedIn === null) {
    return <Slot />;
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <PaperProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="signin"
              options={{ headerShown: false, title: "Sign In" }}
            />
            <Stack.Screen
              name="verification"
              options={{ title: "Verification", headerLeft: Blank }}
            />
            <Stack.Screen
              name="registration"
              options={{ title: "Basic Details" }}
            />
            <Stack.Screen
              name="decodeAge"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="dietPlanning"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="calorieCounter"
              options={{ headerShown: false }}
            />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </LoginContext.Provider>
  );
}
