import { Text, View } from "react-native";
import React, { Component } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationCompo from "@/components/Registration";

export default function Registration() {
  const Stack = createStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen
          name=" "
          options={{ headerTitle: "Basic Information" }}
          component={RegistrationCompo}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
