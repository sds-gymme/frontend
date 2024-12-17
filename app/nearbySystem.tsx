import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Geolocation from "@react-native-community/geolocation";

// Google Places API Key (replace with your actual key)
const GOOGLE_API_KEY = "AIzaSyBc9oIi1Hi9hQJrz5ud172Zv4_6GUmTDnw";

const App = () => {
  const [gyms, setGyms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch user's current location
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchNearbyGyms(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  // Function to fetch nearby gyms
  const fetchNearbyGyms = async (latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=gym&key=${GOOGLE_API_KEY}`
      );

      const data = await response.json();
      if (data.results) {
        // Extract gym details
        const gymDetails = data.results.map((place: any) => ({
          name: place.name,
          location: place.geometry.location,
          address: place.vicinity || "No address available",
        }));
        setGyms(gymDetails);
      } else {
        console.warn("No gyms found nearby.");
      }
    } catch (error) {
      console.error("Error fetching gyms:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Fetching nearby gyms...</Text>
      ) : (
        <FlatList
          data={gyms}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>
                Latitude: {item.location.lat}, Longitude: {item.location.lng}
              </Text>
              <Text style={styles.details}>Address: {item.address}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  item: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
});

export default App;
