import React from "react";
import { View } from "react-native";
import Background from "@/components/Background";
import SignIn from "@/components/SignIn";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Background />
      <SignIn />
    </View>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
