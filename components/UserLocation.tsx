import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null); // Holds location data
  const [errorMsg, setErrorMsg] = useState(null); // Holds any permission or location errors

  useEffect(() => {
    (async () => {
      // Ask for location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get the current location
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc); // Save location data
    })();
  }, []);

  const handleGetLocation = async () => {
    try {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    } catch (error) {
      Alert.alert("Error", "Could not fetch location. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Location Example</Text>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : location ? (
        <Text style={styles.text}>
          Latitude: {location.coords.latitude}
          {"\n"}
          Longitude: {location.coords.longitude}
          {"\n"}
          Accuracy: {location.coords.accuracy} meters
        </Text>
      ) : (
        <Text style={styles.text}>Fetching location...</Text>
      )}
      <Button title="Get Current Location" onPress={handleGetLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginVertical: 10,
  },
});
