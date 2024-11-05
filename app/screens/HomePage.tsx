import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Appbar,
  TextInput,
} from "react-native-paper";

const Homepage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.subtitle}>Welcome Back!</Text>
          <Text style={styles.title}>Pravesh!</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Group 18337.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </Appbar.Header>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for 'Gym workout'"
          mode="outlined"
          left={<TextInput.Icon icon="magnify" />}
          outlineColor="rgba(0, 0, 0, 0.2)"
        />
      </View>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Cover
            source={require("../../assets/images/Frame 427319410.png")}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </Card>

        <Card style={styles.card}>
          <Card.Cover
            source={require("../../assets/images/Frame 427319403.png")}
            style={styles.cardImage}
          />
        </Card>

        <Card style={styles.card}>
          <Card.Cover
            source={require("../../assets/images/Frame 427319405.png")}
            style={styles.cardImage}
          />
        </Card>

        <Card style={styles.card}>
          <Card.Cover
            source={require("../../assets/images/Frame 427319406.png")}
            style={styles.cardImage}
          />
        </Card>

        <Card style={styles.card}>
          <Card.Cover
            source={require("../../assets/images/Frame 427319407.png")}
            style={styles.cardImage}
          />
        </Card>

        <Card style={styles.card}>
          <Card.Cover
            source={require("../../assets/images/Frame 427319409.png")}
            style={styles.cardImage}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
   
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  logoContainer: {
    marginLeft: "auto", // Pushes the logo to the far right
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  logo: {
    width: 120,
    height: 120,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 20,
  },
  searchBar: {
    backgroundColor: "white",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 0,
    backgroundColor: "white",
  },
  card: {
    width: "45%",
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  },
  cardImage: {
    height: 160, // Adjust this value based on your needs
    width: 184,
    resizeMode: "cover",
  },
  button: {
    marginTop: 12,
  },
});

export default Homepage;
