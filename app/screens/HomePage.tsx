// Homepage.tsx

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
        <View style={styles.titleAndLogoContainer}>
          <Appbar.Content title="Pravesh!" titleStyle={styles.title} />
          <Text style={styles.subtitle}>Welcome back,</Text>
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
          <Card.Content>
            <Title>Live Personal Training</Title>
            <Button
              mode="contained-tonal"
              buttonColor="#FF6B6B"
              textColor="white"
              style={styles.button}
            >
              Live
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Free Recorded Home Workout</Title>
            <Button
              mode="contained-tonal"
              buttonColor="#4285F4"
              textColor="white"
              style={styles.button}
            >
              Rec
            </Button>
            <Button
              mode="contained-tonal"
              buttonColor="#4285F4"
              textColor="white"
              style={styles.button}
            >
              Free Home Workout
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Personal Training @ Nearby Gym</Title>
            <Paragraph>45 Min/Session</Paragraph>
            <Button
              mode="contained-tonal"
              buttonColor="#34A853"
              textColor="white"
              style={styles.button}
            >
              Book Now
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Free Diet Planner</Title>
            <Paragraph>Protein, Carb, Fibre</Paragraph>
            <Button
              mode="contained-tonal"
              buttonColor="#FFA500"
              textColor="white"
              style={styles.button}
            >
              Get Diet Plan
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Decode Age (Forever Young!)</Title>
            <Paragraph>Discover your youthful potential.</Paragraph>
            <Button
              mode="contained-tonal"
              buttonColor="#6C63FF"
              textColor="white"
              style={styles.button}
            >
              Learn More
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Calorie Counter</Title>
            <Paragraph>50 Kcal</Paragraph>
            <Button
              mode="contained-tonal"
              buttonColor="#FF6B6B"
              textColor="white"
              style={styles.button}
            >
              Track Calories
            </Button>
          </Card.Content>
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
  },
  titleAndLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  logo: {
    width: 40,
    height: 40,
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
    padding: 8,
  },
  card: {
    width: "45%",
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  button: {
    marginTop: 12,
  },
});

export default Homepage;
