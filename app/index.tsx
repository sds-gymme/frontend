import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "@/components/SignIn";
import Verification from "./screens/Verification";
import Registration from "./screens/Registration";
import HomePage from "./screens/HomePage"; // Import HomePage
import Tabs from "./(tabs)/Tabs";

const Stack = createStackNavigator();

export default function Index() {
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
        <Stack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={Registration}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomePage} // Add HomePage component
        />
        <Stack.Screen
          name="MainTabs"
          options={{ headerShown: false }}
          component={Tabs}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
