import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import * as Location from "expo-location"; 
import { supabase } from "@/lib/supabase";

interface Gym {
  id: string;
  name: string;
  logo: string; 
  rating: number;
  timings?: string; 
  location: string; 
}

const NearbyGymScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [gyms, setGyms] = useState<Gym[]>([]); // Gyms from the API
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const theme = useTheme();

  const CACHE_KEY = "nearby_gyms";
  const CACHE_EXPIRY = 3600 * 1000;
  const fetchNearbyGyms = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const currentTime = new Date().getTime();

        // Cache check system
        if (currentTime - parsedData.timestamp < CACHE_EXPIRY) {
          console.log("Using cached gym data");
          setGyms(parsedData.data);
          setLoading(false);
          return;
        }
      }

      console.log("Fetching new gym data from API");
      const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=gym&key=${API_KEY}`
      );

      const data = await response.json();
      console.log("Fetched Gyms Data:", data.results); 

    
      const gymsData: Gym[] = data.results.map((gym: any) => ({
        id: gym.place_id,
        name: gym.name,
        logo: gym.icon,
        rating: gym.rating || 0,
        timings: gym.opening_hours?.open_now ? "Open Now" : "Closed",
        location: gym.vicinity,
      }));

      const cachePayload = {
        data: gymsData,
        timestamp: new Date().getTime(),
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
      setGyms(gymsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching nearby gyms", error);
      setLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.error("Permission to access location was denied");
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;

      setLocation({ latitude, longitude });
      console.log("User Location:", latitude, longitude);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
    

      if (authError || !user) {
        throw new Error("No authenticated user found");
      }

      const {} = await supabase
        .from("user_profiles")
        .update({
          longitude: longitude,
          latitude: latitude,
        })
        .eq("user_id", user.id);

        

      fetchNearbyGyms(latitude, longitude);
    } catch (error) {
      console.error("Error getting location", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handlePress = (route: any) => {
    router.push(route);
  };

  const GymCard = ({ gym }: { gym: Gym }) => (
    <TouchableOpacity onPress={() => handlePress(`/gymDetails/${gym.id}`)}>
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
