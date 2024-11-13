import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  // Image,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import ImageCarousel from "@/components/ImageCarousel";
import CouponCard from "@/components/CouponCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

const Header = ({ username = "Pravesh" }) => (
  <View style={styles.header}>
    <View>
      <Text style={styles.welcomeText}>Welcome back,</Text>
      <Text style={styles.usernameText}>{username}!</Text>
    </View>
    <Image
      source={require("../../assets/images/gymmeLogo.svg")}
      style={styles.logo}
    />
  </View>
);

const SearchBar = () => {
  const placeholders = [
    "gym workout",
    "cardio",
    "crossfit",
    "zumba",
    "aerobics",
    "boxing",
    "martial arts",
    "expertise",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(placeholders[0]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const nextIndex = (placeholderIndex + 1) % placeholders.length;
          setPlaceholderIndex(nextIndex);
          setDisplayedText(placeholders[nextIndex]);

          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [fadeAnim, placeholderIndex]);

  return (
    <View style={styles.searchContainer}>
      <Ionicons
        size={20}
        style={[{ margin: "auto" }]}
        name="search"
        color="#666"
      />
      <View style={styles.searchInput}>
        <Text style={styles.staticText}>Search for </Text>
        <Animated.Text style={[styles.animatedText, { opacity: fadeAnim }]}>
          {displayedText}
        </Animated.Text>
      </View>
    </View>
  );
};

const HomePage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <SearchBar />

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Image
              source={require("@/assets/images/LivePersonalTraining.svg")}
              style={styles.squareCard}
            />
          </View>
          <View style={styles.gridItem}>
            <Image
              source={require("@/assets/images/RecordedHomeWorkout.svg")}
              style={styles.squareCard}
            />
          </View>
          <View style={styles.gridItem}>
            <Image
              source={require("@/assets/images/PersonalTraining.svg")}
              style={styles.squareCard}
            />
          </View>
          <View style={styles.gridItem}>
            <Image
              source={require("@/assets/images/DietPlanning.svg")}
              style={styles.squareCard}
            />
          </View>
          <View style={styles.gridItem}>
            <Image
              source={require("@/assets/images/CalorieCounter.svg")}
              style={styles.squareCard}
            />
          </View>
          <View style={styles.gridItem}>
            <Image
              source={require("@/assets/images/DecodeAge.svg")}
              style={styles.squareCard}
            />
          </View>
        </View>

        <ImageCarousel
          title="Professional trainer's real life"
          images={[
            {
              src: require("../../assets/images/1.png"),
              alt: "Trainer demonstrating medicine ball exercise",
            },
            {
              src: require("../../assets/images/2.png"),
              alt: "Trainer demonstrating standing exercise",
            },
            {
              src: require("../../assets/images/3.png"),
              alt: "Trainer demonstrating workout routine",
            },
          ]}
        />
        <CouponCard />
        <ImageCarousel
          title="Your fitness and healthy lifestyle made easy"
          images={[
            {
              src: require("../../assets/images/1.png"),
              alt: "Trainer demonstrating medicine ball exercise",
            },
            {
              src: require("../../assets/images/2.png"),
              alt: "Trainer demonstrating standing exercise",
            },
            {
              src: require("../../assets/images/3.png"),
              alt: "Trainer demonstrating workout routine",
            },
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingTop: StatusBar.currentHeight || 0,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
  },
  usernameText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 120,
    height: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    flexDirection: "row",
  },
  staticText: {
    color: "#666",
  },
  animatedText: {
    color: "#666",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8, // Compensate for gridItem margin
  },
  gridItem: {
    width: "50%", // Two columns
    padding: 8,
  },
  squareCard: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 20,
  },
  card: {
    padding: 16,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  freeTag: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default HomePage;
