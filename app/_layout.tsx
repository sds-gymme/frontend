import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LoginContext } from "@/contexts/loginContext";
import { supabase } from "@/lib/supabase";

SplashScreen.preventAutoHideAsync();

function Blank() {
  return <></>;
}

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: DefaultTheme.colors.card,
    text: DefaultTheme.colors.text,
  },
};

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
          value={colorScheme === "dark" ? customDarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: DefaultTheme.colors.card,
              },
              headerTintColor: DefaultTheme.colors.text,
            }}
          >
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
              options={{
                title: "Verification",
                headerLeft: Blank,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="registration"
              options={{ title: "Basic Details" }}
            />
            <Stack.Screen
              name="decodeAge"
              options={{
                title: "Decode Age",
              }}
            />
            <Stack.Screen
              name="dietPlanning"
              options={{ title: "Diet Planning" }}
            />
            <Stack.Screen
              name="calorieCounter"
              options={{ title: "Calorie Counter" }}
            />
            <Stack.Screen
              name="nearbyGym"
              options={{
                title: "Nearby Gym",
              }}
            />
            <Stack.Screen
              name="recordedHomeWorkout"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="trainerHome" options={{ headerShown: false }} />
            <Stack.Screen
              name="livePersonalTraining"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="trainerReg" options={{ headerShown: false }} />
            <Stack.Screen
              name="helpCenter"
              options={{ title: "Help Center" }}
            />
            <Stack.Screen
              name="gymDetails/[slug]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="trainerProfile/[id]"
              options={{
                title: "Trainer Profile",
              }}
            />
            <Stack.Screen
              name="trainerPage"
              options={{
                title: "Trainers",
              }}
            />
            <Stack.Screen
              name="aboutGymme"
              options={{
                title: "Trainers",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="worktype/[type]"
              options={{
                title: "Workouts",
              }}
            />
            <Stack.Screen
              name="workout/[id]"
              options={{
                title: "Workout",
              }}
            />
            <Stack.Screen
              name="exerciseDetails/[id]"
              options={{
                title: "Exercise",
              }}
            />
            <Stack.Screen
              name="videoCall"
              options={{
                title: "Video Call",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="clientVideo"
              options={{
                title: "Client Video",
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </LoginContext.Provider>
  );
}
