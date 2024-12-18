import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
// import "react-native-reanimated";
import { Provider as PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LoginContext } from "@/contexts/loginContext";
import { supabase } from "@/lib/supabase";

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
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, title: "Home" }}
            />
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
              name="nearbyGym"
              options={{ title: "Nearby Gyms", headerShown: false }}
            />
            <Stack.Screen
              name="gymDetails/[slug]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="livePersonalTraining"
              options={{ title: "Live Personal Training" }}
            />
            <Stack.Screen
              name="trainerPage"
              options={{ title: "Online Trainers" }}
            />
            <Stack.Screen
              name="recordedHomeWorkout"
              options={{ title: "Recorded Workouts" }}
            />
            <Stack.Screen
              name="gymWorkout"
              options={{ title: "Gym Workout" }}
            />
            <Stack.Screen name="excercisePage" options={{ title: "Workout" }} />
            <Stack.Screen
              name="excerciseDetails"
              options={{ title: "Exercise" }}
            />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </LoginContext.Provider>
  );
}
