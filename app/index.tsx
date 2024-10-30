// index.tsx
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import SignIn from "@/components/SignIn";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SignIn />
    </GestureHandlerRootView>
  );
};

