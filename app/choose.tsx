import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Title, Paragraph, TouchableRipple } from "react-native-paper";
import { Image } from "expo-image";
import { router } from "expo-router";
import { LoginContext } from "@/contexts/loginContext";
import { useContext } from "react";
const UserTypeSelector = () => {
    const { setUserRole } = useContext(LoginContext);

    const handleNormalPress = () => {
        setUserRole("user");
        router.replace("/registration");
    };
    const handleTrainerPress = () => {
        setUserRole("trainer");
        router.replace("/trainerReg")
    };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Which track defines you</Text>
      <TouchableRipple
        onPress={handleNormalPress}
        style={[styles.card, styles.normalCard]}
      >
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/GymWorkout.svg")}
              style={styles.User}
            />
          </View>
          <View style={styles.contentPadding}>
            <Title style={styles.title}>Normal</Title>
          </View>
        </View>
      </TouchableRipple>
      <View style={styles.separator} />
      <TouchableRipple
        onPress={handleTrainerPress}
        style={[styles.card, styles.trainerCard]}
      >
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/MMA.svg")}
              style={styles.User}
            />
          </View>
          <View style={styles.contentPadding}>
            <Title style={styles.title}>Trainer</Title>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 40,

  },
  card: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 2,
  },
  User: {
    width: 218,
    height: 178,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  normalCard: {
    marginBottom: -5,
  },
  trainerCard: {
    marginTop: 16,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentPadding: {
    paddingVertical: 10,
  },
  title: {
    fontWeight: "bold",
    color: "#333",
  },
  separator: {
    height: 16,
    color: "#333",
  },
});

export default UserTypeSelector;
