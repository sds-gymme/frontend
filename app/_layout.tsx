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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Blank() {
  return <></>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
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
              options={{ title: "Verification", headerLeft: Blank, headerShown: false }}
            />
            <Stack.Screen
              name="registration"
              options={{ title: "Basic Details" }}
            />
            <Stack.Screen name="choose" options={{ headerShown: false }} />
            <Stack.Screen name="trainerReg" options={{ headerShown: false }} />
            <Stack.Screen name="trainerHome" options={{ headerShown: false }} />
            <Stack.Screen name="recordedHomeWorkout" options={{ title: "Recorded Home Workout" }} />
            <Stack.Screen name="livePersonalTraining" options={{ title: "Live Personal Training" }} />
            <Stack.Screen name="gymWorkout" options={{ title: "Gym Workout" }} />
            <Stack.Screen name="excercisePage" options={{ headerTitle: "" }} />
            <Stack.Screen name="excerciseDetails" options={{ headerTitle: "Excercise Details" }} />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </LoginContext.Provider>
  );
}
