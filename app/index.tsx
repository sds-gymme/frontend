// index.tsx
import React from "react";
import { SafeAreaView, StyleSheet,  } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Stack } from "expo-router";
import SignIn from "@/components/SignIn";
import Verification from "./screens/Verification";

export default function Index() {

  const Stack = createStackNavigator(); 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          options={{ headerShown: false }}
          component={SignIn}
        />
        <Stack.Screen
          name="Verification"
          options={{ headerShown: false }}
          component={Verification}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

