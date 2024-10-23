// components/SignIn.js
import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Link } from "@react-navigation/native";

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <Button title="Sign In" onPress={() => alert("Sign In")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 0,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,

    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default SignIn;
