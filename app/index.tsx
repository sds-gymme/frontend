import React from "react";
import { View } from "react-native";
import LoginComponent from "@/components/LoginAction";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <LoginComponent />
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
