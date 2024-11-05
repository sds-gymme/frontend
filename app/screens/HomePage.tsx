import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Search } from "lucide-react-native";

// Header Component
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

// Search Bar Component
const SearchBar = () => (
  <View style={styles.searchContainer}>
    <Search size={20} color="#666" />
    <TextInput
      placeholder="Search for 'Gym workout'"
      style={styles.searchInput}
      placeholderTextColor="#666"
    />
  </View>
);

// Feature Card Component
const FeatureCard = ({ title, subtitle, color, icon, style }) => (
  <View style={[styles.card, { backgroundColor: color }, style]}>
    {icon}
    <Text style={styles.cardTitle}>{title}</Text>
    {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
  </View>
);

// Main Component
export default function Component() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <SearchBar />

        <View style={styles.grid}>
          <FeatureCard
            title="Live Personal Training"
            subtitle=""
            color="#FF4B4B"
            style={styles.squareCard}
            icon={<View style={styles.liveIndicator} />}
          />
          <FeatureCard
            title="Recorded Home Workout"
            subtitle=""
            color="#4B7BFF"
            style={styles.squareCard}
            icon={<Text style={styles.freeTag}>Free!!</Text>}
          />
          <FeatureCard
            title="Personal Training"
            subtitle="@Nearby Gym"
            icon=""
            color="#8B4BFF"
            style={styles.squareCard}
          />
          <FeatureCard
            title="Diet Planning"
            color="#FF8B4B"
            subtitle=""
            style={styles.squareCard}
            icon={<Text style={styles.freeTag}>Free!!</Text>}
          />
          <FeatureCard
            title="Calorie Counter"
            color="#4BFF8B"
            style={styles.squareCard}
          />
          <FeatureCard
            title="Decode Age"
            subtitle="(Forever Young)"
            color="#FFD700"
            style={styles.squareCard}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    width: 80,
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
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    justifyContent: "space-between",
  },
  squareCard: {
    width: "47%",
    height: 180,
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
