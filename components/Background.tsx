import React from "react";
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

const LoginComponent = () => {
  const router = useRouter(); 
  const image = require("../assets/images/1.png");
  const handleLogin = () => {
    // Add your login logic here
    // For now, we'll just navigate to the tabs
    router.replace("/(tabs)");
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image} 
        resizeMode="cover" 
        style={styles.image} 
      >
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 0,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text : {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  }
});

export default LoginComponent;
