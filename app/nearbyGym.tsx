import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Appbar,
  Searchbar,
  Text,
  Avatar,
  useTheme,
  Surface,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

// Gym interface for TypeScript
interface Gym {
  id: string;
  name: string;
  logo: string; // Use the `icon` URL from API
  rating: number;
  timings?: string; // This can map to `opening_hours`
  location: string; // Use `vicinity` from API
}

// The NearbyGymScreen component
const NearbyGymScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gyms, setGyms] = useState<Gym[]>([]); // Gyms from the API
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  // Function to fetch gyms from Google Places API
  const fetchNearbyGyms = async () => {
    try {
      const YOUR_LATITUDE = 37.7749; // Replace with dynamic latitude
      const YOUR_LONGITUDE = -122.4194; // Replace with dynamic longitude
      const API_KEY = "AIzaSyBc9oIi1Hi9hQJrz5ud172Zv4_6GUmTDnw"; // Replace with your actual API Key

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${YOUR_LATITUDE},${YOUR_LONGITUDE}&radius=5000&type=gym&key=${API_KEY}`
      );

      const data = await response.json();
      console.log("Fetched Gyms Data:", data.results); // Debugging purposes

      // Map API data to Gym interface
      const gymsData: Gym[] = data.results.map((gym: any) => ({
        id: gym.place_id,
        name: gym.name,
        logo: gym.icon, // Use the `icon` URL from the API
        rating: gym.rating || 0,
        timings: gym.opening_hours?.open_now ? "Open Now" : "Closed",
        location: gym.vicinity,
      }));

      setGyms(gymsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching nearby gyms", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbyGyms();
  }, []);

  const handlePress = (route: any) => {
    router.push(route);
  };

  const GymCard = ({ gym }: { gym: Gym }) => (
    <TouchableOpacity onPress={() => handlePress("/gymDetails")}>
      <Surface style={styles.gymCard} elevation={1}>
        <View style={styles.gymInfo}>
          <Avatar.Image
            size={50}
            source={{ uri: gym.logo }}
            style={styles.logo}
          />
          <View style={styles.gymDetails}>
            <Text variant="titleMedium" style={styles.gymName}>
              {gym.name}
            </Text>
            <View style={styles.timeLocation}>
              <Icon
                name="clock-outline"
                size={16}
                color={theme.colors.outline}
              />
              <Text variant="bodySmall" style={styles.infoText}>
                {gym.timings}
              </Text>
            </View>
            <View style={styles.timeLocation}>
              <Icon
                name="map-marker-outline"
                size={16}
                color={theme.colors.outline}
              />
              <Text variant="bodySmall" style={styles.infoText}>
                {gym.location}
              </Text>
            </View>
          </View>
          <View style={styles.priceRating}>
            <View style={styles.rating}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text variant="bodyMedium">{gym.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Nearby Gym" />
        <Appbar.Action icon="tune-variant" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.content}>
        <Searchbar
          placeholder="Search here"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
        />

        <Text variant="titleLarge" style={styles.sectionTitle}>
          Gyms near you
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {gyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: "transparent",
    borderColor: "#000",
    borderWidth: 0.5,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: "600",
  },
  gymCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  gymInfo: {
    flexDirection: "row",
    padding: 12,
  },
  logo: {
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    height: 60,
    width: 60,
  },
  gymDetails: {
    flex: 1,
    marginLeft: 12,
  },
  gymName: {
    fontWeight: "600",
    marginBottom: 4,
  },
  timeLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  infoText: {
    marginLeft: 4,
    color: "#666",
  },
  priceRating: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default NearbyGymScreen;
